define('domo', function (require) {
  'use strict';
  
  var bind      = require('mu.fn.bind'),
      apply     = require('mu.fn.apply'),
      multiplex = require('mu.fn.multiplex'),
      map       = require('mu.list.map'),
      query     = require('env.dom.query');
  
  var plug = function (plugins, selector) {
    var nodes = query(selector);
    
    var plugged = map(plugins, function (plugin) {
      var proxy = bind(plugin, nodes);
      
      return function () {
        apply(proxy, arguments);
        return plugged;
      };
    });
    
    return plugged;
  };
  
  var use = function (plugins) {
    return bind(plug, map(plugins, multiplex));
  };
  
  return {
    use: use
  };
});

define('env.dom.query', function () {
  'use strict';
  
  var query = function (selector, context) {
    context = context || document;
    var nodeList = context.querySelectorAll(selector);
    return [].slice.call(nodeList);
  };
  
  return query;
});
