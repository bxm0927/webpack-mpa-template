<template>
  <div class="page-home">
    <h1>Page Index</h1>

    <ul>
      <li>
        <a href="/">index</a>
      </li>
      <li>
        <a href="/page1.html">page1</a>
      </li>
      <li>
        <a href="/page2.html">page2</a>
      </li>
      <li>
        <a href="/page3.html">page3</a>
      </li>
      <li>
        <a href="/page3/page3-child.html">page3-child</a>
      </li>
    </ul>

    <div class="images-box1">
      <img src="../../assets/images/index/cup.png" alt="cup" />
      <img src="@/assets/images/index/cup.png" alt="cup" />
      <img :src="require('@/assets/images/index/cup.png')" alt="cup" />
    </div>

    <div class="image-box2">
      <!-- background-image -->
      <div class="inner"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page-home {
  color: red;
  h1 {
    user-select: none;
  }
}

.images-box1 {
  img {
    width: 100px;
  }
}

.image-box2 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  background-color: pink;
  .inner {
    width: 128px;
    height: 128px;
    background: url('~@/assets/images/index/cup.png') no-repeat;
  }
}
</style>
