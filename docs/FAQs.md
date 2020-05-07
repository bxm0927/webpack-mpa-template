# FAQs

## 我只需要 SPA

该脚手架本质上是多个 SPA 的集合，即每个页面（`main.js`）都可以看做是一个 SPA 的入口。

所以如果你只需要 SPA，可以这样修改该脚手架：

- ...

## 如何在 Vue 文件中使用图片资源

在 `template` 中：

```html
<!-- 推荐 -->
<img src="@/assets/images/index/cup.png" alt="cup" />

<!-- 不推荐 -->
<img src="../../assets/images/index/cup.png" alt="cup" />
<img :src="require('@/assets/images/index/cup.png')" alt="cup" />
```

在 `style` 中：

```css
.inner {
  width: 128px;
  height: 128px;
  background: url('~@/assets/images/common/rabbit.png') no-repeat;
}
```
