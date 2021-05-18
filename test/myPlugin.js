const babel = require("babel-core");
const myPlugin = require("../plugins/1myPlugin/index")

const code = `function code(x){
  return x * x
};
`

const result = babel.transform(code, {
  plugins: [[myPlugin, { whenFalse: 'hhhhhh' }]]
});

console.log(result.code, 'result');
// console.dir(result, {depth: null}, 9999);

babel.transformFile("script.js", {}, function(err, result) {
  // console.log(result, 3333);
});

// 参考babel手册  https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babel-register