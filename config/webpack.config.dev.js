/*
 * Webpack Development Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-06-04 15:16:42
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-05-06 23:32:07
 */

const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const DIST_DIR = path.resolve(__dirname, '../dist')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
    hot: true,
  },
})
