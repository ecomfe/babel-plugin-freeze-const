/**
 * @file index 为所有const对象添加Object.freeze
 * @author zongyu(liuxuanzy@qq.com)
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var buildFactory = (0, _babelTemplate2['default'])('Object.freeze($0)');

module.exports = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            VariableDeclaration: function VariableDeclaration(path, file) {

                var node = path.node;

                if (node.kind !== 'const') {
                    return;
                }

                for (var i = 0; i < node.declarations.length; i++) {

                    var declar = node.declarations[i];

                    // 对于字面量无需进行处理
                    if (declar.init && !t.isLiteral(declar.init) && !t.isFunction(declar.init) && !t.isClass(declar.init)) {
                        declar.init = t.toExpression(buildFactory(declar.init));
                    }
                }
            }
        }
    };
};