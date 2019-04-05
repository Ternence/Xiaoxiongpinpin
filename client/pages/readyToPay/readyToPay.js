// pages/readyToPay/readyToPay.js
var app = getApp();
import {
  $login,
  $request,
  Session
} from '../../lib/page.auth'
import config from '../../config'

const {
  regeneratorRuntime
} = global
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'请选择收获地址',
    price: '',
    user: '',
    phonenumber: '',
    time: '20:53',
    cart: [],
  },

  choseaddress: function() {
    wx.navigateTo({
      url: '../address/address',
    });
    // var district=address.district;
    // var detail=address.detail;
    // console.log(district+detail);
  },
  setaddress: function() {
    var address = app.globalData.currentaddress;
    var ad = address.district + " " + address.detail;
    if (address.detail != "") {
      this.setData({
        address: ad,
        user: app.globalData.userInfo.nickName,
        phonenumber: address.phone
      })
    } else {
      this.setData({
        address: ad,
        user: app.globalData.userInfo.nickName,
      })
    }

  },
  pay: async function() {
    var str = '请选择收获地址';
    if (this.data.address.trim() != str.trim()) {
      // TODO 调用微信支付接口

      // TODO 添加订单
      var address = app.globalData.currentaddress;
      var items = this.data.cart;
      items = items.map(value => ({
        id: value.id,
        name: value.name,
        amount: value.num,
        price: value.price,
        options: []
      }));
      var res = await $request({
        url: config.url.addorder,
        method: 'POST',
        data: {
          order: {
            name: this.data.user,
            province: address.province,
            city: address.city,
            district: address.district,
            detail: address.detail,
            phone: address.phone,
            status: '已下单',
            items: items
          }
        }
      });
      if (res.code == 20000) {
        wx.showToast({
          title: '',
          icon: 'success',
          success: function() {
            wx.switchTab({
              url: '../home/home',
            })
          }
        });
      }
      // TODO 清除购物车
      var res = await $request({
        url: config.url.clearcart
      });
    }
    else
    {
      wx.showToast({
        title: '您还没有选择收获地址',
        icon:'none',
        mask:true
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cart = JSON.parse(options.cart);

    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].total
    }
    this.setData({
      cart: cart,
      price: total
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
    this.setaddress();
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