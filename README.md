domo
====

Pluggable DOM selector

Usage
=====

```js
var domo       = require('domo'),
    domoNative = require('domo.native'),
    domoCss    = require('domo.css'),
    domoOn     = require('domo.on');

var dom = domo.use({
  native: domoNative,
  css: domoCss,
  on: domoOn
});

var body = dom('body')
.css({ backgroundColor: 'red', color: 'white' })
.native(function (node) {
  node.innerHTML = '<h1>Click me!</h1>';
});

dom('h1').on('click', function () {
  body.css({ backgroundColor: 'blue' });
});
```
