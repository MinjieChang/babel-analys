const isProcuction = process.env.NODE_ENV === "production";

module.exports = ({ types: t, template }) => {
  return {
    visitor: {
      CallExpression(path, state, scope) {
        if (
          path.node.callee &&
          t.isIdentifier(path.node.callee.object, { name: "console" })
        ) {
          if (isProcuction) {
            removeConsoleExpression(path, state);
          }
        }
      },
    },
  };
};

function hasReserveComment(comments) {
  return comments.some(isReserveComment);
}

function reserveCommentsCounts(comments) {
  return comments.filter(isReserveComment).length;
}

function isReserveComment(node, state) {
  const { removeMethods } = state.opts;
  if (removeMethods && typeof removeMethods === "function") {
    return removeMethods(node.value);
  }
  return (
    ["CommentBlock", "CommentLine"].includes(node.type) &&
    /(no[t]? remove\b)|(reserve\b)/.test(node.value)
  );
}

function hasLeadingComments(node) {
  const leadingComments = node.leadingComments;
  return leadingComments && leadingComments.length;
}

function hasTrailingComments(node) {
  const trailingComments = node.trailingComments;
  return trailingComments && trailingComments.length;
}

// 通过key值防止重复
let dulplicationKey = null;
function removeConsoleExpression(path, state) {
  const parentPath = path.parentPath;
  const node = parentPath.node;

  let leadingReserve = false;
  let trailReserve = false;

  if (hasLeadingComments(node)) {
    // 遍历到下个兄弟节点 筛除属于上个节点的comment
    // if (parentPath.key === dulplicationKey) {
    //   node.leadingComments = node.leadingComments.filter(comment => !comment.belongPrevTrail)
    // }
    // 遍历所有的前缀注释
    node.leadingComments.forEach((comment) => {
      // 检测该key值与防重复key值相同
      // if (parentPath.key === dulplicationKey) {
      //   return;
      // }
      // 有保留字 并且不是上个兄弟节点的尾注释
      if (isReserveComment(comment, state) && !comment.belongPrevTrail) {
        leadingReserve = true;
      }
    });
  }
  if (hasTrailingComments(node)) {
    // 遍历所有的后缀注释
    node.trailingComments.forEach((comment) => {
      const {
        loc: {
          start: { line: commentLine },
        },
      } = comment;
      // 防止下一个sibling节点重复遍历注释
      dulplicationKey = parentPath.key + 1;

      // 对于尾部注释 需要标记出 该注释是属于当前的尾部 还是属于下个节点的头部 通过其所属的行来判断
      const {
        loc: {
          start: { line: expressionLine },
        },
      } = node.expression;
      if (commentLine === expressionLine) {
        comment.belongPrevTrail = true;
      }
      // 有保留字 并且是本行的
      if (isReserveComment(comment, state) && comment.belongPrevTrail) {
        trailReserve = true;
      }
    });
  }
  if (!leadingReserve && !trailReserve) {
    path.remove();
  }
}
