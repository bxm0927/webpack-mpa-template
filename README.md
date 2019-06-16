# webpack-mpa-template

这是一个使用 webpack 配置多页应用(MPA)的简易 demo。

多页面依据 `/src` 中的目录**动态生成**。如本例中 `/src` 文件夹下有 `/index`、`/page1`、`/page2` 几个页面，打包后将自动生成 `index.html`、`page1.html`、`page2.html`，几个文件都具有自己独立的依赖。

## Framework

主要框架和库的版本：

Node.js 10.x | webpack 4.x | babel 7.x | babel-loader 8.x

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
