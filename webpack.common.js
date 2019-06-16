/*
 * Webpack Common Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-05-28 18:03:12
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-16 18:23:19
 */

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const devMode = process.env.NODE_ENV !== 'production'

const plugins = [
  new VueLoaderPlugin(),
  new CleanWebpackPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  // new HtmlWebpackPlugin({
  //   template: path.resolve(__dirname, './index.html'),
  //   favicon: './favicon.ico',
  // }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
]

let entry = {}

function getEntry(globPath, pathDir) {
  let files = glob.sync(globPath)
  console.log('files: ', files)
  let entries = {},
    entry,
    dirname,
    basename,
    pathname,
    extname

  for (let i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.join(dirname, basename)
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname
    entries[pathname] = ['./' + entry]
  }
  console.log('entries: ', entries)
  return entries
}

let pages = Object.keys(getEntry('./src/*/*.html', 'src'))
console.log('pages: ', pages)

pages.forEach(function(pathname) {
  const fileName = pathname.split('/')[1]
  const conf = {
    template: 'src' + pathname + '.html',
  }
  plugins.push(new HtmlWebpackPlugin(conf))
  entry[fileName] = `./src/${pathname}.js`
})

module.exports = {
  entry,
  plugins,
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
}
