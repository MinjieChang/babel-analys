module.exports = ({ types: t, template }) => {
  // 这里的 t 是否是babel-types 提供的内容
  let paramName
  return {
    visitor: {
      Identifier(path, state, scope) {
        console.log("Visiting Identifer: " + path.node.name);
        // 修改参数 及 变量
        if (path.node.name === paramName) { 
          path.node.name = 'n'
        }
        // 翻转 type 为Identifier 的节点name
        // path.node.name = path.node.name.split('').reverse().join('')
      },
      ReturnStatement(path, state) {

        const { whenFalse = 'false_statement' } = state.opts
        // 修改函数体
        const buildRequire = template(`
          if (n) {
            BODY_STATEMENT
          } else {
            return WHEN_FALSE
          }
        `);
        // 获取当前节点
        const body = path.getSibling(0).node
        // console.log(body, 9999);

        const body_ast = buildRequire({
          BODY_STATEMENT: body,
          WHEN_FALSE: t.stringLiteral(whenFalse)
        });
        // path.parentPath.node.body[0] = body_ast // 这么写是可以的
        // 这里加上判断的原因是，修改了path后再次遍历 ReturnStatement 又回创建新的if语句，无限递归执行，造成死循环
        if (t.isFunctionDeclaration(path.parentPath.parentPath.node)) {
          path.replaceWith(body_ast)
        }
      },
      FunctionDeclaration(path, state) {
        path.node.id = t.Identifier('foo')
        paramName = path.node.params[0].name

        // state.opts 接受插件参数
        // const { whenFalse = 'false_statement' } = state.opts
        // // 修改函数体
        // const buildRequire = template(`
        //   if (n) {
        //     BODY_STATEMENT
        //   } else {
        //     return '${whenFalse}'
        //   }
        // `);
        
        // const body = path.node.body.body[0]
        // // console.log(body, 9999);

        // const body_ast = buildRequire({
        //   BODY_STATEMENT: body,
        // });

        // path.node.body.body[0] = body_ast
      }
    }
  };
}