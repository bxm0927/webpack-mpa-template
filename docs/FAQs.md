# FAQs

## 我只需要 SPA

该脚手架本质上是多个 SPA 的集合，即每个页面（`main.js`）都可以看做是一个 SPA 的入口。

所以如果你只需要 SPA，可以这样修改该脚手架：

- 。。。

## 我只使用 jQuery + Bootstrap

e………(⊙o⊙)………e

所以如果你只需要 jQuery + Bootstrap，而不需要 Vue/React，可以这样修改该脚手架：

-

## 如何在 Vue 文件中使用图片资源

在 template 中：

```html
<img :src="require('./assets/rabbit.png').default" alt="rabbit" />
```

在 stule 中：

```css
.avatar {
  width: 128px;
  height: 128px;
  background: url('./assets/rabbit.png') no-repeat;
}
```
