/*
 * Webpack Development Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-06-04 15:16:42
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-21 18:20:22
 */

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9527,
  },
})
