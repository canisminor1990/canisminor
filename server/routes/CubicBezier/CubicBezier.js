/*!
 * CubicBezier v1.0.2 - 三次贝塞尔曲线求值
 * (c) 2014-2017 BaiJunjie
 * MIT Licensed.
 *
 * https://github.com/baijunjie/CubicBezier.js
 */
(function(root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.CubicBezier = factory();
  }
})(this, function() {
  /**
   * 创建一个三次贝塞尔对象
   * 每一个参数为一个表示点的数组[x,y]，或者一个Point对象
   * @param {Array|Point} c1    表示起始点的控制点
   * @param {Array|Point} c2    表示结束点的控制点
   * @param {Array|Point} begin 表示起始点，默认为[0,0]
   * @param {Array|Point} end   表示结束点，默认为[1,1]
   */
  function CubicBezier(c1, c2, begin, end) {
    this.set.apply(this, arguments);
  }

  CubicBezier.prototype = {
    _bezierFunc: function(p, t, targ) {
      return (
        this.begin[p] * Math.pow(1 - t, 3) +
        this.c1[p] * 3 * t * Math.pow(1 - t, 2) +
        this.c2[p] * 3 * (1 - t) * Math.pow(t, 2) +
        this.end[p] * Math.pow(t, 3) -
        targ
      );
    },

    _deltaBezierFunc: function(p, t, targ) {
      var dt = 1e-8;
      return (this._bezierFunc(p, t, targ) - this._bezierFunc(p, t - dt, targ)) / dt;
    },

    /**
     * 设置一个新的贝塞尔函数
     * 参数与构造函数相同
     */
    set: function(c1, c2, begin, end) {
      if (typeof c1 === 'string') {
        var args = getArg(c1);
        end = begin;
        begin = c2;
        c1 = [args[0], args[1]];
        c2 = [args[2], args[3]];
      }

      this.c1 = getPoint(c1);
      this.c2 = getPoint(c2);
      this.begin = getPoint(begin);
      this.end = end ? getPoint(end) : new Point(1, 1);
    },

    /**
     * 已知y，求x
     * @param  {number} y 参数表示一个在贝塞尔曲线上Y轴方向的向量，取值在 0.0 - 1.0 之间
     * @return            返回y在贝塞尔曲线上对应的x
     */
    getX: function(y) {
      var t = 0.5; // 设置t的初值
      for (var i = 0; i < 1000; i++) {
        t = t - this._bezierFunc('y', t, y) / this._deltaBezierFunc('y', t, y);
        if (this._bezierFunc('y', t, y) === 0) break;
      }
      return this._bezierFunc('x', t, 0);
    },

    /**
     * 已知x，求y
     * @param  {number} x 参数表示一个在贝塞尔曲线上X轴方向的向量，取值在 0.0 - 1.0 之间
     * @return            返回x在贝塞尔曲线上对应的y
     */
    getY: function(x) {
      var t = 0.5; // 设置t的初值
      for (var i = 0; i < 1000; i++) {
        t = t - this._bezierFunc('x', t, x) / this._deltaBezierFunc('x', t, x);
        if (this._bezierFunc('x', t, x) === 0) break;
      }
      return this._bezierFunc('y', t, 0);
    },

    /**
     * 根据时间获取曲线上对应的点
     * @param  {number} t 参数表示一个 0.0 - 1.0 的时间向量
     * @return            返回的结果是该时刻在贝塞尔曲线上的点
     */
    getPoint: function(t) {
      var p = new Point();
      p.x = this._bezierFunc('x', t, 0);
      p.y = this._bezierFunc('y', t, 0);
      return p;
    },
  };

  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  function isNumber(num) {
    var type = typeof num;
    return type === 'number' || (type === 'string' && !isNaN(num - parseFloat(num)));
  }

  /**
   * 获取一个Point点对象
   * @param  {Number|Array|Point|Object} x 数字、数组、对象或者Point对象
   * @param  {Number}                    y 数字
   * @return {Point}                       返回一个Point对象
   */
  function getPoint(x, y) {
    if (isNumber(x)) {
      return new Point(x, y);
    } else if (isArray(x)) {
      return new Point(x[0], x[1]);
    } else if (isObject(x)) {
      return new Point(x.x, x.y);
    } else if (x instanceof Point) {
      return x;
    } else {
      return new Point();
    }
  }

  /**
   * 获取字符串表达式中括号内的参数数组
   * 'cubic-bezier(0,0,1,1)' => [0,0,1,1]
   * @param  {String} str 贝塞尔函数字符串表达式
   * @return {Array}      返回包含贝塞尔函数的两个控制点组成的数据
   */
  function getArg(str) {
    var s = str.match(/\(.*\)$/);
    if (s) {
      var args = s[0].slice(1, -1).split(',');
      for (var i = 0, l = args.length; i < l; i++) {
        var arg = parseFloat(args[i]);
        args[i] = isNaN(arg) ? undefined : arg;
      }
      return args;
    }
    return null;
  }

  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  CubicBezier.Point = Point;

  return CubicBezier;
});
