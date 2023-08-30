<template>
  <div class="box" ref="box">
    <div class="top-nav">
      <van-icon name="bars" size="30px" @click="viewFication" />
      <van-search placeholder="秋季连衣裙搭配" shape="round" class="search" v-model="value" @search="onSearch" />
      <van-icon name="cart-o" size="30px" @click="goShopCart" />
    </div>
    <div class="banner-box">
      <div class="banner-list">
        <div class="banner-item" v-for="(item, index) in CateData" :key="index">
          <categories>
            <template #img>
              <img class="auto-img" :src="item.image" @click="CateSearch(item.title)" />
            </template>
            {{ item.title }}
          </categories>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="content-list-left">
        <div class="content-item" v-for="(item, index) in commodityDataLeft" :key="index"
          @click="viewPlay(item.itemIdUrl, item.actorIdUrl)">
          <div class="img-box">
            <div class="mask"></div>
            <img class="auto-img" v-lazy="item.itemImage" />
            <div class="zbtj"><span>直播同价</span></div>
            <div class="video">
              <img src="../assets/播放.svg" class="auto-img" />
            </div>
            <div class="name-img">
              <div class="img-box">
                <img :src="item.actorAvatar" class="auto-img" />
              </div>

              <div class="name">{{ item.actorName }}</div>
            </div>
            <div class="hhjjd" v-show="item.actorTag">{{ item.actorTag }}</div>
          </div>
          <div class="text-box">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="price-box">
              <div class="price">
                <span>￥</span>{{ item.showDiscountPrice }}
              </div>
              <div class="exemption">
                <img class="auto-img" v-show="item.bottomIcon" :src="item.bottomIcon" />
              </div>
              <div class="sales-volume">{{ item.sale }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-list-right">
        <div class="content-item" v-for="(item, index) in commodityDataRight" :key="index"
          @click="viewPlay(item.itemIdUrl, item.actorIdUrl)">
          <div class="img-box">
            <div class="mask"></div>
            <img class="auto-img" v-lazy="item.itemImage" />
            <div class="zbtj"><span>直播同价</span></div>
            <div class="video">
              <img src="../assets/播放.svg" class="auto-img" />
            </div>
            <div class="name-img">
              <div class="img-box">
                <img :src="item.actorAvatar" class="auto-img" />
              </div>

              <div class="name">{{ item.actorName }}</div>
            </div>
            <div class="hhjjd" v-show="item.actorTag">{{ item.actorTag }}</div>
          </div>
          <div class="text-box">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="price-box">
              <div class="price">￥{{ item.showDiscountPrice }}</div>
              <div class="exemption">
                <img class="auto-img" :src="item.bottomIcon" v-show="item.bottomIcon" />
              </div>
              <div class="sales-volume">{{ item.sale }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/components/categories.vue";
import { getType, getHomeData } from "../api/api";

export default {
  name: "Home",

  data() {
    return {
      active: 0,
      CateData: [],
      commodityData: [],
      commodityDataLeftAll: [],
      commodityDataRightAll: [],
      commodityDataLeft: [],
      commodityDataRight: [],
      // 商品页数
      page: 0,
      value: ''
    };
  },
  components: {
    categories,
  },
  created() {
    // 获取分类数据
    getType()
      .then((res) => {
        // console.log(res);
        this.CateData = res.data;
        this.CateData = this.CateData.filter((item) => {
          return item.title.length <= 2;
        });
        // console.log(this.CateData);
      })
      .catch((err) => {
        console.log(err);
      });

    // 获取直播商品数据
    // 预先加载
    getHomeData(this.page)
      .then((res) => {
        console.log("获取直播商品数据", res);
        this.commodityData = res.data.data.list;
        // 获取商品数据
        this.commodityDataLeftAll = this.commodityData.filter((item, index) => index % 2 !== 0);

        this.commodityDataLeft = this.commodityDataLeftAll.slice(0, 5)

        this.commodityDataRightAll = this.commodityData.filter((item, index) => index % 2 === 0);

        this.commodityDataRight = this.commodityDataRightAll.slice(0, 5)


      })
      .catch((err) => {
        console.log("获取直播商品数据", err);
      });
  },
  methods: {
    CateSearch(value) {
      this.$router.push({ name: "Search", params: { q: value } })
    },

    scrollEvent() {
      const scrollTop = this.$refs.box.scrollTop
      const clientHeight = this.$refs.box.clientHeight;
      const scrollHeight = this.$refs.box.scrollHeight;


      // 判断是否滚动到底部
      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        if (this.commodityDataLeft.length >= 15 && this.commodityDataRight.length >= 15) {
          return console.log("已经到底部了");
        }
        console.log(scrollTop, clientHeight, scrollHeight);
        this.page += 5;
        let data1 = this.commodityDataLeftAll.slice(this.page, this.page + 5);
        data1.forEach(item => {
          this.commodityDataLeft.push(item)
        })

        let data2 = this.commodityDataRightAll.slice(this.page, this.page + 5);

        data2.forEach(item => {
          this.commodityDataRight.push(item)
        })
      }
    },
    viewPlay(itemUrl, actorUrl) {
      this.$router.push({ name: "VideoPlayer", params: { itemId: itemUrl, actorId: actorUrl } })
    },
    viewFication() {
      this.$router.push({ name: "ClassiFication" })
    },
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
      console.log(val);
      this.$router.push({ name: "Search", params: { q: val } })
    },
    goShopCart() {
      this.$router.push({ name: "ShoppingCart" })
    }

  },
  mounted() {
    const box = this.$refs.box
    // console.log(box);
    box.addEventListener("scroll", this.debounce(this.scrollEvent, 500));
  },
  destroyed() {
    const box = this.$refs.box
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

// 分类栏
.banner-box {
  // width: 100%;

  .banner-list {
    text-align: center;
    padding: 0 8px;
    border-bottom: 1px solid #f6f6f6;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
  }

  .banner-item {
    width: calc(20% - 20px - 10px);
    // background-color: #f5f5f5;
    padding: 5px 10px;
    margin-right: 12px;
    margin-bottom: 5px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}

// 主体栏
.content-box {
  margin-bottom: 50px;
  padding: 0 10px;
  display: flex;
  background-color: #f6f6f6;
  flex-wrap: wrap;

  .content-list-left {
    flex: 1;
    margin-right: 10px;
  }

  .content-list-right {
    flex: 1;
  }

  .content-item {
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
    // padding: 10px;
    overflow: hidden;
    border-bottom: 1px solid #f6f6f6;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 10px;

    .img-box {
      width: auto;
      height: 100%;
      position: relative;

      .mask {
        position: absolute;
        width: 100%;
        height: 20%;
        bottom: 0;
        background: linear-gradient(transparent, #000);
        opacity: 0.7;
      }

      img {
        height: 100%;
        width: 100%;
        vertical-align: bottom;
        z-index: -1;
      }
    }

    .zbtj {
      text-align: center;
      position: absolute;
      width: 35px;
      height: 35px;
      background: linear-gradient(#ff7f3d, #fc7c58);
      font-size: 12px;
      // font-weight: bold;
      border-radius: 0 0 10px 10px;
      color: #fff;
      left: 10px;
      top: 5px;
    }

    .video {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }

  .name-img {
    position: absolute;
    // border-radius: 50%;
    bottom: 10px;
    left: 10px;
    display: flex;
    align-items: center;

    .img-box {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #fff;
    }

    img {
      border-radius: 50%;
      // border: 2px solid #fff;
    }

    .name {
      font-size: 10px;
      color: #fff;
      margin-left: 5px;
    }
  }

  .hhjjd {
    padding: 3px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 8px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .text-box {
    margin-top: 10px;
    padding: 0 5px;

    .title {
      margin: 5px 0;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /* 设置行数 */
      -webkit-box-orient: vertical;
    }

    .price-box {
      display: flex;
      justify-content: space-between;

      .price {
        font-size: 16px;
        color: #ff4466;

        span {
          font-size: 12px;
        }
      }

      .exemption {
        width: 25px;
        margin: auto 5px;
      }

      .sales-volume {
        margin-left: auto;
        color: #ff4466;
        border-radius: 10px;
        padding: 3px;
      }
    }
  }
}
</style>