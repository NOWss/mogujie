"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.getDetail = exports.storeShop = exports.goLive = exports.getLiveList = exports.getTabHeader = exports.getCategoryChildDataBottom = exports.getCategoryChildDataTop = exports.getCategoryData = exports.getLiveData = exports.getHomeData = exports.getType = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _lodash = require("lodash");

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = 'https://apis.netstart.cn/mogujie'; // 请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  (0, _vant.Toast)({
    type: 'loading',
    message: '加载中...',
    duration: 0,
    forbidClick: true
  });
  return config;
}, function (err) {
  _vant.Toast.clear();

  return Promise.reject(err);
}); //拦截响应器


_axios["default"].interceptors.response.use(function (res) {
  _vant.Toast.clear();

  return res;
}, function (err) {
  _vant.Toast.clear();

  return Promise.reject(err);
}); // 获取分类列表


var getType = function getType() {
  return (0, _axios["default"])({
    method: 'get',
    url: 'homeNav.json'
  });
}; // 获取商品


exports.getType = getType;

var getHomeData = function getHomeData(page) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'video/item',
    params: {
      page: page
    }
  });
}; // 获取直播数据


exports.getHomeData = getHomeData;

var getLiveData = function getLiveData(itemId, actorId) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'video/detail',
    params: {
      itemId: itemId,
      actorId: actorId
    }
  });
}; // 获取商品分类一级数据


exports.getLiveData = getLiveData;

var getCategoryData = function getCategoryData() {
  return (0, _axios["default"])({
    method: 'get',
    url: 'category.json'
  });
}; // 获取商品分类上面的二级数据


exports.getCategoryData = getCategoryData;

var getCategoryChildDataTop = function getCategoryChildDataTop(pid) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'category/getSub',
    params: {
      pid: pid
    }
  });
}; // 获取商品分类下面的二级数据


exports.getCategoryChildDataTop = getCategoryChildDataTop;

var getCategoryChildDataBottom = function getCategoryChildDataBottom(fcid, page, sort) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'category/miniWall',
    params: {
      fcid: fcid,
      page: page,
      sort: sort
    }
  });
}; // 直播分类


exports.getCategoryChildDataBottom = getCategoryChildDataBottom;

var getTabHeader = function getTabHeader() {
  return (0, _axios["default"])({
    method: 'get',
    url: 'live/tabHeader'
  });
}; // 直播列表


exports.getTabHeader = getTabHeader;

var getLiveList = function getLiveList(tabId) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'live/tabList',
    params: {
      tabId: tabId
    }
  });
}; // 直播间


exports.getLiveList = getLiveList;

var goLive = function goLive(roomId, actorId) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'live/actorLiveInfo',
    params: {
      roomId: roomId,
      actorId: actorId
    }
  });
}; // 商城商品


exports.goLive = goLive;

var storeShop = function storeShop(page) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'goods/personalized',
    params: {
      page: page
    }
  });
}; // 商品详情


exports.storeShop = storeShop;

var getDetail = function getDetail(itemId) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'goods/detail',
    params: {
      itemId: itemId
    }
  });
}; // 搜索


exports.getDetail = getDetail;

var search = function search(q, sort) {
  return (0, _axios["default"])({
    method: 'get',
    url: 'search/searchByKeyword',
    params: {
      q: q,
      sort: sort
    }
  });
};

exports.search = search;