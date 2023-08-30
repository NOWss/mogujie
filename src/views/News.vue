<template>
  <div class="box">
    <van-tabs v-model="active" animated line-width="100" @click="toggle(tabHeader[active].id)">
      <van-tab v-for="(item, index) in tabHeader" :title="item.name" :key="index">
        <div class="item-list">
          <div class="item" v-for="(item, index) in tabList" :key="index" @click="LiveGo(item.roomId, item.actUserId)">
            <div class="header-box">
              <div class="img-box">
                <img v-lazy="item.avatar" class="auto-img">
              </div>
              <div class="text-box">
                {{ item.userName }}
              </div>
            </div>
            <div class="banner-box">
              <div class="img-box">
                <img v-lazy="item.bgImg" class="auto-img">
              </div>
              <div class="banner-content">
                <div class="zb-box">
                  <div class="circle"></div>
                  <div class="text">直播中</div>
                  <div class="count">
                    <van-icon name="fire-o" />
                    <span> {{ item.visitorCount > 10000 ? (item.visitorCount / 10000).toFixed(1) + 'W' : item.visitorCount
                    }}</span>
                  </div>
                </div>

              </div>
              <div class="title"><span>{{ item.intro }}</span></div>
            </div>
          </div>

        </div>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getTabHeader, getLiveList } from '@/api/api';

export default {
  name: "News",
  data() {
    return {
      active: 0,
      tabHeader: [],
      tabList: [],
    }
  },
  created() {
    getTabHeader().then(res => {
      console.log('直播分类res ==>', res);
      this.tabHeader = res.data.data.tabs.items
      // console.log(this.tabHeader[this.active].id);
      this.getLive(this.tabHeader[this.active].id)

    }).catch(err => {
      console.log('直播分类err ==>', err);
    })
  },
  methods: {
    getLive(tabId) {
      getLiveList(tabId).then(res => {
        console.log('直播列表res ==>', res);
        this.tabList = res.data.data.lives
        // console.log('直播列表this.tabList ==>', this.tabList)

      }).catch(err => {
        console.log('直播列表err ==>', err);
      })
    },
    toggle(tabId) {
      getLiveList(tabId).then(res => {
        console.log('直播列表res ==>', res);
        this.tabList = res.data.data.lives;
      }).catch(err => {
        console.log('直播列表err ==>', err);
      })
    },
    LiveGo(roomId, actorId) {
      console.log(roomId, actorId);
      this.$router.push({ name: "Live", params: { roomId, actorId } })
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes circle {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.title {
  font-size: 18px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .35);
  overflow: hidden;
  display: inline-block; //设置行内块属性
  white-space: nowrap; //强制不换行
  width: calc(100% - 20px); //固定盒子的宽度
  overflow: hidden; //超出部分隐藏
  text-overflow: ellipsis; //显示
  position: absolute;
  bottom: 12px;
  left: 10px;
}

.banner-content {
  position: absolute;
  bottom: 35px;
  left: 0;

  >div {
    margin-bottom: 10px;
    margin-left: 10px;
  }




  .zb-box {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    // max-width: 140px;
    padding: 5px;
    background-color: rgb(0, 0, 0, .5);
    color: #fff;

    div {
      margin-left: 5px;
    }

    .circle {
      width: 10px;
      height: 10px;
      background-color: #e4393c;
      border-radius: 50%;
      animation: circle 1s linear infinite alternate;
    }

    .text {
      border-right: 1px solid #fff;
      padding-right: 5px;
      font-size: 12px;
    }

    .count {
      font-size: 14px;
    }
  }
}



.box {
  background-color: #fff;
}

.item-list {
  margin-bottom: 50px;
  background-color: #fff;
}

.item {
  padding: 10px;


  .header-box {
    position: absolute;
    display: flex;
    z-index: 1;


    .img-box {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid #fff;
      margin-left: 10px;
      margin-right: 10px;
    }

    .text-box {
      line-height: 30px;
      width: 140px;
      font-size: 14px;
      color: #000;
    }
  }

  .banner-box {
    margin-top: 26px;
    position: relative;

    .img-box {
      width: 100%;
      height: 195px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;
    }
  }
}
</style>