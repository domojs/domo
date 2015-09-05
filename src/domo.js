define('domo', function (require) {
  'use strict';

  var isString   = require('mu.is.string'),
      isFunction = require('mu.is.funtion'),
      partial    = require('mu.fn.partial'),
      each       = require('mu.list.each'),
      reduce     = require('mu.list.reduce'),
      merge      = require('mu.object.merge'),
      plug       = require('mu.api.plug');

  var isQuery = function (selector) {
    return isString(selector) && selector[0] !== '<';
  };

  var isFragment = function (selector) {
    return isString(selector) && selector[0] === '<';
  };

  var isDomoSelection = function (selector) {
    return isFunction(selector.each);
  };

  var query = function (selector, context) {
    context = context || document;
    return context.querySelectorAll(selector);
  };

  var fragment = function (html) {
    var doc = document.createDocumentFragment();
    doc.body.innerHTML = html;
    return doc;
  };

  var domoSelection = function (selection) {
    var nodes = [];

    selection.each(function (node) {
      nodes.push(node);
    });

    return nodes;
  };

  var selectNodes = function (recipe) {
    if (isQuery(recipe)) { return query(recipe); }
    if (isFragment(recipe)) { return fragment(recipe); }
    if (isDomoSelection(recipe)) { return domoSelection(recipe); }

    // DOM element is assumed otherwise
    return recipe;
  };

  var domo = function (recipe /* , filters... */) {
    var filters = [].slice.call(arguments, 1),
        nodes = selectNodes(recipe);

    each(filters, function (filter) {
      nodes = reduce(nodes, [], function (acc, node) {
        var filtered = query(filter, node);
        acc.concat(filtered);
        return acc;
      });
    });

    return nodes;
  };

  var builtin = {
    each: function (node, callback) {
      callback(node);
    }
  };

  var use = function (plugins) {
    return plug(domo, merge(plugins, builtin));
  };

  return { use: use };
});

/**
 * Packaged plugins
 * ================
 */

/**
* html content
* ------------
*
* *   html
* *   empty
* *   append
*/

define('domo.html', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined');

  var html = function (node, content) {
    if (isDefined(content)) { node.innerHTML = content; }
    else { return node.innerHTML; }
  };

  return html;
});

define('domo.empty', function () {
  'use strict';

  var empty = function (node) {
    node.innerHTML = '';
  };

  return empty;
});

define('domo.append', function (require) {
  'use strict';

  var isString = require('mu.is.string');

  var append = function (node, content) {
    if (isString(content)) {
      node.innerHTML += content;
      return;
    }

    node.appendChild(content);
  };

  return append;
});

/**
* properties
* ----------
*
* *   attr
* *   css
*/

define('domo.attr', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      isString  = require('mu.is.string'),
      apply     = require('mu.fn.apply'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each');
      reduce    = require('mu.list.reduce');

  var elementAttributes = function (node) {
    return reduce(node.attributes, {}, function (acc, item) {
      acc[item.name] = item.value;
      return acc;
    });
  };

  var attribute = function (node, attr, value) {
    if (isDefined(value)) { node[attr] = value; }
    else { return node[attr]; }
  };

  var attributes = function (node, attrs) {
    each(attrs, partial(attribute, node));
  };

  var attr = function (node, /* attr | attr, value | { attr: value } */) {
    var args = [].slice.call(arguments, 1);
    if (!args.length) { return elementAttributes(node); }
    if (isString(args[0])) { return apply(partial(attribute, node), args); }
    return apply(partial(attributes, node), args);
  };

  return attr;
});

define('domo.css', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      isString  = require('mu.is.string'),
      apply     = require('mu.fn.apply'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each');

  var style = function (node, attr, value) {
    if (isDefined(value)) { node.style[attr] = value; }
    else { return node.style[attr]; }
  };

  var styles = function (node, attrs) {
    each(attrs, partial(style, node));
  };

  var css = function (node, /* attr | attr, value | { attr: value } */) {
    var args = [].slice.call(arguments, 1);
    if (isString(args[0])) { return apply(partial(style, node), args); }
    return apply(partial(styles, node), args);
  };

  return css;
});

/**
* class
* -----
*
* *   classList
* *   hasClass
* *   addClass
* *   removeClass
* *   toggleClass
*/

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

  var isDefined = require('mu.is.defined'),
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

/**
* user input
* ----------
*
* *   val
*/

define('domo.val', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined')

  var val = function (node, newVal) {
    if (isDefined(newVal)) { node.value = newVal }
    return node.value;
  };

  return val;
});

/**
* event listeners
* ---------------
*
* *   on
*/

define('domo.on', function () {
  'use strict';

  var on = function (node, event, fn) {
    node.addEventListener(event, fn);
  };

  return on;
});

/**
* tree manipulation
* -----------------
*
* *   clone
* *   remove
*/

define('domo.clone', function () {
  'use strict';

  var clone = function (node) {
    return node.cloneNode(true);
  };

  return clone;
});

define('domo.remove', function () {
  'use strict';

  var remove = function (node) {
    node.parentNode.removeChild(node);
  };

  return remove;
});
