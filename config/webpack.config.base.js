/*
 * Webpack Base Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-05-28 18:03:12
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-05-07 17:47:48
 */

const _ = require('lodash')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const srcPath = path.resolve(__dirname, '../src')
const distPath = path.resolve(__dirname, '../dist')
const staticPath = path.resolve(__dirname, '../static')

// Multi-entry configuration
const getEntries = () => {
  let entry = {}
  let htmlWebpackPlugin = []
  const entries = glob.sync('./src/pages/**/main.js') // Pay attention to rules

  entries.forEach(path => {
    const pageName = path.slice('./src/pages/'.length, -'/main.js'.length)
    entry[pageName] = path

    // Something like this:
    // entry:  {
    //   index: './src/pages/index/main.js',
    //   page1: './src/pages/page1/main.js',
    //   page2: './src/pages/page2/main.js',
    //   page3: './src/pages/page3/main.js',
    //   'page3/page3-child': './src/pages/page3/page3-child/main.js'
    // }

    const html = new HtmlWebpackPlugin({
      template: 'index.html', // Use the same template
      filename: `${pageName}.html`,
      title: `${pageName} Page`,
      chunks: ['common', pageName],
    })
    htmlWebpackPlugin.push(html)
  })

  return { entry, htmlWebpackPlugin }
}
const { entry, htmlWebpackPlugin } = getEntries()

module.exports = {
  entry,
  output: {
    path: distPath,
    filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.vue'],
    alias: {
      '@': srcPath,
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      // // ESLint
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // js
      {
        test: /\.js$/,
        // test: /\.jsx?$/, // If use React
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // style
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              publicPath: '../', // Solve static resource path errors
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // SASS resources (e.g. variables, mixins etc.) loader for Webpack.
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(srcPath, 'assets/stylesheets/constants.scss'),
                path.resolve(srcPath, 'assets/stylesheets/resources.scss'),
              ],
            },
          },
        ],
      },
      // images
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 8K
              outputPath: 'img/',
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
        include: [srcPath],
      },
      // svg
      {
        test: /\.(svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[hash:8].[ext]',
          },
        },
        include: [srcPath],
      },
      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024, // 8K
            outputPath: 'fonts/',
            name: '[name].[hash:8].[ext]',
          },
        },
      },
      // media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024, // 8K
            outputPath: 'media/',
            name: '[name].[hash:8].[ext]',
          },
        },
        include: [srcPath],
      },
    ],
  },
  plugins: [
    // Creation of HTML files
    ...htmlWebpackPlugin,

    new webpack.HashedModuleIdsPlugin(),

    new VueLoaderPlugin(),

    // Remove build folder(s) before building
    new CleanWebpackPlugin(),

    // Copies individual files or entire directories,
    // which already exist, to the build directory.
    new CopyWebpackPlugin([{ from: staticPath, to: distPath }]),

    // Extract css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common',
        },
      },
    },
  },
}
