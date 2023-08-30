<template>
  <div class="box" v-if="isShow">
    <video class="auto-video" :src="LiveData.videoInfo.url" controls autoplay></video>
    <div class="photo-box">
      <div class="photo">
        <img class="auto-img" :src="LiveData.actorInfo.avatar">
      </div>
      <div class="collect item">
        <van-icon name="star" />
        <div class="item-text">{{ LiveData.itemType }}</div>
      </div>
      <div class="comment item">
        <van-icon name="chat" />
        <div class="item-text">{{ LiveData.commentCount }}</div>
      </div>
      <div class="shopCar item">
        <van-icon name="shopping-cart" />
        <div class="item-text">购物车</div>
      </div>
    </div>
    <div class="anchor-box">
      <div class="anchor-name">{{ LiveData.actorInfo.name }}</div>
      <div class="anchor-fans">{{ LiveData.actorInfo.fansCount }}</div>
    </div>
    <div class="bottom-box" @click="goDetail(LiveData.itemInfo.itemId)">
      <div class="img-box">
        <img class="auto-img" :src="LiveData.itemInfo.cover">
      </div>
      <div class="text-box">
        <div class="title">{{ LiveData.itemInfo.title }}</div>
        <div class="price"><span class="dms">待秒杀</span> ￥{{ LiveData.itemInfo.discountPrice }}</div>
      </div>
      <div class="btn-box">
        <van-button type="primary" round color="#ff4466">立即购买</van-button>
      </div>
    </div>
    <div class="comment-box">

    </div>
  </div>
</template>

<script>
import { getLiveData } from '../api/api';
export default {
  name: 'VideoPlayer',
  data() {
    return {
      itemUrl: '',
      actorUrl: '',
      LiveData: [],
      isShow: false
    }
  },
  created() {
    // console.log(this.$route.params);
    this.itemUrl = this.$route.params.itemId;
    this.actorUrl = this.$route.params.actorId;

    // console.log(this.itemUrl, this.actorUrl);

    getLiveData(this.itemUrl, this.actorUrl).then(res => {
      console.log(res);
      this.isShow = true;
      this.LiveData = { ...res.data.data.itemExplainList[0] };
      console.log('LiveData =>', this.LiveData);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    goDetail(itemId) {
      this.$router.push({ name: 'Detail', params: { itemId } })
    }

  }

}
</script>

<style lang="scss" scoped>
.box {
  // width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: #000;

  .anchor-box {
    position: absolute;
    left: 10px;
    bottom: 160px;

    .anchor-name {
      color: #fff;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .anchor-fans {
      color: #cdccc8;
      font-size: 12px;
    }
  }

  .bottom-box {
    position: absolute;
    bottom: 70px;
    left: 10px;
    width: calc(100% - 20px);
    height: 85px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .img-box {
      width: 70px;
      overflow: hidden;
      height: 70px;
    }

    .btn-box {
      margin-left: 20px;
    }

    .text-box {
      padding: 5px;
      // flex: 1;



      .title {
        color: #fff;
        font-size: 14px;
        height: 30px;
        margin-bottom: 5px;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .price {
        font-size: 14px;
        color: #ff4466;
        font-weight: bold;

        .dms {
          font-weight: normal;
          display: inline-block;
          font-size: 12px;
          background-color: #fb4e3d;
          color: #fff;
        }
      }
    }
  }

  .auto-video {
    width: 100%;
    height: 100%;
    vertical-align: top;
    overflow-y: hidden;
    // z-index: -1;

  }

  .photo-box {
    position: absolute;
    right: 10px;
    bottom: 180px;
  }

  .photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #fff;
  }

  .item {
    width: 40px;
    height: 40px;
    font-size: 36px;
    text-align: center;
    color: #fff;
    margin-top: 30px;

    .item-text {
      margin-top: 5px;
      font-size: 12px;

    }
  }

}
</style>