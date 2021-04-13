const NODE_ENV = process.env.NODE_ENV;
const path = require('path');
module.exports = {
  configureWebpack: {
    entry: NODE_ENV === 'development' ? './src/main.js' : './index.js',

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'sum-comp.js',
      library: 'sum-comp',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  },
};
