// pages/shoppingCart/shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      stock: 1,
      scr: '',
      sales: 12,
      name: '香蕉',
      price: 21
    },
    price:21,
    num:0
 },
  // 跳转主界面
  LinktoCart:function(options){
    console.log('test');
    wx.switchTab({
      url: '../home/home',
    })
  },
  // 结算商品
  purchase:function(){

  },
  // 更新商品数量
  updateGoodsNum:function(){

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

  }
})