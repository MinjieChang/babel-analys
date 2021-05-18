# babel-plugin-lodash-import

一个实现 `lodash`按需加载的 `babel`插件，实现将 `lodash`的全量引入转换成只导入需要引入的函数部分，原理类似 `babel-plugin-import`

当然，这里也有[官方](https://www.npmjs.com/package/babel-plugin-lodash)的 `lodash`插件，如果在生产环境使用，还是建议使用官方的 :cry:

它可以将如下代码：

```js
import lodash from 'lodash'
import { uniq, map, forEach, isEqual} from 'lodash'
import * as lodash3 from 'lodash'
import { add } from 'lodash/fp'

const addOne = add(1)
_.map([1, 2, 3], addOne)

lodash.debounce()
lodash.isEqual(1,2)
lodash3.throttle()
lodash.filter()
_.filter()
```

转换为如下的形式：

```js
import add from 'lodash/fp/add';
import filter from 'lodash/filter';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import uniq from 'lodash/uniq';

const addOne = add(1);
map([1, 2, 3], addOne);

debounce();
isEqual(1, 2);
throttle();
filter();
filter();
```

## 使用方式

### babel-cli

.babelrc 文件添加

```js
{
  "plugins": [
    ["./plugins/3babel-plugin-lodash/index"]
  ]
}
```

package.json

```js
{
  "scripts": {
    "lodash": "babel ./test/lodashPlugin.js",
  },
}
```

### babel api

```js
const babel = require("babel-core");
const lodashPlugin = require("../plugins/3babel-plugin-lodash/index")

const result = babel.transform(code, {
  plugins: [[lodashPlugin]]
});

console.log(result.code, 'result');
```

### webpack.config.js

```js
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['lodash-import'],
      'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
    }
  }]
}
```

## babel 插件解析

[如何实现一个bable插件](https://github.com/MinjieChang/myBlog/issues/35)