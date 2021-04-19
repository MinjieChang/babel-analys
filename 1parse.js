// babylon 在babel7 中成为babel的子库 babel-parser
// 解析 code => ast

const parser = require("@babel/parser");

const code = `function square(n) {
  return n * n;
}`;

let ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
console.dir(ast, { depth: null })
// Node {
//   type: "File",
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   program: Node {...},
//   comments: [],
//   tokens: [...]
// }


// 文档 https://github.com/babel/babel/tree/master/packages/babel-parser

// babel 用户手册 https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babel-register
// babel 插件手册 https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-introduction
// babel 文档  https://babeljs.io/docs/en/babel-generator.html