
// babel-plugin-console 实现解析

const babel = require("babel-core");
const consolePlugin = require("../plugins/2babel-plugin-console/index")

const code =`
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
`

const result = babel.transform(code, {
  plugins: [[consolePlugin, { removeMethods: null }]]
});

console.log(result.code, 'result');
// console.log(result.ast);