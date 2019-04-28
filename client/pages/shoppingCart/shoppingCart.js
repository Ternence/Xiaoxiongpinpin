// pages/shoppingCart/shoppingCart.js
import {
  $login,
  $request,
  Session
} from '../../lib/page.auth'
import config from '../../config'

const {
  regeneratorRuntime
} = global
var API = require('../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    pre: [],
    now: [],
    price: 0,
    num: 0,
    checkcss: 'iconcheckall',
    height: '',
    close: true
  },
  // 跳转主界面
  LinktoCart: function(options) {
    wx.switchTab({
      url: '../home/home',
    })
  },
  // 结算商品
  purchase: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.navigateTo({
      url: '../readyToPay/readyToPay',
    });
    wx.hideLoading();
  },
  // 计算商品价格
  getTotalPrice: function() {
    var goods = this.data.goods;
    var total = 0;
    for (let i = 0; i < goods.length; i++) {
      total = total + goods[i].num * goods[i].price
    }
    total = total * 100;

    total = Math.round(total);
    total = total / 100;
    this.setData({
      price: total
    })
  },
  // 获取购物车
  getCart: async function() {
    var res = await $request({
      url: config.url.getcart
    });
    var cart = res.data;
    // console.log(cart[0].options[0].value);
    this.setData({
      goods: cart,
      num: cart.length | 0
    });
    this.setPreandNow();
    this.getTotalPrice();
  },
  addtocart: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var index = event.currentTarget.dataset.goodid;
    var type = event.currentTarget.dataset.type;
    if (type == 'now') {
      var now = this.data.now;
      var pre = this.data.pre;
      now[index].num = now[index].num + 1;
      var ans = [];
      for (let i = 0; i < now.length; i++) {
        if (now[i].num != 0)
          ans.push(now[i])
      }
      this.setData({
        now: ans
      });
      var good = ans.concat(pre);
      this.setData({
        goods: good
      })
    } else {
      var pre = this.data.pre;
      var now = this.data.now;
      pre[index].num = pre[index].num + 1;
      var ans = [];
      for (let i = 0; i < pre.length; i++) {
        if (pre[i].num != 0)
          ans.push(pre[i])
      }
      // console.log(ans);
      this.setData({
        pre: ans
      });
      var good = now.concat(pre);
      this.setData({
        goods: good
      })
      // console.log(good);
    }

    var res = await $request({
      url: config.url.updatecart,
      method: 'POST',
      data: {
        goods: this.data.goods
      }
    });
    this.getTotalPrice();
    wx.hideLoading();
  },
  removefromcart: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var index = event.currentTarget.dataset.goodid;
    var type = event.currentTarget.dataset.type;
    // console.log(type);
    if (type == 'now') {
      var now = this.data.now;
      var pre = this.data.pre;
      now[index].num = now[index].num - 1;
      var ans = [];
      for (let i = 0; i < now.length; i++) {
        if (now[i].num != 0)
          ans.push(now[i])
      }
      this.setData({
        now: ans
      });
      var good = ans.concat(pre);
      this.setData({
        goods: good
      })
    } else {
      var pre = this.data.pre;
      var now = this.data.now;
      pre[index].num = pre[index].num - 1;
      var ans = [];
      for (let i = 0; i < pre.length; i++) {
        if (pre[i].num != 0)
          ans.push(pre[i])
      }
      // console.log(ans);
      // console.log(now);
      this.setData({
        pre: ans
      });
      var good = now.concat(ans);
      // console.log(good);
      this.setData({
        goods: good
      })
      // console.log(good);
    }

    var res = await $request({
      url: config.url.updatecart,
      method: 'POST',
      data: {
        goods: this.data.goods
      }
    });
    this.getTotalPrice();
    wx.hideLoading();
  },
  checkclose: async function() {
    var res = await $request({
      url: config.url.getphone
    });
    this.setData({
      close: res.data.settings.isOpen
    })
  },
  setPreandNow: function() {
    var cart = this.data.goods;
    var pre = [];
    var now = [];
    pre = cart.filter(function(item) {
      return item.options.length != 0
    })
    now = cart.filter(function(item) {
      return item.options.length == 0
    });
    this.setData({
      pre: pre,
      now: now
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var height = wx.getSystemInfoSync().windowHeight;
    height = height * 750 / wx.getSystemInfoSync().windowWidth;
    this.setData({
      height: height - 100,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCart();
    this.checkclose();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})