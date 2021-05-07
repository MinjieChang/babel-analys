
// babel-plugin-console 实现解析

const babel = require("babel-core");
const myPlugin = require("./plugins/2consolePlugin")

const code = function code(x) {
  console.log(x)
  return x * x
};

const result = babel.transform(code, {
  plugins: [[myPlugin, { whenFalse: 'hhhhhh' }]]
});

console.log(result.code, 'result');