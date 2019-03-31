// pages/home/home.js
var API = require('../../utils/api.js')
var app = getApp();
import { $init, $digest } from '../../lib/page.data'
import { $login, $request, Session } from '../../lib/page.auth'
import config from '../../config'

const { regeneratorRuntime } = global

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textclass: 'catagory',
    goods: [],
    catagory: [],
    clicknumber: 0,
    options: [],
    selected: [],
    groundhidden: true,
    price: 12,
    selectname: 'Test',
    index: 0,
    hidden: false,
    islogin: getApp().globalData.islogin
  },

  //获取商品类别
  getCatagorys: function(options) {
    var that = this;
    API.ajax('/catagory', function(res) {
      that.setData({
        catagory: res.catagorys
      })
    });
  },
  //获取商品
  getGoods: function(options) {
    var that = this;
    API.ajax('/fruit', function(res) {
      that.setData({
        goods: res.goods
      })
    });
  },
  // 动态样式
  Click: function(event) {
    this.setData({
      clicknumber: event.currentTarget.dataset.gid
    })
    this.getGoods();

  },
  // 跳转搜索
  linkToSearch: function(options) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //跳转地址定位
  linkToAddress: function(options) {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  // 跳转商品详情页
  linkToDetail: function(event) {
    var index = event.currentTarget.dataset.goodid;
    var goods = this.data.goods[index];
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goods=' + JSON.stringify(goods),
    })
  },
  // 展开选项卡
  openOption: function() {
    this.setData({
      groundhidden: false,
    })
    this.getOptions();
  },
  // 获取选项
  getOptions: function() {
    var that = this;
    API.ajax('/option', function(res) {
      that.setData({
        options: res.options
      })
    });
    var temp = [];
    var options = this.data.options;
    var len = options.length;
    for (let i = 0; i < len; i++) {
      temp[i] = {
        title: options[i].options[0].name
      };
    }
    this.setData({
      selected: temp
    })
  },
  // 设置已选项
  setSelect: function(event) {
    var index = event.currentTarget.dataset.op;
    var selectindex = event.detail.selectindex;
    var param = {};
    // console.log(index)
    // console.log(this.data.options[index].options[selectindex])
    var string = "selected[" + index + "].title";
    param[string] = this.data.options[index].options[selectindex].name;
    this.setData(param);
    param = {};
    var string = "options[" + index + "].selectindex";
    param[string] = selectindex;
    this.setData(param);
    console.log(this.data.options)
  },
  // 准备添加
  readyforadd: function(event) {
    this.openOption()
    var index = event.currentTarget.dataset.goodid;
    this.setData({
      index: index
    })
  },
  // 隐藏选项卡
  cancelOption: function() {
    this.setData({
      groundhidden: true,
    })
  },
  // 提交购物车
  addtoCart: function(event) {
    var num = this.data.goods[this.data.index].number;
    var param = {};
    num = num + 1;
    var string = "goods[" + this.data.index + "].number";
    param[string] = num;
    this.setData(param);
    this.cancelOption();
    // TODO 更新购物车
  },
  //  
  removefromCart: function(event) {
    var index = event.currentTarget.dataset.goodid;
    var num = this.data.goods[index].number;
    var param = {};
    num = num - 1;
    var string = "goods[" + index + "].number";
    param[string] = num;
    this.setData(param);
    // TODO 更新购物车
  },
  cancel: function() {
    this.setData({
      hidden: true
    });
  },
  confirm: function() {
    this.setData({
      hidden: true
    });
  },
  async bindGetUserInfo(e){
    
    if (app.globalData.islogin == true) {
      return;
    }
    try {
      const userInfo=await $login();
      app.globalData.islogin = true;
      app.globalData.userInfo=userInfo;
      this.setData({
        islogin: app.globalData.islogin
      })
    } catch (err) {
      console.log("+++1+++ error:", err)
    }
  }

  ,



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCatagorys();
    this.getGoods();
    const session = Session.get()
    if (session) {
      app.globalData.islogin = true;
      app.globalData.userInfo = session.userInfo;
      this.setData({
        islogin: app.globalData.islogin
      })
    }
    else
    {
      app.globalData.islogin=false;
      this.setData({
        islogin: app.globalData.islogin
      })
    }
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

  },
})