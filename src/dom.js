define('mu.dom', function (require) {
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

  var isdomSelection = function (selector) {
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

  var domSelection = function (selection) {
    var nodes = [];

    selection.each(function (node) {
      nodes.push(node);
    });

    return nodes;
  };

  var selectNodes = function (recipe) {
    if (isQuery(recipe)) { return query(recipe); }
    if (isFragment(recipe)) { return fragment(recipe); }
    if (isdomSelection(recipe)) { return domSelection(recipe); }

    // DOM element is assumed otherwise
    return recipe;
  };

  var dom = function (recipe /* , filters... */) {
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

  return { use: plug(dom, builtin) };
});
