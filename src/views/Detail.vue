<template>
  <div class="box">
    <!-- 返回图标 -->
    <div @click="goHome"><van-icon name="arrow-left" class="return" size="22" /></div>

    <!-- 底部导航栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goShopCart" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="showProp" />
    </van-goods-action>

    <div class="big-box">
      <!-- 头部 -->
      <div class="banner-box">
        <van-swipe @change="onChange" width="100%">
          <van-swipe-item class="swriper" v-for="(item, index) in topImages" :key="index">
            <div class="img-box">
              <img v-lazy="item" class="auto-img">
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ topImages.length }}</div>
          </template>
        </van-swipe>
      </div>
      <div class="info-box">
        <!-- 商品信息 -->
        <div class="item-info">
          <div class="price-box">
            <div class="price">
              ¥ <span>{{ normalPrice.nowPrice }}</span>起&nbsp;
              <div class="discount">7折</div>
            </div>
            <div class="quantity-sold">
              已售{{ normalPrice.sales }}
            </div>
          </div>

        </div>
        <!-- 优惠券 -->
        <div class="ticket">
          <div class="ticket-box">
            <div class="ticket-left">
              新人券满9减2
            </div>
            <div class="ticket-right">
              领券 <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <!-- 商品名称 -->
        <div class="title-box">
          <div class="title">
            {{ itemInfo.title }}
          </div>
          <div class="icon-title">
            <van-icon name="friends-o" />
            <span>帮我选</span>
          </div>
        </div>
      </div>
      <!-- 商品参数 -->
      <div class="arguments-box">
        <div class="select" v-for="(item, index) in select" :key="index">
          <div class="select-left">{{ item.left }}</div>
          <div class="select-center">{{ item.center }}</div>
          <div class="select-right"
            :style="{ fontFamily: item.right != '' ? '' : '仿宋', fontWeight: item.right != '' ? '' : 'bold' }">{{
              item.right != '' ? item.right :
              '&gt;' }}</div>
        </div>
      </div>
      <!-- 评价 -->
      <div class="appraise">
        <div class="appraise-left">评价<span>(0)</span></div>
        <div class="appraise-right">暂无评分</div>
      </div>
      <!-- 店铺 -->
      <div class="shop-box">
        <div class="img-box">
          <img :src="shopInfo.shopLogo" class="auto-img">
        </div>
        <div class="text">
          <div class="name">{{ shopInfo.name }}</div>
          <div class="level">
            <div style="color: #ff5577;">
              <span v-for="(item, index) in shopInfo.level" :key="index">★</span>
            </div>
            <div>{{ shopInfo.saleDescV2 }}</div>
          </div>
          <div class="volume">
            <div class="attention" v-for="(item, index) in shopInfo.shopLabels" :key="index">{{ item.text }}</div>
          </div>
        </div>
        <div class="goShop">
          进店
          <span>&gt;</span>
        </div>
      </div>

      <!-- 图文详情 -->
      <div class="detail-box">
        <div class="title">{{ detailInfo.desc }}</div>
        <div class="img-box" v-for="(item, index) in detailImage" :key="index">
          <img :src="item" class="auto-img">
        </div>

      </div>

      <!-- 弹出购买详情 -->
      <van-sku v-model="show" :sku="sku" :goods="goods" :quota="0" :hide-stock="sku.hide_stock"
        :message-config="messageConfig" :initial-sku="initialSku" @sku-selected="toggleImg" add-cart-text="确定"
        :show-add-cart-btn="false" @buy-clicked="goShopCar" buy-text="确定" />

    </div>
  </div>
</template>

