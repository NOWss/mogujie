<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="订单列表" left-arrow @click-left="onClickLeft" />

    <div class="order-list">
      <div class="order-item" v-for="(item, index) in orderAll" :key="index">
        <div class="title">待发货</div>
        <div class="banner-box" v-for="(i, v) in item.shopData" :key="v">
          <div class="img-box">
            <img :src="i.selectedSkuComb.img" class="auto-img">
          </div>
          <div class="text-box">
            <div class="text-title">{{ i.selectedSkuComb.title }}</div>
            <div class="detail">{{ i.selectedSkuComb.s1Name + ' : ' + i.selectedSkuComb.style + ' ; ' +
              i.selectedSkuComb.s2Name
              + ' : ' + i.selectedSkuComb.size }}</div>
          </div>
          <div class="price-box">
            <div class="price">￥{{ i.selectedSkuComb.price / 100 }}</div>
            <div class="count">x{{ item.selectedNum }}</div>
          </div>

        </div>
        <div class="price-box">
          <div class="price">全国包邮，总计：<span><i>￥</i>{{ item.total / 100 }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderAll',
  data() {
    return {
      orderAll: [],
      total: 0
    }
  }
  ,
  created() {

    this.orderAll = JSON.parse(localStorage.getItem('order'))
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'My' })
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  min-height: 100vh;
}

.price-box {
  .price {
    text-align: right;

    >span {
      font-size: 16px;
      font-weight: bold;
      color: #ff5577;
      >i{
        font-size: 12px;
        font-style: normal  ;
      }
    }
  }
}

.order-list {
  padding: 0 10px;

  .order-item {
    border-radius: 20px;
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;


    .title {
      padding: 0 10px;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .banner-box {
      display: flex;
      // justify-content: space-between;
      margin-bottom: 10px;

      // &:last-child {
      //   border-bottom: 1px solid #eee;
      // }

      .img-box {
        display: flex;
        justify-content: center;
        max-width: 80px;
        width: 80px;
        height: 80px;
        overflow: hidden;

        >img {
          height: 100%;
          width: auto;
          max-width: 80px;
        }
      }

      .text-box {
        margin-left: 15px;
        flex: 1;
        width: 200px;

        .text-title {
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* 设置行数 */
          -webkit-box-orient: vertical;
          font-weight: bold;
        }

        .detail {
          color: #999;
        }
      }

      .price-box {
        text-align: right;

        .price {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>