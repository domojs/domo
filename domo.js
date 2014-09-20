define('domo', function (require) {
  'use strict';
  
  var isString = require('mu.is.string'),
      partial  = require('mu.fn.partial'),
      plug     = require('mu.api.plug');

  var query = function (selector, context) {
    context = context || document;
    if (isString(selector)) { return context.querySelectorAll(selector); }
    return selector;
  };
  
  return {
    use: partial(plug, query)
  };
});
