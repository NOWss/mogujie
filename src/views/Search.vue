<template>
  <div class="box" ref="box">
    <div class="top-nav">
      <van-icon name="arrow-left" size="22" @click="viewFication" />
      <van-search placeholder="秋季连衣裙搭配" shape="round" class="search" v-model="value" @search="onSearch" />
    </div>
    <div class="bottom-nav">
      <div class="nav-item" :style="{ color: activeIndex != index ? '#000' : '#e4393c' }"
        v-for="(item, index) in bottomNav" :key="index" @click="toggle(item, index)">{{ item.title }}
      </div>
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
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { search } from '../api/api.js'
export default {
  name: 'Search',
  data() {
    return {
      activeIndex: 0,
      value: '',
      // 综合销量
      bottomNav: [
        {
          title: '综合',
          sort: 'pop'
        },
        {
          title: '销量',
          sort: 'sell'
        },
        {
          title: '新品',
          sort: 'new'
        }
      ],
      shopData: [],
      shopDataAll: [],
      index: 0,
      sort: "pop"
    }
  },
  created() {
    console.log(this.$route.params.q);
    this.value = this.$route.params.q
    // 搜索接口
    search(this.value, this.sort).then(res => {
      console.log('res ==>', res);
      this.shopDataAll = res.data.result.wall.docs
      this.shopData = this.shopDataAll.splice(0, 10)

    }).catch(err => {
      console.log('err ==>', err);
    })
  },
  methods: {
    // 跳转详情页
    goDetail(itemId) {
      this.$router.push({ name: "Detail", params: { itemId } })
    },
    viewFication() {
      this.$router.back()
    },
    // 切换高亮
    toggle(item, index) {
      if (this.activeIndex === index) {
        return;
      }
      this.sort = item.sort
      search(this.value, this.sort).then(res => {
        console.log('res ==>', res);
        this.shopDataAll = res.data.result.wall.docs
        this.shopData = this.shopDataAll.splice(0, 10)
      }).catch(err => {
        console.log('err ==>', err);
      })
      this.activeIndex = index;
    },
    onSearch() {
      search(this.value, this.sort).then(res => {
        console.log('res ==>', res);
        this.shopDataAll = res.data.result.wall.docs
        this.shopData = this.shopDataAll.splice(0, 10)
      }).catch(err => {
        console.log('err ==>', err);
      })
    },
    // 懒加载
    scrollEvent() {
      const scrollTop = this.$refs.box.scrollTop
      const clientHeight = this.$refs.box.clientHeight;
      const scrollHeight = this.$refs.box.scrollHeight;
      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        this.index += 10
        let data = this.shopDataAll.slice(this.index, this.index + 10)
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
}
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
    width: 300px;
    height: 30px;
    border-radius: 15px;
    background-color: #f5f5f5;
    border: none;
    outline: none;
    padding: 0 10px;
  }
}

.bottom-nav {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
}

.nav-item {
  flex: 1;
  text-align: center;
  // padding: 5px 0;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
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
    height: 300px;
    background-color: #fff;
    border-radius: 5px;

    .img-box {
      height: 230px;
      display: flex;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;
      // height: 200px;
    }

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /* 设置行数 */
      -webkit-box-orient: vertical;
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
  }

}
</style>