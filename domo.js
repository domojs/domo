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

define('domo.native', function () {
  'use strict';
  
  var native = function (node, callback) {
    callback(node);
  };

  return native;
});

define('domo.empty', function () {
  'use strict';

  var empty = function (node) {
    node.innerHTML = '';
  };

  return empty;
});

define('domo.append', function () {
  'use strict';

  var append = function (node, content) {
    node.innerHTML += content;
  };

  return append;
});

define('domo.on', function () {
  'use strict';
  
  var on = function (node, event, fn) {
    return node.addEventListener(event, fn);
  };
  
  return on;
});

define('domo.css', function (require) {
  'use strict';
  
  var each = require('mu.list.each');
  
  var css = function (node, attrs) {
    each(attrs, function (value, attr) {
      node.style[attr] = value;
    });
  };
  
  return css;
});

define('domo.classList', function () {
  'use strict';
  
  var classList = function (node) {
    var raw = node.className,
        list = raw.length ? raw.split(' ') : [];
    
    return list;
  };
  
  return classList;
});

define('domo.hasClass', function (require) {
  'use strict';
  
  var contains  = require('mu.list.contains'),
      classList = require('domo.classList');
  
  var hasClass = function (node, className) {
    return contains(classList(node), className); 
  };
  
  return hasClass;
});

define('domo.addClass', function (require) {
  'use strict';
  
  var contains  = require('mu.list.contains'),
      classList = require('domo.classList');
  
  var addClass = function (node, className) {
    var list = classList(node);
    if (contains(list, className)) { return }
    list.push(className);
    node.className = list.join(' ');
  };
  
  return addClass;
});

define('domo.removeClass', function (require) {
  'use strict';
  
  var isDefined = require('mu.type.defined'),
      remove    = require('mu.list.remove'),
      classList = require('domo.classList');
  
  var removeClass = function (node, className) {
    var list = classList(node);
    if (!isDefined(remove(list, className))) { return; }
    node.className = list.join(' ');
  };
  
  return removeClass;
});

define('domo.toggleClass', function (require) {
  'use strict';
  
  var hasClass    = require('domo.hasClass'),
      addClass    = require('domo.addClass'),
      removeClass = require('domo.removeClass');

  var toggleClass = function (node, className) {
    if (hasClass(node, className)) { removeClass(node, className); }
    else { addClass(node, className); }
  };
  
  return toggleClass;
});
