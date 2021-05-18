module.exports = ({ types: t, template }) => {
  return {
    pre(state) {
      this.propertyNames = [];
      this.fpPropertyNames = [];
      this.namespaceSpecifier = [];
      this.moduleVals = ['lodash', '_']
    },
    visitor: {
      ImportDeclaration(path, state, scope) {
        const specifiers = path.get("specifiers");
        const source = path.get("source");
        // import lodash from 'lodash'
        if (
          specifiers && specifiers.length === 1 &&
          t.isImportDefaultSpecifier(specifiers[0]) &&
          (t.isIdentifier(specifiers[0].node.local, { name: "lodash" }) || t.isIdentifier(specifiers[0].node.local, { name: "_" })) &&
          t.isStringLiteral(source.node, { value: "lodash" })
        ) {
          path.remove()
        }
        // import {isEqual, uniq, map} from 'lodash'
        if (
          specifiers && specifiers.length >= 1 &&
          t.isImportSpecifier(specifiers[0]) &&
          t.isStringLiteral(source.node, { value: "lodash" })
        ) {
          specifiers.forEach(specifier => {
            const { imported: { name } } = specifier.node
            if (!this.propertyNames.includes(name)) {
              this.propertyNames.push(name);
            }
          })
          path.remove()
        }
        // import { add } from 'lodash/fp'
        if (
          specifiers && specifiers.length >= 1 &&
          t.isImportSpecifier(specifiers[0]) &&
          t.isStringLiteral(source.node, { value: "lodash/fp" })
        ) {
          specifiers.forEach(specifier => {
            const { imported: { name } } = specifier.node
            if (!this.fpPropertyNames.includes(name)) {
              this.fpPropertyNames.push(name);
            }
          })
          path.remove()
        }
        // import * as lodash from 'lodash'
        if (
          specifiers && specifiers.length === 1 &&
          t.isImportNamespaceSpecifier(specifiers[0]) &&
          t.isStringLiteral(source.node, { value: "lodash" })
        ) {
          this.namespaceSpecifier.push(specifiers[0].node.local.name)
          path.remove()
        }
      },
      CallExpression(path, state, scope) {
        // lodash.isEqual(1,2) => isEqual(1,2)
        if (
          path.node.callee && path.node.callee.object &&
          (this.moduleVals.includes(path.node.callee.object.name) || this.namespaceSpecifier.includes(path.node.callee.object.name))
        ) {
          const propertyName = path.get("callee.property").node.name;
          if (!this.propertyNames.includes(propertyName)) {
            this.propertyNames.push(propertyName);
          }
          path.get("callee").replaceWith(t.identifier(propertyName));
        }
      },
    },
    post(state) {
      this.propertyNames.forEach((name) => {
        state.path.node.body.unshift(buildImportDeclaration(t, name, `lodash/${name}`));
      });
      this.fpPropertyNames.forEach((name) => {
        state.path.node.body.unshift(buildImportDeclaration(t, name, `lodash/fp/${name}`));
      });
    },
  };
};

function buildImportDeclaration(t, name, source) {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))],
    t.stringLiteral(`${source}`)
  );
}

function insertImportDeclaration(path, importDeclaration) {
  const program = path.findParent(parent => parent.parentKey === 'program')
  program.node.body.unshift(importDeclaration);
}