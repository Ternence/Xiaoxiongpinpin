// pages/address/address.js
var app = getApp();
var bmap = require('../../lib/bmap-wx.js');
const {
  regeneratorRuntime
} = global
import {
  $login,
  $request,
  Session
} from '../../lib/page.auth';
import config from '../../config';
import {
  showModalPromisified
} from '../../utils/async.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // city: '',
    // inputShowed: false,
    // inputVal: "",
    // autocomplete:[]
    address: [],
    selfserviceaddress:''
  },




  linktoNewAddress: function(event) {
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },
  chosecurrent: function(event) {
    app.globalData.currentaddress = event.detail;
    app.globalData.isSelfPickUp = false;
    wx.navigateBack({});
  },
  choseselfpick:function(){
    app.globalData.currentaddress.district = '自提';
    app.globalData.currentaddress.detail = this.data.selfserviceaddress;
    app.globalData.isSelfPickUp = true;
    wx.navigateBack({});
  },
  editcurrent: function(event) {
    wx.navigateTo({
      url: '../newAddress/newAddress?oldaddress=' + JSON.stringify(event.detail),
    })
  },
  deletecurrent: async function(event) {
    var that = this;
    showModalPromisified({
      title: '请确认',
      content: '确认删除该地址？'
    }).then(function(res) {
      if (res.confirm) {
        that.dodelte(that.data.address[event.currentTarget.dataset.aid]._id).then(function(){
          that.getUserAddress();
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }).then(function(res) {
      console.log(res);
      // that.getUserAddress();
    }).catch(function(res) {
      console.log(res);
    })
  },
  dodelte: async function(id) {
    var response = await $request({
      url: config.url.deleteaddress,
      method: 'POST',
      data: {
        addressid: id
      }
    });
  },

  getUserAddress: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const res = await $request({
      url: config.url.address
    });
    // console.log(res);
    this.setData({
      address: res.data.address || []
    });
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      selfserviceaddress:app.globalData.selfserviceaddress
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
    this.getUserAddress();
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