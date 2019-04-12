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
    price: 0,
    order: {},
    cart:[],
    ifName:false,
    reason:'',
    flag:true,
    commentflag:true,
    commenttoast:false,
    comment:'',
    currentgid:''
  },
  // 显示退款对话框
  refund: function () {
    this.setData({
      ifName: true
    })
  },
  // 绑定退款理由
  setValue: function (event) {
    this.setData({
      reason: event.detail
    })
  },
  // 关闭退款对话框
  cancel: function () {
    this.setData({
      ifName: false
    })
  },
  // 提交退款申请
  confirm: async function () {
    if (this.data.reason != '') {
      var order = this.data.order;
      var items = order.items;
      items = items.map(value => ({
        amount: value.num,
        id: value.id,
        name: value.name,
        options: [],
        price: value.price
      }));
      order.items = items;
      order.status = '申请退款中';
      order.note = this.data.reason.value;
      var res = await $request({ url: config.url.editorder, data: { order: order }, method: 'POST' })
      console.log(res)
      if (res.code == 20000) {
        wx.navigateBack({
          delta: 1
        })
      }
      else {
        wx.showToast({
          title: '更新异常',
          icon: 'none'
        })
      }
    }
    else {
      wx.showToast({
        title: '理由不能为空',
        icon: 'none'
      })
    }
  },
  // 打开评价对话框
  opencomment:function(event){
    this.setData({
      commenttoast:true,
      currentgid: event.target.dataset.gid
    })
  },
  // 关闭评价对话框
  cancelcomment:function(){
    this.setData({
      commenttoast:false
    })
  },
  // 绑定评价
  setComment:function(event){
    this.setData({
      comment:event.detail.value
    })
  },
  // 提交评价
  confirmcomment:async function(){
    if(this.data.comment!='')
    {
      var res = await $request({ url: config.url.addcomment, method: 'POST', data: { id: this.data.currentgid, content: this.data.comment } });
      if(res.code==20000)
      {
        wx.showToast({
          title: '评价成功',
          icon:'success'
        });
        this.cancelcomment()
      }
      else
      {
        wx.showToast({
          title: '评价失败',
          icon:'fail'
        })
      }
    }
    else
    {
      wx.showToast({
        title: '输入不能为空',
        icon:'none'
      })
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = JSON.parse(options.order);
    var cart=order.items;
    cart=cart.map(value=>({
      num:value.amount,
      id:value.id,
      name:value.name,
      options:value.options,
      price:value.price,
      total:value.amount*value.price,
      previewPic: value.previewPic
    }))
    console.log(cart);
    order.items=cart;
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].total
    }
    this.setData({
      order: order,
      price: total,
      cart:cart,
    })
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
    if (this.data.order.status == '申请退款中' || this.data.order.status == '已退款') {
      this.setData({
        flag: true
      })
    }
    else
    {
      this.setData({
        flag:false
      })
    }

    if(this.data.order.status=='已送达')
    {
      this.setData({
        commentflag:false
      })
    }
    else
    {
      this.setData({
        commentflag:true
      })
    }
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