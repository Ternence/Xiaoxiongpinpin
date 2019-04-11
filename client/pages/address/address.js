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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // city: '',
    // inputShowed: false,
    // inputVal: "",
    // autocomplete:[]
    address: []
  },




  linktoNewAddress: function (event) {
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },
  chosecurrent: function (event) {
    app.globalData.currentaddress = event.detail;
    wx.navigateBack({});
  },
  editcurrent: function (event) {
    wx.navigateTo({
      url: '../newAddress/newAddress?oldaddress=' + JSON.stringify(event.detail),
    })
  },
  getUserAddress: async function (event) {
    const res = await $request({ url: config.url.address });
    // console.log(res);
    this.setData({
      address:res.data.address||[]
    });
    // console.log(this.data.address);
    
  },
  //定位
  // locate: function(options) {
  //   var page = this
  //   wx.getLocation({
  //     success: function(res) {
  //       var longitude = res.longitude;
  //       var latitude = res.latitude;
  //       console.log(longitude + " " + latitude);
  //       page.locateCity(longitude, latitude);
  //     },
  //   })
  // },
  // locateCity: function(longitude, latitude) {
  //   var page = this
  //   wx.request({
  //     url: 'http://api.map.baidu.com/geocoder/v2/?ak=XgstCc1ij4BvvkbYHUQrGYGHtkWe3ujV&location=' + latitude + ',' + longitude + '&output=json&pois=1',
  //     data: {},
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function(res) {
  //       // success  
  //       console.log(res.data.result);
  //       var city = res.data.result.addressComponent.city;

  //       console.log("城市为" + city)
  //       page.setData({
  //         city: city
  //       });
  //     },
  //     fail: function() {
  //       // fail  
  //     },
  //     complete: function() {
  //       // complete  
  //     }
  //   })
  // },
  // searchAddress:function(options){

  // },

  // // 获取用户收货地址
  // getAddress:function(options){

  // },

  // // 新增收货地址
  // addAddress:function(options){

  // },
  // showInput: function () {
  //   this.setData({
  //     inputShowed: true
  //   });
  // },
  // hideInput: function () {
  //   this.setData({
  //     inputVal: "",
  //     inputShowed: false
  //   });
  // },
  // clearInput: function () {
  //   this.setData({
  //     inputVal: ""
  //   });
  // },
  // inputTyping: function (e) {
  //   var that = this;
  //   // 新建百度地图对象 
  //   var BMap = new bmap.BMapWX({
  //     ak: 'XgstCc1ij4BvvkbYHUQrGYGHtkWe3ujV'
  //   });
  //   var fail = function (data) {
  //     console.log(data)
  //   };
  //   var success = function (data) {
  //     var sugData = [];
  //     for (var i = 0; i < data.result.length; i++) {
  //       sugData.push(data.result[i].name);
  //     }
  //     that.setData({
  //       autocomplete: sugData
  //     });
  //     console.log(that.data.autocomplete)
  //   }
  //   // 发起suggestion检索请求 
  //   BMap.suggestion({
  //     query: e.detail.value,
  //     region: '镇江',
  //     city_limit: true,
  //     fail: fail,
  //     success: success
  //   }); 
  //   this.setData({
  //     inputVal: e.detail.value
  //   });
  // },



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