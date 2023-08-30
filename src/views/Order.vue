<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" right-text="全部订单" @click-right="onClickRight" />
    <div class="top-nav">
      <div class="title">
        <div class="text">已付款，待发货</div>
        <div class="detail">7天内发货</div>
      </div>

    </div>
    <div class="site-box">
      <van-cell center :title="list.name + '  ' + list.tel" :label="list.address" icon="location-o" />
    </div>
    <div class="commodity-box">
      <div class="commodity-list">
        <div class="commodity" v-for="(item, index) in shopData" :key="index">
          <div class="img-box">
            <img :src="item.selectedSkuComb.img" class="auto-img">
          </div>
          <div class="text-box">
            <div class="title">{{ item.selectedSkuComb.title }}</div>
            <div class="detail">{{ item.selectedSkuComb.s1Name + ' : ' + item.selectedSkuComb.style + ' ; ' +
              item.selectedSkuComb.s2Name
              + ' : ' + item.selectedSkuComb.size }}</div>
          </div>
          <div class="price-box">
            <div class="price">￥{{ item.selectedSkuComb.price / 100 }}</div>
            <div class="count">×{{ item.selectedNum }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="insurance">
      <div class="list">
        <div class="item" v-for="(item, index) in commodity" :key="index">
          <div class="left">{{ item.left }}</div>
          <div class="center">{{ item.center }}</div>
          <div class="right">{{ item.right }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      list: [],
      data: [],
      shopData: [],
      allData: [],
      total: 0,
      commodity: [
        {
          left: '商品应付金额：',
          center: '',
          right: ''
        },
        {
          left: '快递运费：',
          center: '包邮',
          right: '￥0.00'
        }, {
          left: '店铺合计(含运费)',
          center: '',
          right: ''
        }, {
          left: '延误必赔',
          center: '',
          right: '商家赠送'
        }
      ]
    }
  },
  created() {
    // 处理数据
    this.data = JSON.parse(localStorage.getItem('shopData'))
    if (JSON.parse(localStorage.getItem('order')) != null) {
      this.allData = JSON.parse(localStorage.getItem('order'))
    }
    else {
      localStorage.setItem('order', JSON.stringify(this.data))
    }

    console.log(this.allData);
    this.allData.total = this.total
    console.log(this.allData);
    this.allData.push(this.data[0])
    localStorage.setItem('order', JSON.stringify(this.allData))
    let data = JSON.parse(localStorage.getItem('shopData'))

    this.list = data[0].selectSite
    this.shopData = data[0].shopData
    this.total = data[0].total
    this.commodity[0].right = `￥${this.total / 100}`
    this.commodity[2].right = `￥${this.total / 100}`
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.push({ name: 'My' })
    },
    // 跳转全部订单
    onClickRight() {
      this.$router.push({ name: 'OrderAll' })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;

  .insurance {
    margin-top: 10px;
    background-color: #fff;

    .item {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      height: 30px;
      line-height: 30px;
      ;
      width: calc(100% - 20px);

      .left {
        margin-right: 10px;
        font-size: 13px;

      }

      .center {
        color: #999;
      }

      .right {
        margin-left: auto;


      }

      &:nth-child(3) {
        font-size: 14px;
        font-weight: bold;

        .right {
          color: #ff5577;
          font-size: 16px;
        }
      }
    }
  }


  .top-nav {
    width: calc(100% - 40px);
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ff5577;

    .title {
      width: 100%;
      font-size: 16px;
      font-weight: 550;
      color: #fff;


      .detail {
        margin-top: 5px;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }

  .commodity-box {
    margin-top: 10px;
    padding: 10px;
    width: calc(100% - 20px);
    background-color: #fff;


    .commodity {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      align-items: center;
      align-content: space-around;

      .img-box {
        width: 100px;

      }

      .text-box {
        width: 200px;

        .title {
          font-size: 13px;
          font-weight: bold;
        }

        .detail {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }

      .price-box {
        .price {
          font-size: 16px;
          color: #ff5577;
          font-weight: bold;
        }

        .count {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
          text-align: right;
        }
      }
    }
  }
}
</style>