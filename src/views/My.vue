<template>
  <div class="box">
    <div class="top-bg"></div>
    <div class="box1">
      <div class="information">
        <div class="photo">
          <img :src="headImg" class="auto-img">
        </div>
        <div class="name">{{ message }}</div>
      </div>
      <div class="icon-box">
        <div class="icon" v-for="(item, index) in iconData" :key="index">
          <van-icon :name="item.icon" size="36" :color="item.color" />
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
      <div class="shop-box" @click="goShopCart">
        <div class="shop-car" >
          <div class="shop-name">购物车</div>
          <div class="img-box">
            <img src="../assets/shopcart.png" class="auto-img">
          </div>
        </div>
        <div class="red-packet">
          <div class="kqhb">
            <div class="left">卡券红包</div>
            <div class="right">0张活动券 <span>&gt;</span></div>
          </div>
          <div class="btbz">
            <div class="left">补贴保障</div>
            <div class="right">退货补运费 <span>&gt;</span></div>
          </div>
          <div class="wdqb">
            <div class="left">我的钱包</div>
            <div class="right">白付美在这 <span>&gt;</span></div>
          </div>
        </div>
      </div>
      <div class="my-order">
        <div class="title">
          <div class="order-name">我的订单</div>
          <div class="order-all" @click="allOrder">全部 <span>&gt;</span></div>
        </div>
        <div class="order-list">
          <div class="item" v-for="(item, index) in orderData" :key="index">
            <div class="img-box">
              <img :src="item.icon" class="auto-img">
            </div>
            <div class="text">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="my-set">
        <div class="title">
          <div class="order-name">我的设置</div>
        </div>
        <div class="set-list">
          <div class="item" v-for="(item, index) in setData" :key="index">
            <div class="img-box">
              <img :src="item.icon" class="auto-img">
            </div>
            <div class="text">{{ item.title }}</div>
          </div>
        </div>

      </div>
      <div class="log-out"><van-button type="primary" class="btn" @click="backLogin">退出登录</van-button></div>
    </div>
  </div>
</template>

<script>
// import { myMessage } from '../api/login.js'
import { Toast } from 'vant'
export default {
  name: "My",

  data() {
    return {
      active: 0,
      iconData: [
        { icon: 'wap-home', title: '我的主页', color: '#fd8c80' },
        { icon: 'chat', title: '消息', color: '#89cbf9' },
        { icon: 'star', title: '收藏', color: '#f9b55e' },
        { icon: 'like', title: '关注', color: '#fd8a98' }
      ],
      orderData: [
        { icon: require('../assets/wfk.png'), title: '未付款' },
        { icon: require('../assets/wfh.png'), title: '未发货' },
        { icon: require('../assets/dsh.png'), title: '待收货' },
        { icon: require('../assets/dpj.png'), title: '待评价' },
        { icon: require('../assets/tksh.png'), title: '退款售后' }
      ],
      setData: [
        { icon: require('../assets/qd.png'), title: '签到' },
        { icon: require('../assets/dym.png'), title: '大姨妈' },
        { icon: require('../assets/kfzx.png'), title: '客服中心' },
        { icon: require('../assets/drzx.png'), title: '达人中心' }
      ],
      message: {},
      headImg: ''
    }
  },
  created() {
    let token = localStorage.getItem('token')
    this.axios({
      method: 'get',
      url: 'http://1.12.73.162/api/apiCheckToken',
      params: {
        token: token
      }
    }).then(res => {
      console.log(res);
      this.message = res.data.nickName
      // console.log(this.message);
    }).catch(err => {
      console.log(err);
    }),
      this.axios({
        method: 'get',
        url: 'http://1.12.73.162/api/apiGetUserInfo',
        params: {
          token: token
        }
      }).then(res => {
        console.log(res);
        this.headImg = res.data.data.avater
        console.log(this.headImg);
      }).catch(err => {
        console.log(err);
      })
  },
  methods: {
    backLogin() {
      localStorage.removeItem('token')
      setTimeout(() => {
        Toast('退出登录')
        this.$router.push({ name: 'Login' })
      }, 500)

    },
    allOrder() {
      this.$router.push({ name: 'OrderAll' })
    },
    goShopCart() {
      this.$router.push({ name: 'ShoppingCart' })
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #f6f6f6;
  height: 750px;
  overflow-y: auto;
}

.top-bg {
  position: absolute;
  width: 100%;
  height: 70px;
  background-color: #ff5577;
  z-index: 1;
}

.box1 {
  padding: 10px;
  width: calc(100% - 20px);
  position: absolute;
  top: 40px;
  z-index: 2;

  >div {
    margin-bottom: 10px;
  }


  .information {
    height: 100px;
    width: calc(100% - 40px);
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
  }

  .photo {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 30px;
    box-sizing: border-box;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    color: #5e5e5e;
  }

  .icon-box {
    height: 70px;
    width: calc(100% - 40px);
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    text-align: center;
    justify-content: space-between;
  }

  .shop-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    >div {
      width: calc(50% - 30px - 5px);
      background-color: #fff;
      padding: 15px;
      height: 100px;
      border-radius: 10px;
    }

    .shop-car {
      font-size: 14px;
      position: relative;
      z-index: -1;

      .img-box {
        width: 150px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -1;
      }
    }

    .red-packet {
      height: 130px;
      padding: 0 15px;

      >div {
        display: flex;
        justify-content: space-between;
        height: calc(33% - 20px);
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        align-items: center;

        &:last-child {
          border-bottom: 0;
        }

        .left {
          font-size: 14px;
          color: #000;
        }

        .right {
          color: #b3b3b3;

          >span {
            font-family: '仿宋';
          }
        }
      }
    }


  }

  .my-order {
    height: 120px;
    width: calc(100% - 20px);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    padding: 0 10px;
    background-color: #fff;
    text-align: center;
    justify-content: space-between;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      height: 20px;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;

      .order-name {
        font-size: 14px;
        color: #000;
      }

      .order-all {
        color: #b3b3b3;

        >span {
          font-family: '仿宋';
        }
      }
    }

    .order-list {
      display: flex;
      text-align: center;
      justify-content: space-around;
      width: 100%;

      .item {
        .img-box {
          width: 30px;
          height: 30px;
          margin: 0 auto;
        }
      }
    }
  }

  .my-set {
    height: 120px;
    width: calc(100% - 20px);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    padding: 0 10px;
    background-color: #fff;
    text-align: center;
    justify-content: space-between;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      height: 20px;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
      color: #000;
    }

    .set-list {
      display: flex;
      text-align: center;
      width: 100%;
      justify-content: space-around;

      .item {

        .img-box {
          width: 30px;
          height: 30px;
          margin: 0 auto;
        }
      }
    }
  }

  .log-out {
    >button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #ff5577;
      color: #fff;
      text-align: center;
      font-size: 16px;
      border: none;
      border-radius: 10px;
    }

  }
}
</style>