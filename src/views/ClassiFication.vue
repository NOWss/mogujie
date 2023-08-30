<template>
  <div class="fication">
    <div class="top-nav">
      <van-icon name="wap-home-o" size="24px" @click="goHome" />
      <van-search placeholder="秋季连衣裙搭配" shape="round" class="search" />
      <van-icon name="shopping-cart-o" size="24px" />
    </div>

    <div class="aside-menu">
      <div class="aside">
        <van-sidebar v-model="activeKey" @change="selectType">
          <van-sidebar-item :title="item.title" v-for="(item, index) in typeData" :key="index" />
        </van-sidebar>
      </div>
      <div class="content">
        <div class="top-list">
          <div class="top-item" v-for="(item, index) in productDataTop" :key="index" @click="CateSearch(item.title)">
            <div class="img-box">
              <img class="auto-img" :src="item.image">
            </div>
            <div class="text-box">{{ item.title }}</div>
          </div>
        </div>
        <div class="bottom-box">
          <div class="bottom-nav">
            <div class="nav-item" :style="{ color: activeIndex != index ? '#000' : '#e4393c' }"
              v-for="(item, index) in bottomNav" :key="index" @click="toggle(item, index)">{{ item.title }}
            </div>
          </div>
          <div class="bottom-list">
            <div class="bottom-item" v-for="(item, index) in productDataBottom" :key="index" @click="goDetail(item.iid)">
              <div class="img-box">
                <img class="auto-img" v-lazy="item.img">
              </div>
              <div class="text-box">
                {{ item.title }}
              </div>
              <div class="price-box">
                &yen; {{ item.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData, getCategoryChildDataTop, getCategoryChildDataBottom } from '../api/api';

export default {
  name: 'ClassiFication',
  data() {
    return {
      activeKey: 0,
      // 商品类型
      typeData: [],

      //商品数据(上面)
      productDataTop: [],

      // 商品数据(下面)
      productDataBottom: [],

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

      // 切换类型
      sort: 'pop',
      // 高亮
      activeIndex: 0
    };
  },
  created() {
    getCategoryData().then(res => {
      console.log(res);
      if (res.status === 200) {
        // 商品类型
        this.typeData = res.data.data?.[117330].list;
        // console.log(this.typeData);
        let type = this.typeData[this.activeKey].maitKey;

        let type1 = this.typeData[this.activeKey].miniWallkey;

        this.getProductByTypeTop(type);

        this.getProductByTypeBottom(type1, 1, this.sort)
      }
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    selectType(index) {

      let type = this.typeData[index].maitKey;

      let type1 = this.typeData[index].miniWallkey;
      console.log(type);

      this.getProductByTypeTop(type);

      this.getProductByTypeBottom(type1, 1, this.sort)

    },

    //根据类型获取商品数据(顶部)
    getProductByTypeTop(value) {
      getCategoryChildDataTop(value).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.productDataTop = res.data.data.list;
        }

      }).catch(err => {

        console.log(err)
      })
    },

    // 根据类型获取商品数据(底部)
    getProductByTypeBottom(pid, page, sort) {
      getCategoryChildDataBottom(pid, page, sort).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.productDataBottom = res.data.result.wall.docs;

          this.productDataBottom = this.productDataBottom.slice(0, 10)
        }

      }).catch(err => {
        console.log(err);
      })
    },

    // 切换高亮
    toggle(item, index) {
      if (this.activeIndex === index) {
        return;
      }
      console.log(item.sort);
      this.sort = item.sort;
      let type = this.typeData[this.activeKey].miniWallkey
      this.getProductByTypeBottom(type, 1, this.sort)
      this.activeIndex = index;
    },
    goHome() {
      this.$router.push({ name: "Home" })
    },
    goDetail(itemId) {
      this.$router.push({ name: 'Detail', params: { itemId } })
    },
    CateSearch(value) {
      this.$router.push({ name: "Search", params: { q: value } })
    }

  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}


.top-list {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 20px);
  // padding: 10px;
  // justify-content: space-between;
  border-bottom: 1px solid #ddd;

  // margin-left: 5px;
  .top-item {
    margin-left: 10px;
    width: 80px;
  }

  .text-box {
    margin: 15px 0;
    text-align: center;
  }
}

.bottom-box {
  .bottom-nav {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
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

  .bottom-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-between;
  }

  .bottom-item {
    width: calc(50% - 2px);
    margin-bottom: 10px;

    .img-box {
      height: 180px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      align-items: center;
      background-color: #ddd;
    }

    .text-box {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 5px 0;
      font-size: 12px;
    }

    .price-box {
      color: #ff5577;
      font-size: 16px;
      font-weight: bold;
    }
  }


}

.fication {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: #ddd;
}

.top-nav {
  background-color: #fff;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #f6f6f6;

  .search {
    margin: 10px 0;
    width: 250px;
    height: 30px;
    border-radius: 15px;
    background-color: #f5f5f5;
    border: none;
    outline: none;
    padding: 0 10px;
  }
}

.aside-menu {
  height: calc(100% - 54px - 10px);
  display: flex;
  margin-top: 10px;
  width: 100%;

  >div {
    height: 100%;

    &.aside {
      background-color: #fff;
      width: 80px;
      height: 99vh;
      overflow-y: auto;
    }

    &.content {
      width: calc(100% - 80px);
      // padding: 0 10px;
      overflow-y: auto;
    }
  }

  .van-sidebar-item {
    padding: 12px 0;
    text-align: center;
  }

  .van-sidebar-item--select::before {
    background-color: #ff5577;
  }

  .van-sidebar-item--select {
    font-weight: bold;
    color: #ff5577;
  }
}
</style>