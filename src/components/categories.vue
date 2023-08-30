<template>
  <div class="container">
    <div class="img-box">
      <slot name="img"><img class="auto-img" src="" alt="" /></slot>
    </div>
    <div class="text">
      <slot>女装</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "categories",

};
</script>

<style lang="scss" scoped>
.container {
  width: 50px;
}

.img-box {
  // width: 50px;
  background-color: #ddd;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
}

.text {
  margin: 0 auto;
  font-size: 14px;
  color: #666;
  // text-align: center;
}
</style>