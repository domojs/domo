domo
====

Pluggable DOM selector

Usage
=====

```js
var dom = require('domo').use({
  native: require('domo.native'),
  css:    require('domo.css'),
  on:     require('domo.on')
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
