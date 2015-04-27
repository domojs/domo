define('domo.index', function (require) {
  'use strict';

  var each = require('mu.list.each');

  var index = function (node) {
    return each(node.parentNode.children, function (item, index) {
      if (item === node) { return index; }
    });
  };

  return index;
});

define('domo.parent', function () {
  'use strict';

  var parent = function (node) {
    return node.parentNode;
  };

  return parent;
});
