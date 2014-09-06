define('domo', function (require) {
  'use strict';
  
  var bind      = require('mu.fn.bind'),
      apply     = require('mu.fn.apply'),
      multiplex = require('mu.fn.multiplex'),
      map       = require('mu.list.map'),
      query     = require('env.dom.query');
  
  var plug = function (plugins, selector, context) {
    var nodes = query(selector, context);
    
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

define('env.dom.query', function (require) {
  'use strict';
  
  var isString = require('mu.type.string');
  
  var query = function (selector, context) {
    context = context || document;
    
    if (isString(selector)) {
      var nodeList = context.querySelectorAll(selector);
      return [].slice.call(nodeList);
    }
    
    return [selector];
  };
  
  return query;
});
