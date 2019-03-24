// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textclass: 'catagory',
    goods: {
      stock: 1,
      scr: '',
      sales: 12,
      name: '香蕉',
      price: 21,
    }
  },


  //获取商品
  getGoods: function(options) {
    // TODO
  },
  // 动态样式
  Click: function(options) {
    this.setData({
      textclass: 'catagory-active'
    })
  },
  // 跳转搜索
  linkToSearch: function(options) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //跳转地址定位
  linkToAddress:function(options){
    wx.navigateTo({
      url: '../address/address',
    })
  }, 

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

  },
})