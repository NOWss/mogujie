<template>
  <div ref="box" class="box">
    <div class="top-nav">
      <van-icon name="bars" size="30px" @click="viewFication" />
      <van-search placeholder="秋季连衣裙搭配" shape="round" class="search" v-model="value" @search="onSearch" />
      <van-icon name="cart-o" size="30px" @click="goShopCart"/>
    </div>
    <div class="banner-box">
      <div class="banner-list">
        <div class="item" v-for="(item, index) in shopData" :key="index" @click="goDetail(item.iid)">
          <div class="img-box">
            <img v-lazy="item.img" class="auto-img">
          </div>
          <div class="text-box">
            <div class="title">{{ item.title }}</div>
            <div class="price">￥{{ item.price }}</div>
            <div class="btn-box">
              <van-button type="primary">立即购买</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShop } from '../api/api.js'
export default {
  name: "Attention",

  data() {
    return {
      value: '',

      active: 0,
      // 商品页数
      page: 1,
      // 商品列表
      shopDataAll: [],
      // 懒加载
      shopData: [],
      index: 0
    }
  },
  created() {
    storeShop(this.page).then(res => {
      console.log('res ==>', res);
      this.shopDataAll = res.data.data.wall.docs
      this.shopData = this.shopDataAll.slice(0, 6)
      console.log(this.shopData);
    }).catch(err => {
      console.log('err ==>', err);
    })
  },
  methods: {
    goShopCart() {
      this.$router.push({ name: "ShoppingCart" })
    },

    // 跳转详情页
    goDetail(itemId) {
      this.$router.push({ name: "Detail", params: { itemId } })
    },

    // 跳转分类
    viewFication() {
      this.$router.push({ name: "ClassiFication" })
    },
    // 懒加载
    scrollEvent() {
      const scrollTop = this.$refs.box.scrollTop
      const clientHeight = this.$refs.box.clientHeight;
      const scrollHeight = this.$refs.box.scrollHeight;
      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        this.index += 6
        let data = this.shopDataAll.slice(this.index, this.index + 6)
        data.forEach(item => {
          this.shopData.push(item)
        })
      }
    },
    // 节流函数
    debounce(func, delay = 1000, immediate = false) {
      let timer = null
      //不能用箭头函数
      return function () {
        //在时间内重复调用的时候需要清空之前的定时任务
        if (timer) {
          clearTimeout(timer)
        }
        //适用于首次需要立刻执行的
        if (immediate && !timer) {
          func.apply(this, arguments)
        }
        timer = setTimeout(() => {
          func.apply(this, arguments)
        }, delay)
      }
    },
    onSearch(val) {
      this.$router.push({ name: "Search", params: { q: val } })
    }
  },
  mounted() {
    const box = this.$refs.box
    // console.log(box);
    box.addEventListener("scroll", this.debounce(this.scrollEvent, 500));
  },
  destroyed() {
    // 离开页面取消监听
    document.removeEventListener("scroll", this.debounce(this.scrollEvent, 500));
  },
};
</script>

<style lang="scss" scoped>
.box {
  overflow-y: auto;
  height: 100vh;
}

// 顶部搜索栏
.top-nav {
  background-color: #fff;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #f6f6f6;

  .search {
    width: 240px;
    height: 30px;
    border-radius: 15px;
    background-color: #f5f5f5;
    border: none;
    outline: none;
    padding: 0 10px;
    margin: 0 10px;
  }
}

// banner导航栏
.banner-box {
  padding: 10px;
  margin-bottom: 50px;

  .banner-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .item {
    width: calc(50% - 5px);
    margin-bottom: 10px;
    height: 320px;
    background-color: #fff;
    border-radius: 5px;

    .img-box {
      height: 230px;
      display: flex;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;
    }

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 5px 0;
    }

    .text-box {
      padding: 5px;
    }

    .price {
      font-size: 16px;
      color: #ff5577;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .btn-box {
      >button {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #ff5577;
        color: #fff;
        text-align: center;
        font-size: 12px;
        border: none;
        border-radius: 5px;
      }
    }
  }

}
</style>