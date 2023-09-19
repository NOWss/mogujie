import axios from 'axios'
import { method } from 'lodash'
import { Toast } from 'vant'
// let appkey = 'mogujie'
axios.defaults.baseURL = 'https://apic.netstart.cn/mogujie'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    Toast({
      type: 'loading',
      message: '加载中...',
      duration: 0,
      forbidClick: true
    })
    return config
  },
  function (err) {
    Toast.clear()
    return Promise.reject(err)
  }
)

//拦截响应器
axios.interceptors.response.use(
  function (res) {
    Toast.clear()
    return res
  },
  function (err) {
    Toast.clear()
    return Promise.reject(err)
  }
)
// 获取分类列表
export const getType = function () {
  return axios({
    method: 'get',
    url: 'homeNav.json'
  })
}
// 获取商品
export const getHomeData = function (page) {
  return axios({
    method: 'get',
    url: 'video/item',
    params: {
      page
    }
  })
}

// 获取直播数据
export const getLiveData = function (itemId, actorId) {
  return axios({
    method: 'get',
    url: 'video/detail',
    params: {
      itemId,
      actorId
    }
  })
}

// 获取商品分类一级数据
export const getCategoryData = function () {
  return axios({
    method: 'get',
    url: 'category.json'
  })
}

// 获取商品分类上面的二级数据
export const getCategoryChildDataTop = function (pid) {
  return axios({
    method: 'get',
    url: 'category/getSub',
    params: {
      pid
    }
  })
}

// 获取商品分类下面的二级数据
export const getCategoryChildDataBottom = function (fcid, page, sort) {
  return axios({
    method: 'get',
    url: 'category/miniWall',
    params: {
      fcid,
      page,
      sort
    }
  })
}

// 直播分类
export const getTabHeader = function () {
  return axios({
    method: 'get',
    url: 'live/tabHeader'
  })
}

// 直播列表
export const getLiveList = function (tabId) {
  return axios({
    method: 'get',
    url: 'live/tabList',
    params: {
      tabId
    }
  })
}

// 直播间
export const goLive = function (roomId, actorId) {
  return axios({
    method: 'get',
    url: 'live/actorLiveInfo',
    params: {
      roomId,
      actorId
    }
  })
}

// 商城商品
export const storeShop = function (page) {
  return axios({
    method: 'get',
    url: 'goods/personalized',
    params: {
      page
    }
  })
}

// 商品详情
export const getDetail = function (itemId) {
  return axios({
    method: 'get',
    url: 'goods/detail',
    params: {
      itemId
    }
  })
}

// 搜索
export const search = function (q, sort) {
  return axios({
    method: 'get',
    url: 'search/searchByKeyword',
    params: {
      q,
      sort
    }
  })
}
