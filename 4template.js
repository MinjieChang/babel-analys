const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("babel-types");

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});
console.dir(ast, {depth: null});
console.log(generator(ast).code); // var myModule = require("my-module");

// template 可以称作代码模版