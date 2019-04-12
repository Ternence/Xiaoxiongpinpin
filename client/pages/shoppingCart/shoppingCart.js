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
    price: 0,
    num: 0,
    checkcss: 'iconcheckall'
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
    var goods = this.data.goods;
    if (goods.length != 0) {
      goods = goods.map(value => ({
        id: value.id,
        num: value.num,
        name: value.name,
        price: value.price,
        total: value.num * value.price,
        previewPic: value.previewPic
      }))
      wx.navigateTo({
        url: '../readyToPay/readyToPay?cart=' + JSON.stringify(goods),
      });
    }

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
    this.setData({
      goods: res.data,
      num: res.data.length | 0
    })
    this.getTotalPrice();
  },
  addtocart: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var index = event.currentTarget.dataset.goodid;
    var goods = this.data.goods;
    goods[index].num = goods[index].num + 1;
    this.setData({
      goods: goods
    })
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
    var goods = this.data.goods;
    goods[index].num = goods[index].num - 1;
    var ans = [];
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].num != 0)
        ans.push(goods[i])
    }
    this.setData({
      goods: ans
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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