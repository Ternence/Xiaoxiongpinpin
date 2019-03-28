// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:['全部','待付款','待配送','已完成','售后退款'],
    clickNumber:0

  },
  // 页面切换
  centerTap: function(event) {
    //点击的偏移量
    var cur = event.detail.x;
    //每个tab选项宽度占15%
    var singleNavWidth = wx.getSystemInfoSync().windowWidth *20 / 100;
    this.setData({
      clickNumber: parseInt(cur / singleNavWidth)
    })
  },
  changeSwipe: function(event) {
    console.log(event);
    var type =
      event.detail.current;
    this.setData({
      clickNumber: type
    });
  },
  // 获取订单
  getOrder:function(options){

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      clickNumber:options.show,
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