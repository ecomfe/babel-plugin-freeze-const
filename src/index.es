/**
 * @file index 为所有const对象添加Object.freeze
 * @author zongyu(liuxuanzy@qq.com)
 */

import template from 'babel-template';

let buildFactory = template(`Object.freeze($0)`);

module.exports = function ({types: t}) {
    return {
        visitor: {
            VariableDeclaration(path, file) {

                let node = path.node;

                if (node.kind !== 'const') {
                    return;
                }

                for (let i = 0; i < node.declarations.length; i++) {

                    let declar = node.declarations[i];

                    // 对于字面量无需进行处理
                    // 函数节点是只读的，不需要进行处理
                    // 类节点是只读的，不需要进行处理
                    if (declar.init
                        && !t.isLiteral(declar.init)
                        && !t.isFunction(declar.init)
                        && !t.isClass(declar.init)
                    ) {
                        declar.init = t.toExpression(buildFactory(declar.init));
                    }
                }
            }
        }
    };
};
