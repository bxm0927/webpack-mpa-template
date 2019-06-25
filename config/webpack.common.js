/*
 * Webpack Common Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-05-28 18:03:12
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-25 14:13:38
 */

const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const shelljs = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const devMode = process.env.NODE_ENV !== 'production'

// /**
//  * 通过约定的入口文件命名构建 webpack entry：`模块名.页面名`
//  * 过程解析：
//  * - filePath: `path/to/src/pages/animal/animal.page.js`
//  * - filePathArr: `['path', 'to', 'src', 'pages', 'animal', 'animal.page.js']`
//  * - fileName: `animal.page.js`
//  * - pageName: `animal`
//  * - entryFile: `./src/pages/animal/animal.page.js`
//  * - template: `./src/pages/animal/index.html`
//  * - entry: `{ animal: './src/pages/animal/animal.page.js' }`
//  */
// let entry = {}
// let htmlWebpackPlugin = []
// const entries = shelljs.ls(path.join(__dirname, './src/pages/**/*.page.js'))

// entries.forEach(filePath => {
//   const filePathArr = filePath.split('/')
//   const fileName = _.last(filePathArr)
//   const pageName = fileName.replace(/\.page.js$/, '')

//   const srcPos = _.indexOf(filePathArr, 'src')
//   const entryFile = `./${filePathArr.slice(srcPos).join('/')}`
//   const template = entryFile.replace(fileName, `${pageName}.html`)

//   entry[pageName] = entryFile

//   const html = new HtmlWebpackPlugin({
//     template,
//     // template: path.resolve(__dirname, `./src/pages/${pageName}/${pageName}.html`),
//     filename: `${pageName}.html`,
//   })
//   htmlWebpackPlugin.push(html)

//   // const html = new HtmlWebpackPlugin({
//   //   filename: `${pageName}.html`,
//   //   template: path.resolve(__dirname, `./src/pages/${pageName}/index.html`),
//   // })
//   // plugins.push(html)
// })

// /**
//  * Use `glob` to filter entries
//  * entries: `['./src/pages/cat/index.page.js', ...]`
//  * filePath: `./src/pages/cat/index.page.js`
//  * template: `./src/pages/cat/index.html`
//  */
// let entry = {}
// let htmlWebpackPlugin = []
// const entries = glob.sync('./src/pages/**/index.page.js')

// for (const filePath of entries) {
//   const template = filePath.replace('index.page.js', 'index.html')
//   const chunkName = filePath.slice('./src/pages/'.length, -'/index.js'.length)

//   const srcPos = _.indexOf(filePathArr, 'src')
//   entry[pageName] = `./${filePathArr.slice(srcPos).join('/')}`

//   entry[chunkName] = dev ? [filePath, template] : filePath
//   htmlWebpackPlugin.push(
//     new HtmlWebpackPlugin({
//       template,
//       filename: chunkName + '.html',
//       chunksSortMode: 'none',
//       chunks: [chunkName],
//     }),
//   )
// }

// let entry = {}
// let htmlWebpackPlugin = []
// const entries = glob.sync('./src/**/index.js')

// for (const path of entries) {
//   const template = path.replace('index.js', 'index.html')
//   const chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)

//   entry[chunkName] = path
//   htmlWebpackPlugin.push(
//     new HtmlWebpackPlugin({
//       template,
//       filename: chunkName + '.html',
//     }),
//   )
// }

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/pages/index'),
    foo: path.resolve(__dirname, '../src/pages/foo'),
    bar: path.resolve(__dirname, '../src/pages/bar'),
    barBaz: path.resolve(__dirname, '../src/pages/bar/baz'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // js
      {
        test: /\.js$/,
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
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
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
              name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
      // svg
      {
        test: /\.(svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
          },
        },
      },
      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024, // 8K
            outputPath: 'fonts/',
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
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
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: 'index.html',
      filename: 'index.html',
      title: 'index Page',
    }),
    new HtmlWebpackPlugin({
      chunks: ['foo'],
      template: 'index.html',
      filename: 'foo.html',
      title: 'foo Page',
    }),
    new HtmlWebpackPlugin({
      chunks: ['bar'],
      template: 'index.html',
      filename: 'bar.html',
      title: 'bar Page',
    }),
    new HtmlWebpackPlugin({
      chunks: ['barBaz'],
      template: 'index.html',
      filename: 'bar/baz.html',
      title: 'barBaz Page',
    }),

    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // Copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist'),
      },
    ]),
    // Extract css
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
  ],
}
