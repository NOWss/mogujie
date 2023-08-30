<template>
  <div class="box">
    <van-nav-bar class="topBar" title="确认订单" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <div class="content">
      <!-- 收货地址栏 -->
      <div class="site">
        <van-notice-bar left-icon="volume-o" background="#ffe6e8" color="#ff5577" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        <van-cell center :title="list.length > 0 ? selectSite.name + '  ' + selectSite.tel : '请填写收货地址'"
          :label="list.length > 0 ? selectSite.address : ''" icon="location-o" is-link @click="showPropup" />
        <van-popup v-model="show" position="bottom">
          <div class="siteList">
            <van-empty description="您还没有收货地址哦~" v-if="list.length === 0" />

            <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @select="onSelect"
              @edit="onEdit" />
            <!-- 新建地址弹出层 -->
            <van-popup v-model="newSite" position="bottom">
              <van-address-edit :area-list="areaList" :address-info="addressInfo" show-delete show-set-default
                @save="onSave" v-model="chosenAddressId" />
            </van-popup>
            <!-- 编辑地址弹出层 -->
            <van-popup v-model="editSite" position="bottom">
              <van-address-edit :area-list="areaList" :address-info="addressInfo" show-delete show-set-default
                @save="editSave" @delete="onDelete" v-model="chosenAddressId" />
            </van-popup>
          </div>
        </van-popup>
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

        <div class="insurance">
          <div class="list">
            <div class="item" v-for="(item, index) in commodity" :key="index">
              <div class="left">{{ item.left }}</div>
              <div class="center">{{ item.center }}</div>
              <div class="right">{{ item.right }}</div>
            </div>
            <div class="all-price">
              <div class="count">共 1 件</div>
              <div class="price">店铺合计：<span>￥{{ total / 100 }}</span></div>
            </div>
          </div>
        </div>
        <van-submit-bar :price="total" button-text="提交订单" text-align="left" @submit="onPassword" />
        <van-popup v-model="propupPassword" position="bottom" style="height: 70vh;">
          <van-password-input :value="password" :focused="showKeyboard" @focus="showKeyboard = true" info="输入六位数字密码"
            :error-info="errorInfo" />
          <!-- 数字键盘 -->
          <van-number-keyboard v-model="password" :show="showKeyboard" @blur="showKeyboard = false" />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

import { areaList } from '@vant/area-data';
export default {
  name: 'Pay',
  data() {
    return {
      shopData: [],
      errorInfo: '',
      password: '',
      showKeyboard: true,
      show: false,
      newSite: false,
      editSite: false,
      propupPassword: false,
      editIndex: 0,
      chosenAddressId: '1',
      // 渲染的地址列表
      list: [],
      // 省市区数据
      areaList,
      id: 0,
      // 地址表单数据
      addressInfo: {},
      // 选中地址
      selectSite: {},
      commodity: [
        {
          left: '快递运费',
          center: '全国包邮',
          right: '￥0.00'
        },
        {
          left: '意外换新',
          center: '出现意外破损可换新',
          right: ''
        }, {
          left: '退货补运费',
          center: '',
          right: '退货预计补贴8.00'
        }, {
          left: '延误必赔',
          center: '',
          right: '商家赠送'
        },
      ],
      value: '',
      shopData: [],
      correctPassword: '143937',
    }
  },
  created() {
    this.shopData = JSON.parse(localStorage.getItem('shopData'))
    console.log(this.shopData);
    if (JSON.parse(localStorage.getItem('address')) != null) {
      this.list = JSON.parse(localStorage.getItem('address'))
      this.id = this.list.length
      let site = this.list.filter(item => {
        return item.isDefault == true
      })
      this.selectSite = site[0] || this.list[0]
    }
  },
  methods: {
    onPassword() {
      this.propupPassword = true
    },
    showPropup() {
      this.show = true
    },
    onClickLeft() {
      this.$router.back()
    },
    onAdd() {
      this.newSite = true
    },
    onSave(data) {
      this.id++
      console.log(data);
      data.address = data.province + data.city + data.county + data.addressDetail;
      data.id = this.id;
      if (data.isDefault) {
        this.list.forEach(item => {
          item.isDefault = false
        })
      }
      if (this.list.length == 0) {
        this.selectSite = data
      }
      this.list.push(data)

      console.log(data);
      localStorage.setItem('address', JSON.stringify(this.list));
      this.newSite = false
      this.addressInfo = {}
    },
    onSelect(item, index) {
      console.log(item, index);
      this.selectSite = item
      console.log(this.selectSite);
    },
    onDelete() {
      Toast('delete');
    },
    // 编辑地址
    onEdit(item, index) {
      this.editSite = true
      this.addressInfo = item
      this.editIndex = index
      // console.log(item, index);
    },
    editSave(data) {
      data.address = data.province + data.city + data.county + data.addressDetail;
      data.id = this.editIndex + 1
      if (data.isDefault) {
        this.list.forEach(item => {
          item.isDefault = false
        })
      }
      this.list[this.editIndex] = data

      console.log(this.list);
      localStorage.setItem('address', JSON.stringify(this.list));
      this.editSite = false
      this.addressInfo = {}
    }
  },
  computed: {
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
  },
  watch: {
    password(password) {
      if (password.length === 6 && password != this.correctPassword) {
        this.errorInfo = '密码错误'
        this.password = ''

      } else if (password.length === 6 && password === this.correctPassword) {
        Toast('支付成功，即将跳转到订单页面')
        let data = this.shopData

        if (data.length === 0) {
          localStorage.removeItem('data')
        }
        this.password = ''
        console.log(this.total);
        setTimeout(() => {
          let data = JSON.parse(localStorage.getItem('shopData'))
          data[0].total = this.total
          data[0].selectSite = this.selectSite
          data[0].shopData = this.shopData
          localStorage.setItem('shopData', JSON.stringify(data))
          console.log(data);
          this.$router.push({ name: 'Order' })
        }, 1000);
      }
    }
  }
}

</script>

<style lang="scss" scoped>
::v-deep .van-password-input {
  top: 30px;
}

.all-price {
  display: flex;
  justify-content: right;
  padding: 10px;

  .count {
    color: #999;
    margin-right: 10px;
  }

  .price {
    >span {
      color: #ff5577;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.commodity-box {
  margin-top: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  background-color: #fff;

  .commodity-list {
    border-bottom: 1px solid #eee;
  }

  .commodity {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;


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
        font-size: 13px;
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
}

::v-deep .van-cell__left-icon {
  margin-right: 15px;
  font-size: 24px;
}

::v-deep .van-button--danger,
.van-tag--danger {
  color: #fff;
  background-color: #ff5577;
}

::v-deep .van-address-item .van-radio__icon--checked .van-icon {
  background-color: #ff5577;
  border-color: #ff5577;
}

::v-deep .van-switch--on {
  background-color: #ff5577;
}

.box {
  height: 100vh;
}

.siteList {
  min-height: 60vh;

}

.siteNull {
  height: 60vh;
  position: relative;
}

.newSite {
  text-align: center;
  padding: 0 0.42667rem;
  position: absolute;
  bottom: 5px;
  width: calc(100% - 0.85333rem);

  .newSiteBtn {
    background-color: #ee0a24;
    border: none;
    color: #fff;
    width: 100%;
    height: 1.06667rem;
    font-size: 14px;
    border-radius: 30px;
  }
}
</style>