<script>
import { getDetail } from '../api/api.js'
import { Toast } from 'vant'
export default {
  name: 'Detail',
  data() {
    return {
      // 弹出层开关
      show: false,
      // 购物车数据
      dataArr: [],

      current: 0,
      // 轮播图数据
      topImages: '',
      // 商品信息
      itemInfo: '',
      // 商品参数
      select: [
        {
          left: '免邮费',
          center: '',
          right: ' '
        }, {
          left: '服务',
          center: '72小时发货 | 7天无理由发货 | 延误必陪',
          right: ``
        },
      ],
      normalPrice: '',

      shopInfo: {},

      detailInfo: {},

      // 商品规格对象
      skuInfo: {},
      skuPropsColor: {},
      detailImage: {},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          // {
          //   id: 2259, // skuId
          //   s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
          //   s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
          //   price: 2376, // 价格（单位分）
          //   stock_num: 1000 // 当前 sku 组合对应的库存
          // },
          // {
          //   id: 2259, // skuId
          //   s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
          //   s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
          //   price: 100, // 价格（单位分）
          //   stock_num: 110 // 当前 sku 组合对应的库存
          // }
        ],
        price: '14.17~35.53', // 默认价格（单位元）
        stock_num: 14698, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品


        hide_stock: false // 是否隐藏剩余库存


      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: '',
        s2: '',
        // 初始选中数量
        selectedNum: 1,
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
        // selectedProp: {
        //   123: [1222]
        // }
      },
      goods: {
        // 数据结构见下方文档
        picture: ''
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve('https://img01.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: 'xxx',
          tel: 'xxx',

        }
      },
      customStepperConfig: {
        // 自定义限购文案
        quotaText: '每次限购xxx件',
        // 自定义步进器超过限制时的回调
        handleOverLimit: (data) => {
          const { action, limitType, quota, quotaUsed, startSaleNum } = data;

          if (action === 'minus') {
            Toast(startSaleNum > 1 ? `${startSaleNum}件起售` : '至少选择一件商品');
          } else if (action === 'plus') {
            // const { LIMIT_TYPE } = Sku.skuConstants;
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              let msg = `单次限购${quota}件`;
              if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
              Toast(msg);
            } else {
              Toast('库存不够了');
            }
          }
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => { },
        // 库存
        stockNum: 1999,
        // 格式化库存
        stockFormatter: stockNum => { },
      },
    }
  },
  created() {
    // 接口
    getDetail(this.$route.params.itemId).then((res) => {
      console.log('res ==>', res);
      this.topImages = res.data.data.result.topImages
      this.itemInfo = res.data.data.result.itemInfo
      this.normalPrice = res.data.data.result.normalPrice
      this.shopInfo = res.data.data.result.shopInfo
      this.detailInfo = res.data.data.result.detailInfo
      this.detailImage = this.detailInfo.detailImage[0].list
      this.sku.price = `${this.itemInfo.lowNowPrice}~${this.itemInfo.highNowPrice}`
      // 获取商品参数信息
      this.skuInfo = res.data.data.result.skuInfo
      console.log(this.itemInfo);
    }).catch(err => {
      console.log('err ==>', err);
    })
    // 颜色参数
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    showProp() {
      this.show = !this.show;
      this.sku.tree = [];
      this.sku.list = [];

      let treeObj = {
        k: '', k_s: '', v: []
      }
      let listObj = { id: 0, price: 0, stock_num: 0 }

      this.skuInfo.props.forEach((item, index) => {
        treeObj.k = item.label
        treeObj.k_s = `s${index + 1}`
        //  listObj[treeObj.k_s] = 0
        treeObj.v = item.list
        const a = treeObj.v.map(item => {
          return {
            id: item.index,
            name: item.name,
            price: item.price,
            stock_num: item.stock_num
          }
        })
        treeObj.v = [...a]
        this.sku.tree.push({ ...treeObj })
      });


      // console.log(a);
      console.log(treeObj);

      this.skuInfo.skus.forEach((item) => {
        listObj.s1 = item.styleId
        listObj.s2 = item.sizeId
        listObj.price = item.nowprice
        listObj.stock_num = item.stock
        listObj.img = item.img
        listObj.size = item.size
        listObj.style = item.style
        listObj.title = this.itemInfo.title
        listObj.shopName = this.shopInfo.name
        listObj.checked = false
        listObj.s1Name = this.sku.tree[0].k
        if (this.sku.tree.length > 1) {
          listObj.s2Name = this.sku.tree[1].k
        }

        listObj.token = localStorage.getItem('token')

        this.sku.list.push({ ...listObj })
      });
      this.initialSku.s1 = this.skuInfo.skus[0].styleId
      this.initialSku.s2 = this.skuInfo.skus[0].sizeId
      console.log(this.sku.tree);
      console.log(this.sku.list);

    },
    toggleImg(skuData) {
      console.log(skuData);
      if (skuData.selectedSkuComb != null) {
        this.goods.picture = skuData.selectedSkuComb.img
      }
    },
    goShopCar(skuData) {

      this.show = !this.show;
      console.log(skuData);
      let data = skuData
      let i = 0
      let thisData = JSON.parse(localStorage.getItem('data'))
      if (thisData === null) {
        Toast('添加成功')
        this.dataArr.push(data)
        localStorage.setItem('data', JSON.stringify(this.dataArr))
        return;
      }
      if (thisData != null) {
        thisData.forEach((item, index) => {
          if (data.selectedSkuComb.s1 === item.selectedSkuComb.s1 && data.selectedSkuComb.s2 === item.selectedSkuComb.s2 && data.selectedSkuComb.shopName === item.selectedSkuComb.shopName) {
            i = index
          }
        })
        if (data.selectedSkuComb.s1 === thisData[i].selectedSkuComb.s1 && data.selectedSkuComb.s2 === thisData[i].selectedSkuComb.s2 && data.selectedSkuComb.shopName === thisData[i].selectedSkuComb.shopName) {
          Toast('添加成功')
          thisData[i].selectedNum += data.selectedNum;
          localStorage.setItem('data', JSON.stringify(thisData))
          return
        }
        Toast('添加成功')
        thisData.push(data)
        localStorage.setItem('data', JSON.stringify(thisData))
      }

    },
    goHome() {

      this.$router.back()
    },
    goShopCart() {
      this.$router.push({ name: "ShoppingCart" })
    }
  },
}
</script>

