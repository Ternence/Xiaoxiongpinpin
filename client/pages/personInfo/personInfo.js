// pages/personInfo/personInfo.js
var API = require('../../utils/api.js')
var app = getApp();
import { $init, $digest } from '../../lib/page.data'
import { $login, $request, Session } from '../../lib/page.auth'
import config from '../../config'

const { regeneratorRuntime } = global
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    imagesrc:'',
  },

  // 跳转订单页面
  LinktoOrder:function(index){
    var id = index.currentTarget.id;
    wx.navigateTo({
      url: '../orderList/orderList?show='+id,
    })
  },
  // 获取用户ID和头像
  getUserInfo:function(){
    const session = Session.get()

    if (session) {
      this.setData({
        username: app.globalData.userInfo.nickName,
        imagesrc: app.globalData.userInfo.avatarUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})