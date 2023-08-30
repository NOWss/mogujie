"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mydebounce = void 0;

var mydebounce = function mydebounce(func, wait) {
  // thisArg变量用于保存this值
  var thisArg = null; // args变量用于保存arguments实参列表的值

  var args = null; // 延时器标识符

  var timeout = null; // 返回一个新的函数

  return function () {
    // 保存此时的this
    thisArg = this; // 保存此时的arguments

    args = arguments; // 清除之前的延时器

    clearTimeout(timeout); // 开启延时器

    timeout = setTimeout(function () {
      // 调用func函数,并且改变函数内部this指向
      func.apply(thisArg, args);
    }, wait);
  };
};

exports.mydebounce = mydebounce;