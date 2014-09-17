define('domo', function (require) {
  'use strict';
  
  var is   = require('mu.is'),
      fn   = require('mu.fn'),
      list = require('mu.list');
  
  var multiplex = function (func) {
    var multiplexed = function () {
      var argv = [].slice.call(arguments),
          arr = argv.shift();
          
      each(arr, function (item) {
        apply(partial(func, item), argv);
      });
    };
    
    return multiplexed;
  };
  
  var pluggable = function (socket) {
    var plugged = function () {
      var argv = [].slice.call(arguments),
          plugins = argv.shift(),
          data = fn.apply(socket, argv);
    
      var chain = list.map(plugins, function (plugin) {
        plugin = is.array(data) ? multiplex(plugin) : plugin;
        
        return function () {
          var value = fn.apply(fn.partial(plugin, data), arguments);
          return is.defined(value) ? value : chain;
        };
      });
      
      return chain;
    };
    
    var use = function (plugins) {
      return fn.partial(plugged, plugins);
    };
    
    return {
      use: use
    };
  };

  var query = function (selector, context) {
    context = context || document;
    if (is.string(selector)) { return context.querySelectorAll(selector); }
    return [selector];
  };
  
  var use = function (plugins) {
    return plug(query, plugins);
  };
  
  return {
    use: use
  };
});
