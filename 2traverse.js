// 遍历
// ast 节点 增加 修改 删除
const babylon = require("@babel/parser");
const traverse = require("@babel/traverse").default;

//====================== 解析 ==================

const code = `function square(n) {
  return n * n;
}`;

let ast = babylon.parse(code, { sourceType: 'module', plugins: ['jsx'] });
// console.dir(ast, { depth: null })

//====================== 遍历 ==================

const visitor = {
  FunctionDeclaration: function(path) {
    path.node.id.name = "x";
  },
  Identifier: function(path) {
    path.node.name = "x";
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

console.dir(ast, {depth: null})