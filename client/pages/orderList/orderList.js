// pages/orderList/orderList.js

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
    title: ['全部', '已支付', '配送中', '已送达', '售后退款'],
    clickNumber: 0,
    orders: [],
    height:''
  },
  // 页面切换
  centerTap: function(event) {
    //点击的偏移量
    var cur = event.detail.x;
    var singleNavWidth = wx.getSystemInfoSync().windowWidth * 20 / 100;
    this.setData({
      clickNumber: parseInt(cur / singleNavWidth)
    })
    this.getOrder();
  },
  changeSwipe: function(event) {
    var type =
      event.detail.current;
    this.setData({
      clickNumber: type
    });
    this.getOrder();
  },
  // 获取订单
  getOrder: async function(options) {
    var res = {};
    var clicknumber = +this.data.clickNumber;
    switch (clicknumber) {
      case 0:
        res = await $request({
          url: config.url.getorder
        });
        break;
      case 1:
        res = await $request({
          url: config.url.getorder,
          data: {
            status: '已下单'
          }
        });
        break;
      case 2:
        var temp=[];
        res = await $request({
          url: config.url.getorder,
          data: {
            status: '配送中'
          }
        });
        temp=temp.concat(res.data.orders);
        res=await $request({
          url:config.url.getorder,
          data:{
            status:'已接单'
          }
        })
        temp=temp.concat(res.data.orders);
        res = {
          data: {
            orders: temp
          }
        };
        break;
      case 3:
        res = await $request({
          url: config.url.getorder,
          data: {
            status: '已送达'
          }
        });
        break;
      case 4:
        var temp = [];
        res = await $request({
          url: config.url.getorder,
          data: {
            status: '申请退款中'
          }
        });
        temp = temp.concat(res.data.orders);
        var res1 = await $request({
          url: config.url.getorder,
          data: {
            status: '已退款'
          }
        });
        temp = temp.concat(res1.data.orders);
        var res2 = await $request({
          url: config.url.getorder,
          data: {
            status: '退款已拒绝'
          }
        });
        temp = temp.concat(res1.data.orders);
        res = {
          data: {
            orders: temp
          }
        };
        break;
    }
    if (res.data == undefined) {
      this.setData({
        orders: []
      })
    } else {
      var orders = res.data.orders;
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }
      for (let i = 0; i < orders.length; i++) {
        orders[i].createTime = new Date(orders[i].createTime).format("yyyy-MM-dd hh:mm:ss");
        console.log(orders[i].createTime);
      }
      this.setData({
        orders: orders
      });
    }
  },
  // 跳转订单详情
  linkToOrderDetail: function(event) {
    var index = event.currentTarget.dataset.oid;
    console.log(index);
    wx.navigateTo({
      url: '../orderDetail/orderDetail?order=' + JSON.stringify(this.data.orders[index]),
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
    this.getOrder();
    this.setData({
      clickNumber: options.show,
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
    this.getOrder();
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