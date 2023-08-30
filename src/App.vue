<template>
  <div id="app">
    <keep-alive include="main">
      <router-view></router-view>
    </keep-alive>
      

  </div>
</template>

<script>
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
// body{
//   overflow-y: hidden;
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // background: #999;
  background-color: #f6f6f6;
  color: #2c3e50;
}

.auto-img {
  width: 100%;
  display: block;
  overflow: hidden;
}
</style>
