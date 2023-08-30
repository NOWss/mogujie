"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: '/',
  name: 'Main',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Main.vue'));
    });
  },
  children: [{
    path: 'home',
    //path别名
    alias: '',
    name: 'Home',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home.vue'));
      });
    }
  }, {
    path: 'attention',
    name: 'Attention',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Attention.vue'));
      });
    }
  }, {
    path: 'news',
    name: 'News',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/News.vue'));
      });
    }
  }, {
    path: 'my',
    name: 'My',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/My.vue'));
      });
    }
  }]
}, {
  path: '/videoplayer/:itemId/:actorId',
  name: 'VideoPlayer',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/VideoPlayer.vue'));
    });
  }
}, {
  path: '/classification',
  name: 'ClassiFication',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/ClassiFication.vue'));
    });
  }
}, {
  path: '/live/:roomId/:actorId',
  name: 'Live',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Live.vue'));
    });
  }
}, {
  path: '/login',
  name: 'Login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Login.vue'));
    });
  }
}, {
  path: '/detail/:itemId',
  name: 'Detail',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Detail.vue'));
    });
  }
}, {
  path: '/search/:q',
  name: 'Search',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Search.vue'));
    });
  }
}, {
  path: '/shoppingcart',
  name: 'ShoppingCart',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/ShoppingCart.vue'));
    });
  }
}, {
  path: '/pay',
  name: 'Pay',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Pay.vue'));
    });
  }
}, {
  path: '/order',
  name: 'Order',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Order.vue'));
    });
  }
}, {
  path: '/orderall',
  name: 'OrderAll',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/OrderAll.vue'));
    });
  }
}];
exports.routes = routes;