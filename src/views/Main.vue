<template>
  <div class="main">
    <div>
      <keep-alive exclude="my">
        <router-view></router-view>
      </keep-alive>

    </div>


    <!-- 导航栏 -->
    <van-tabbar z-index="100" v-model="active" :route="true" @change="onChange">
      <van-tabbar-item v-for="(item, index) in tabbarDatas" :key="index" :to="{ name: item.name }" :icon="item.icon">{{
        item.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "Main",

  data() {
    return {
      active: 0,
      
    };
  },
  methods: {
    onChange(index) {
      if (index === 3 && localStorage.getItem('token') === null) {
        Toast('请先登录');
        console.log(this.tabbarDatas[3].name);
        this.tabbarDatas[3].name = 'Login';

      }
    }
  },
  computed: {
    tabbarDatas() {
      let data = [
        {
          title: "首页",
          icon: "wap-home-o",
          name: "Home",
        },
        {
          title: "商城",
          icon: "shop-o",
          name: "Attention",
        },
        {
          title: "直播",
          icon: "tv-o",
          name: "News",
        },
        {
          title: "我的",
          icon: "contact",
          name: "My",
        },

      ]
      if (localStorage.getItem('token') === null) {
        data[3].name = 'Login';

      }
      // console.log(localStorage.getItem('token'));
      return data
    }
  }
}

</script>

<style lang="scss" scoped></style>