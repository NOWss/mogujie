<template>
  <div class="box">
    <video ref="videoElement"></video>
    <div class="btn" v-if="!play">
      <van-icon name="play-circle-o" size="72" color="#fff" @click="initFlvPlayer" />
    </div>
    <div class="actor-info">
      <div class="img-box">
        <img class="auto-img" :src="actorInfo.avatar">
      </div>
      <div class="text-box">
        <div class="name">{{ actorInfo.uname }}</div>
        <div class="hot">热度 <span>{{ onlineUserCount }}</span></div>
      </div>
      <div class="btn-box">
        <van-button class="v-btn" type="primary" size="small" color="#ff5577" round>关注</van-button>
      </div>
    </div>
    <div class="bottom-info">
      <div class="icon-box">
        <van-icon class="icon" name="point-gift" color="#e4393c" size="40" />
      </div>
      <div class="input-box">
        <input class="ipt" type="text" placeholder="说点什么...">
      </div>
    </div>
    <div class="bottom-icon">
      <div class="transmit">
        <van-icon class="icon" name="share-o" size="22" />
      </div>
      <div class="good">
        <van-icon class="icon" name="good-job-o" size="22" />
      </div>
    </div>
  </div>
</template>

<script>
import { goLive } from '../api/api'
import flvjs from "flv.js";
export default {
  name: "Live",
  data() {
    return {
      play: false,
      roomId: '',
      actorId: '',
      flvPlayer: null,
      liveUrl: '',
      actorInfo: '',
      onlineUserCount: ''
    }
  },
  created() {
    this.roomId = this.$route.params.roomId
    this.actorId = this.$route.params.actorId

    goLive(this.roomId, this.actorId).then(res => {
      console.log('直播间 ==>', res);
      // 直播间地址
      this.liveUrl = res.data.data.liveUrl;
      // 主播信息
      this.actorInfo = res.data.data.actorInfo;
      // 热度
      this.onlineUserCount = res.data.data.onlineUserCount;
    }).catch(err => {
      console.log('直播间 ==>', err);
    })
  },
  methods: {
    initFlvPlayer() {
      if (flvjs.isSupported()) {
        this.play = !this.play
        const videoElement = this.$refs.videoElement
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: this.liveUrl
        })
        this.flvPlayer.attachMediaElement(videoElement)
        this.flvPlayer.load()
        this.flvPlayer.play()
      }
    }
  },
  beforeDestroy() {
    if (this.flvPlayer) {
      this.flvPlayer.unload()
      this.flvPlayer.detachMediaElement()
      this.flvPlayer.destroy()
    }
  },

};
</script>
<style lang="scss" scoped>
.box {
  background-color: transparent;

  // position: relative;
  .return {
    position: absolute;
    left: 200px;
    top: 100px;
  }

  video {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    // background-image: url(../assets/logo.png);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .actor-info {
    display: flex;
    align-items: center;
    border-radius: 50px;
    // width: 170px;
    justify-content: space-between;
    padding: 8px;
    background-color: rgb(0, 0, 0, .5);
    color: #fff;
    position: absolute;
    left: 10px;
    top: 10px;
    >div{
      margin-right: 10px;
    }

    .text-box {
      .name {
        font-weight: bold;
        font-size: 14px;
      }
    }

    .img-box {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #fff;
      overflow: hidden;
    }

    .v-btn {
      width: 55px;
      height: 28px;
      font-size: 14px;
    }

  }

  .bottom-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 80px;

    >div {
      width: 35px;
      height: 35px;
      background-color: rgb(0, 0, 0, .3);
      border-radius: 50%;
      text-align: center;
      color: #fff;

      .icon {
        text-align: center;
        line-height: 35px;
      }
    }
  }


  .bottom-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 160px;

    .ipt {
      width: 90px;
      padding: 10px;
      height: 15px;
      font-size: 14px;
      background-color: rgb(0, 0, 0, .3);
      border-radius: 20px;
      border: none;
      color: #fff;
    }


    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #fff;
    }
  }

  .btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
</style>