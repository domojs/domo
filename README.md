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

Append HTML to selected elements

html
----

Replace HTML from selected items

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

Add or remove a class to selected elements depending on the presence of the class
