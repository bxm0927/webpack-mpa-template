/*
 * Webpack Production Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-06-04 15:16:42
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-05-06 23:27:03
 */

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
})
