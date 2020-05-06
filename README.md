# webpack-mpa-template

这是一个使用 webpack 配置的多页应用(MPA)脚手架，页面使用 Vue 开发，支持开发热更新，你可以把每一个页面看作是一个局部的 SPA。

无 SEO 支持，如果在前后端分离项目中有 SEO 的需求，请考虑如下组合：`Vue + Nuxt.js` or `React + Next.js`

公共资源放到 `/src/assets/` 中进行管理，私有资源就近维护。

## 框架和技术栈

主要框架和库的版本：

Node.js 10.x | webpack 4.x | babel 7.x | babel-loader 8.x

## 项目目录结构

## Usage

```bash
# install dependencies
$ npm install

# dev
$ npm run dev

# build for development
$ npm run build:dev

# build for production
$ npm run build:prod

# analyse
$ npm run analyse
```
