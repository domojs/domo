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

Plugins
=======

native
------

Get native access to selected elements

empty
-----

Remove all child elements of selected elements

append
------

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

html
----

Replace HTML from selected elements

clone
-----

Clone a DOM node and its children

on
--

Add event listeners to selected elements

css
---

Alter CSS properties of selected elements

classList
---------

Get an array of classes of the first selected element

hasClass
--------

Check if a class is in the first selected element

addClass
--------

Add a class to selected elements

removeClass
-----------

Remove a class of selected elements

toggleClass
-----------

Add or remove a class to selected elements depending on the presence of the
class

attr
----

Return the attribute value of the first selected element

val
---

Getter setter.

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

index
-----

Return the index of the node

```html
<ul>
  <li id="first"></li>
  <li id="second"></li>
  <li id="third"></li>
</ul>
```

```js
expect(dom('#first').index()).toBe(0);
expect(dom('#second').index()).toBe(1);
expect(dom('#third').index()).toBe(2);
```

parent
------

Return the parent node of the first selected node

```js
var tpl = dom('#template');

dom(tpl.parent()).append(tpl.clone());
```
