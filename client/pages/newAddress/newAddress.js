// pages/newAddress/newAddress.js
const {
  regeneratorRuntime
} = global
var app = getApp();
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
    id:'',
    concat: '',
    phone: '',
    province: '江苏省',
    city: '镇江市',
    district: '象山街道',
    detail: '',
    self:false
  },
  bindKeyInput: function(event) {
    var that = this;
    switch (event.target.id) {
      case 'concat':
        that.setData({
          concat: event.detail.value
        })
        break;
      case 'phone':
        that.setData({
          phone: event.detail.value
        })
        break;
      case 'province':
        that.setData({
          province: event.detail.value
        })
        break;
      case 'city':
        that.setData({
          city: event.detail.value
        })
        break;
      case 'district':
        that.setData({
          district: event.detail.value
        })
        break;
      case 'detail':
        that.setData({
          detail: event.detail.value
        })
        break;
    }
  },
  Addaddress: async function(event) {
    // TODO add new address
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    if (this.data.province && this.data.city && this.data.district && this.data.detail && this.data.concat && this.data.phone) {
      var address = {
        id:this.data.id,
        province: this.data.province,
        city: this.data.city,
        district: this.data.district,
        detail: this.data.detail,
        concat:this.data.concat,
        phone:this.data.phone,
        name:this.data.concat
      }
      var res = await $request({ url: config.url.updatead,method:'POST',data:address});
      console.log(res);
      wx.navigateBack({
        delta:1
      })
    }
    else{
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
    }
    wx.hideLoading();
  },
  selfaddress:function(){
    app.globalData.currentaddress.name = this.data.concat;
    app.globalData.currentaddress.phonenumber=this.data.phone;
    wx.navigateBack({
      delta:1
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.oldaddress) {
      var address = JSON.parse(options.oldaddress);
      console.log(address);
      this.setData({
        province: address.province,
        city: address.city,
        district: address.district,
        phone: address.phone,
        detail: address.detail,
        id:address.id,
        concat:address.name
      })
    }
    if(options.selfservice)
    {
      var selfdetail=JSON.parse(options.selfservice);
      this.setData({
        detail:selfdetail,
        self:true
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
  onShow: function(event) {},

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