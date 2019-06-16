/*
 * Webpack Common Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-05-28 18:03:12
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-16 21:43:56
 */

const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const shelljs = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const devMode = process.env.NODE_ENV !== 'production'

let plugins = [
  new VueLoaderPlugin(),
  new CleanWebpackPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new HtmlWebpackPlugin({
    favicon: './favicon.ico',
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
  }),
]

/**
 * 通过约定的入口文件命名构建 webpack entry：`模块名.页面名`
 * 过程解析：
 * - filePath: `'path/to/src/index/index.page.js'`
 * - filePathArr: `['path', 'to', 'src', 'index', 'index.page.js']`
 * - fileName: `'index.page.js'`
 * - pageName: `'index'`
 * - entry: `{ index: './src/index/index.page.js' }`
 */
let entry = {}
shelljs.ls(path.join(__dirname, '/src/**/*.page.js')).forEach(filePath => {
  const filePathArr = filePath.split('/')
  const fileName = _.last(filePathArr)
  const pageName = fileName.replace(/\.page.js$/, '')
  const srcPos = _.indexOf(filePathArr, 'src')

  entry[pageName] = `./${filePathArr.slice(srcPos).join('/')}`

  const html = new HtmlWebpackPlugin({
    filename: `${pageName}.html`,
    template: path.resolve(__dirname, `./src/${pageName}/index.html`),
  })
  plugins.push(html)
})

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
  },
  optimization: {
    usedExports: true, // tree shaking
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 8K
              outputPath: 'assets/images/',
              name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024, // 8K
            outputPath: 'assets/fonts/',
            name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins,
}
