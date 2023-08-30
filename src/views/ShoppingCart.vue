<template>
  <div class="box">
    <!-- 购物车导航栏 -->
    <van-nav-bar :title="`购物车(${shopData == null ? '0' : shopData.length})`" :right-text="topRightBtn" left-arrow fixed
      placeholder @click-left="back" @click-right="del" />
    <!-- 购物车为空时 -->
    <van-empty description="购物车还没有商品" v-if="shopData === null" />
    <!-- 购物车列表 -->
    <div class="shoplist" v-else>
      <div class="item" v-for="(item, index) in shopData" :key="index">
        <!-- <div class="shop-box">
          <van-checkbox v-model="checked"> 背上的童话</van-checkbox>
        </div> -->
        <div class="banner-box">
          <van-checkbox v-model="item.selectedSkuComb.checked" @change="onSelect"></van-checkbox>
          <div class="img-box">
            <img class="auto-img" :src="item.selectedSkuComb.img">
          </div>
          <div class="text-box">
            <div class="title"> {{ item.selectedSkuComb.title }} </div>
            <div class="detail">
              {{ item.selectedSkuComb.s1Name + ' : ' + item.selectedSkuComb.style + ' ; ' + item.selectedSkuComb.s2Name
                + ' : ' + item.selectedSkuComb.size }}
            </div>
            <div class="price-box">
              <div class="price">￥<span>{{ item.selectedSkuComb.price / 100 }}</span></div>
              <van-stepper v-model="item.selectedNum" theme="round" button-size="20" disable-input />
            </div>
          </div>
        </div>
      </div>
      <!-- 底部结算栏 -->
      <van-submit-bar :price="total" button-text="结算" button-color="#ff5577" @submit="onSubmit" v-show="!delBtn">
        <van-checkbox v-model="checked" @click="allSelect">全选({{ allHasSelect }})</van-checkbox>
      </van-submit-bar>
      <!-- 当点击编辑时 -->
      <van-submit-bar button-text="删除" button-color="#ff5577" @submit="delChecked" v-show="delBtn">
        <van-checkbox v-model="checked" @click="allSelect" style="margin-right: auto;">全选({{ allHasSelect
        }})</van-checkbox>
      </van-submit-bar>
    </div>


  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'ShoppingCart',
  data() {
    return {
      checked: false,
      value: 1,
      shopData: '',
      Nullon: false,
      delBtn: false,
      topRightBtn: '编辑'
    };
  },
  created() {
    this.shopData = JSON.parse(localStorage.getItem('data'))
  },
  methods: {
    del() {
      this.delBtn = !this.delBtn
      this.topRightBtn = this.topRightBtn === '编辑' ? '完成' : '编辑'
    },
    back() {
      this.$router.back()
    },
    onSubmit() {
      let data = this.shopData.filter(item => item.selectedSkuComb.checked)
      let newData = this.shopData.filter(item => !item.selectedSkuComb.checked)
      console.log(data);
      if (data.length === 0) {
        Toast('请选择商品')
        return
      }
      Toast('正在进入结算页面')
      setTimeout(() => {
        localStorage.setItem('shopData', JSON.stringify(data))
        // 删除对应购物车数据
        localStorage.setItem('data', JSON.stringify(newData))
        if (JSON.parse(localStorage.getItem('data')).length === 0){
          localStorage.removeItem('data')
        }
        // data = JSON.parse(localStorage.getItem('data'))
        this.$router.push({ name: 'Pay'})
      }, 500)

    },
    delChecked() {
      if (this.shopData != null) {
        this.shopData = this.shopData.filter(item => !item.selectedSkuComb.checked)
      }

      localStorage.setItem('data', JSON.stringify(this.shopData))
      if (this.shopData.length === 0) {
        this.shopData = null
        localStorage.removeItem('data')
      }
      this.delBtn = !this.delBtn
      this.topRightBtn = this.topRightBtn === '编辑' ? '完成' : '编辑'
      this.checked = false
    },
    allSelect() {
      this.shopData.forEach(item => {
        item.selectedSkuComb.checked = this.checked
      })
    },
    onSelect() {
      let count = 0
      this.shopData.forEach(item => {
        if (item.selectedSkuComb.checked) {
          count++

          if (this.shopData.length === count) {
            this.checked = true
          } else {
            this.checked = false
          }
        }
      })
    }
  },
  computed: {
    // 是否存在选择的商品
    isHasSelect() {
      if (this.shopData != null) {
        let selectPro = this.shopData.filter(item => {
          return item.selectedSkuComb.checked
        })
        return selectPro.length > 0
      }

    },
    allHasSelect() {
      if (this.shopData != null) {
        let select = this.shopData.filter(item => {
          return item.selectedSkuComb.checked
        })
        return select.length
      }
    },
    // 计算总价
    total() {
      let total = 0;
      if (this.shopData != null) {
        // 查找勾选的商品
        this.shopData.forEach(item => {
          if (item.selectedSkuComb.checked) {
            // 计算总价
            total += item.selectedSkuComb.price * item.selectedNum
          }
        })
        return total
      }
      return total
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #efefef;
  min-height: 100vh;
}

.item {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;

  .shop-box {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .banner-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    .text-box {
      width: 200px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;

      >div {
        width: 100%;
      }

      .title {
        font-size: 12px;
        color: #000;
        font-weight: bold;
      }

      .detail {
        margin: 6px 0;
        background-color: #efefef;
        color: gray;
        padding: 5px;
        border-radius: 5px;
      }

      .price-box {
        display: flex;
        justify-content: space-between;


        .price {
          color: #ff5577;
          font-weight: bold;

          >span {
            font-size: 16px;
          }
        }
      }
    }

    .img-box {
      width: 100px;
      height: 100%;
    }
  }
}
</style>