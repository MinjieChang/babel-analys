// babel-plugin-import 实现解析
// babel-plugin-lodash 实现解析

const babel = require("babel-core");
const lodashPlugin = require("../plugins/3babel-plugin-lodash/index")

const code =`
import lodash from 'lodash'
import _ from 'lodash'
import { uniq, map, forEach, isEqual} from 'lodash'
import * as lodash3 from 'lodash'
import { add } from 'lodash/fp'

const addOne = add(1)
_.map([1, 2, 3], addOne)

lodash.debounce(1,2)
lodash.isEqual(1,2)
lodash3.throttle(33)
lodash.filter(1,2)
_.filter(3333)

export default lodash
`

const result = babel.transform(code, {
  plugins: [[lodashPlugin, { removeMethods: null }]]
});

console.log(result.code, 'result');
// console.log(result.ast);