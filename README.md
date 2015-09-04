domo
====

Pluggable DOM selector

Usage
=====

```js
var dom = require('domo').use({
  html:   require('domo.html'),
  css:    require('domo.css'),
  on:     require('domo.on')
});

var body = dom('body')
.css({ backgroundColor: 'red', color: 'white' })
.html('<h1>Click me!</h1>');

dom('h1').on('click', function () {
  body.css({ backgroundColor: 'blue' });
});
```

API
===

Empty selectors
---------------

domo uses [mujs plug](http://github.com/mujs/mu.api) as a plugin system

with null selectors domo plugins are not called but they keep returning the
chain preventing `TypeError` exceptions

```js
dom('#nonexistent').foo().bar().qux();
```

Assuming `foo`, `bar` and `qux` are loaded plugins, the previous code does
nothing but don't crash

each
----

Direct access to selected nodes

```js
dom('button').each(function (node) {
  if (node.click) { node.click(); }
});
```

Builtin plugins
===============

HTML content
------------

### html

Chainable setter

Replace HTML from selected elements

### empty

Chainable setter

Remove all children of selected elements

### append

Chainable setter

Append HTML or DOM nodes to selected elements

```html
<div id="title"></div>

<ul id="list">
  <li class="item">Item</i>
</ul>
```

```js
dom('#title').append('<h1>Title</h1>');
dom('#list').append(dom('#list.item').clone());
```

Properties
----------

### attr

Chain breaker getter / chainable setter

Return the attribute value of the first selected element

### css

Chain breaker getter / chainable setter

Alter CSS properties of selected elements

Class
-----

### classList

Chain breaker getter

Get an array of classes of the first selected element

### hasClass

Chain breaker getter

Check if a class is in the first selected element

### addClass

Chainable setter

Add a class to selected elements

### removeClass

Chainable setter

Remove a class of selected elements

### toggleClass

Chainable setter

Add or remove a class to selected elements depending on the presence of the
class

User input
----------

### val

Chain breaker getter / chain breaker setter

If an argument is passed it is assigned to the first selected element value

Return the value of the first selected element

```html
<input class="first arg" type="text" />
+ <input class="second arg" type="text" /><br />
= <input id="result" type="text" readonly />
```

```js
var int = function (arg) {
  return parseInt(arg, 10) || 0;
};

dom('.arg').on('input', function () {
  var first = int(dom('.first.arg').val()),
      second = int(dom('.second.arg').val()),

  dom('#result').val(first + second);
});
```

Event listeners
---------------

### on

Chainable setter

Add event listeners to selected elements

Tree manipulation
-----------------

### clone

Chain breaker getter

Return a clone the first selected node and its children

### remove

Chainable setter

Remove all selected elements

```html
<ul id="list">
  <li>One</li>
  <li class="remove">Two</li>
  <li>Three</li>
  <li class="remove">Four</li>
  <li>Five</li>
</ul>
```

```js
dom('#list .remove').remove();
```
