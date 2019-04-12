// pages/allComment/allComment.js
const {
  regeneratorRuntime
} = global
import {
  $login,
  $request,
  Session
} from '../../lib/page.auth'
import config from '../../config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[{content:'很好',createdAt:'1998-02-24'}],
    height:555,
  },


  getallcomments:async function(id){
    var res = await $request({ url: config.url.getonecomment,data:{id:id}});
    var reviews = res.data.reviews || [];
    Date.prototype.format = function (fmt) {
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
    reviews=reviews.map(value=>({
      content:value.content,
      createdAt: new Date(value.createdAt).format("yyyy-MM-dd hh:mm:ss")
    }));

    this.setData({
      comments:reviews
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsid = JSON.parse(options.goodsid);
    this.getallcomments(goodsid);
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
    });
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