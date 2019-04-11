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
    time: '下单后半小时内',
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
        user: address.name,
        phonenumber: address.phone
      })
    } else {
      this.setData({
        address: ad,
        user: address.name,
      })
    }

  },
  pay: async function() {
    var str = '请选择收获地址';
    if (this.data.address.trim() != str.trim()) {
      // TODO 添加订单
      var address = app.globalData.currentaddress;
      var items = this.data.cart;
      items = items.map(value => ({
        id: value.id,
        name: value.name,
        amount: value.num,
        price: value.price,
        options: [],
        previewPic:value.previewPic
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
            status: '未支付',
            items: items
          }
        }
      });
      
      if (res.code == 20000) {
        let respre =await  $request({ url: config.url.wxpreorder, method: 'POST', data: { orderid:res.data.order._id,fee:this.data.price*100}});
        if(respre.status==100)
        {
          wx.requestPayment({
           'timeStamp': respre.timestamp,
            'nonceStr': respre.nonceStr,
            'package': respre.package,
            'signType': 'MD5',
            'paySign': respre.paySign,
            'success':async function (res) {
              var res = await $request({
                url: config.url.clearcart
              });
                wx.navigateTo({
                  url: '../home/home',
                })
              },
            'fail': async function (res) {
              if (res.errMsg =='requestPayment:fail cancel')
                wx.showToast({
                  title: '支付取消',
                  icon:'none'
                })
              else
              {
                wx.showToast({
                  title: '支付失败',
                  icon:'fail'
                })
                // var chekcres = await $request({ url: config.url.checkorder})
              }                
            }
          })
        }
        else
        {
          wx.showToast({
            title: '系统繁忙,稍后再试',
            icon:'fail'
          })
        }
        var checkorderres = await $request({ url: config.url.checkorder, data: { out_trade_no: res.data.order._id}});

      }



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