// 遍历
// ast 节点 增加 修改 删除
const babylon = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

//====================== 解析 ==================

const code = `function square(n) {
  return n * n;
}`;

let ast = babylon.parse(code, { sourceType: 'module', plugins: ['jsx'] });
// console.dir(ast, { depth: null })

//====================== 遍历 ==================

const visitor = {
  FunctionDeclaration: function (path) {
    path.node.id.name = "sssss";
  },
  Identifier: function(path) {
    // path.node.name = "x";
  }
}

traverse(ast, visitor)

// traverse(ast, {
//   enter(path) {
//     if (path.isIdentifier({ name: "n" })) {
//       path.node.name = "x";
//     }
//   }
// })

console.dir(ast, { depth: null })

//====================== 生成 ==================

const result = generator(ast, {
  compact: true
}, code)

console.log(result.code, 'result===')
const f = new Function('return ' + result.code)
console.log(f()(2));
// console.dir(result, { depth: null });