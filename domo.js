define('domo', function (require) {
  'use strict';
  
  var is  = require('mu.is'),
      fn  = require('mu.fn'),
      api = require('mu.api');

  var query = function (selector, context) {
    context = context || document;
    if (is.string(selector)) { return context.querySelectorAll(selector); }
    return selector;
  };
  
  return {
    use: fn.partial(api.plug, query)
  };
});
