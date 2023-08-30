"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("lib-flexible/flexible");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueLazyload["default"], {
  loading: require('./assets/f2f52ab95f230a30e27e46bfffb5419c.gif')
}); //注册, 将axios挂在到Vue构造函数的原型对象中, 这样可以在组件实例中直接使用 this.axios()


_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_vant.Button).use(_vant.Tabbar).use(_vant.TabbarItem).use(_vant.Tab).use(_vant.Tabs).use(_vant.Search).use(_vant.Icon).use(_vant.Sidebar).use(_vant.SidebarItem).use(_vant.List).use(_vant.PullRefresh).use(_vant.Cell).use(_vant.CellGroup).use(_vant.NavBar).use(_vant.Form).use(_vant.Field).use(_vant.Popup).use(_vant.Swipe).use(_vant.SwipeItem).use(_vant.GoodsAction).use(_vant.GoodsActionIcon).use(_vant.GoodsActionButton).use(_vant.Sku).use(_vant.Checkbox).use(_vant.CheckboxGroup).use(_vant.Stepper).use(_vant.Empty).use(_vant.SubmitBar).use(_vant.NoticeBar).use(_vant.AddressList).use(_vant.AddressEdit).use(_vant.Area).use(_vant.PasswordInput).use(_vant.NumberKeyboard);

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');