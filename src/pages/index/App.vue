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
      <img :src="cup" alt="cup" />
      <!-- <img src="@/assets/images/index/cup.png" alt="cup" /> -->
      <!-- <img src="../../assets/images/index/cup.png" alt="cup" /> -->
      <!-- <img :src="require('@/assets/images/index/cup.png')" alt="cup" /> -->
    </div>

    <div class="image-box2">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script>
import cup from '@/assets/images/index/cup.png'

export default {
  data() {
    return {
      cup,
    }
  },
}
</script>

<style lang="scss" scoped>
.page-home {
  color: red;
  user-select: none; // test autoprefixer
  background: url('~@/assets/images/common/bg.jpg') no-repeat;
  background-size: cover;
  background-color: $bg-color;
}

.images-box1 {
  img {
    width: 50px;
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
    background: url('~@/assets/images/common/rabbit.png') no-repeat;
  }
}
</style>
