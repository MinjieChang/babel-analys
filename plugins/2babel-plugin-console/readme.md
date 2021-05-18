# babel-plugin-console

## 介绍

实现的一个在生产环境下移除 `console`语句的 `babel`插件

它可以将如下代码：

```js
let a = b => {
  console.log(b)
};
let fn = c => { console.log(c)}
function code(x) {
  console.log(x)
  if (true) {
    console.log(x)
  }
  console.log(y)
  // return number
  return x * x
};
```

转换成这样：

```js
let a = b => {};
let fn = c => {}
function code(x) {
  if (true) {
  }
  // return number
  return x * x
};
```

当然，如果你想保留某些 `console`语句，可以加上约定的注释：

```js
// 使用 babel-cli 配合 .babelrc 编译

let a = b => {
  /*
  * no remove
  * lkkkkkkk
  */
  console.log(b)
};
let fn = c => { console.log(c)}
function code(x) {
  console.log(x) // reserve
  if (true) {
    // 哈哈发寒风
    console.log(x) // no remove
    // hhhhhhh
    console.log(x)
  }
  // ggggg
  console.log(x)
  // reserve
  console.log(y)
  // return number
  return x * x
};
```

当你在代码的 **前面**或**尾部**加上 **reserve** 或者 **no remove**注释的时候，`console`语句不会被删除，上面代码转换后结果如下：

```js
let a = b => {
  /*
  * no remove
  * lkkkkkkk
  */
  console.log(b);
};
let fn = c => {};
function code(x) {
  console.log(x); // reserve
  if (true) {
    // 哈哈发寒风
    console.log(x); // no remove
    // hhhhhhh
  }
  // ggggg

  // reserve
  console.log(y);
  // return number
  return x * x;
};
```

## 使用

### babel-cli

.babelrc 文件中添加

```js
{
  "plugins": [
    ["./plugins/2babel-plugin-console/index.js", { "removeMethods": null }],
  ]
}
```
### babel api

```js
const babel = require("babel-core");
const consolePlugin = require("../plugins/2babel-plugin-console/index")

const result = babel.transform(code, {
  plugins: [[consolePlugin, {removeMethods: null}]]
});

console.log(result.code, 'result');
```

### webpack.config.js

```js
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['console'],
      'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
    }
  }]
}
```

## 原理解析

实现原理可以查看[博客地址](https://github.com/MinjieChang/myBlog/issues/36)

## babel 插件解析

[如何实现一个bable插件](https://github.com/MinjieChang/myBlog/issues/35)