<style lang="scss" scoped>
.return {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  z-index: 999;
}

.van-popup {
  overflow-y: visible;
}

.specification-box {
  padding: 0 15px;
  height: 500px;

  .top-box {
    display: flex;
    // align-items: center;
    position: relative;

    .img-box {
      height: 120px;
      width: 90px;
      position: relative;
      top: -30px;
      z-index: 9999;
      box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, .1);
      margin-right: 10px;

      .auto-img {
        height: 100%;
      }
    }

    .detail-price-box {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .repertory {
      margin: 5px 0;
    }
  }
}



.big-box {
  margin-bottom: 50px;
}

.box {
  // background-color: #fff;

  .info-box {
    background-color: #fff;
  }
}

// 图片
.banner-box {
  // margin-bottom: 10px;
  background-color: #fff;

  .swriper {
    .img-box {
      width: 260px;
      margin: 0 auto;
    }
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  // font-size: 22px;
}

// 价格
.item-info {
  margin: 0 auto;
  border-top: 1px solid #eee;
  width: calc(100%);
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .price {
    display: flex;
    align-items: end;

    span {
      font-weight: bold;
      font-size: 24px;
      // color: #ff5577;
      line-height: 18px;
    }

    .discount {
      padding: 0 5px;
      background-color: #ffecef;
      font-weight: bold;
      color: #ff5577;
    }
  }

}

// 券
.ticket {
  display: flex;
  // justify-content: space-between;
  width: calc(100% - 20px);
  margin: 0 auto;
  padding: 10px;

  .ticket-box {

    display: flex;
    width: 100%;
    justify-content: space-between;

    .ticket-left {
      background-color: #f25463;
      color: #fff;
      padding: 2px 5px;
      border-radius: 5px;
    }

    .ticket-right {
      color: #f25463;

    }
  }
}

// 商品名称
.title-box {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-right: 0px;
  width: calc(100% - 10px);

  .title {
    font-size: 16px;
    color: #000;
  }

  .icon-title {
    width: 120px;
    background-color: #f8f8f8;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 15px 0 0 15px;
    color: #9c9da2;
  }
}

// 商品规格
.arguments-box {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;

  .select {
    display: flex;
    padding: 10px;
    // background-color: skyblue;
    justify-content: space-between;
    font-size: 14px;

    .select-left {
      color: #9c9da2;

    }

    .select-center {
      margin-left: 10px;
      text-align: left;
      flex: 1;
    }

    .select-right {
      color: #9c9da2;
    }
  }

}

// 评价
.appraise {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

// 店铺
.shop-box {
  display: flex;
  justify-content: space-between;
  align-items: start;
  background-color: #fff;
  padding: 10px;

  .text {
    flex: 1;
    margin-left: 10px;

    .name {
      color: #000;
      font-size: 14px;

    }

    .level {
      display: flex;
      margin: 5px 0;
      padding: 2px 0;

      >div {
        padding: 0 5px;

        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
    }

    .volume {
      display: flex;
      margin-top: 3px;

      >div {
        color: #fff;
        background-color: #ff5577;
        padding: 3px;
        border-radius: 10px;
        margin-right: 5px;
      }
    }
  }

  .img-box {
    width: 60px;
    height: 60px;
    overflow: hidden;

  }

}

// 图文详情
.detail-box {
  margin-top: 10px;
  background-color: #fff;

  .title {
    padding: 20px 10px;
    font-size: 16px;
  }
}
</style>