/*
 * Webpack Production Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-06-04 15:16:42
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-13 15:15:38
 */

const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: 'error', // 当单个资源超过 250kb 时报错
  },
})
