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