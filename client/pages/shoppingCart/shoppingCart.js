// pages/shoppingCart/shoppingCart.js
var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruits:[],
    price:0,
    num:0,
    checkcss:'iconcheckall'
 },
  // 跳转主界面
  LinktoCart:function(options){
    wx.switchTab({
      url: '../home/home',
    })
  },
  // 结算商品
  purchase:function(){

  },
  // 获取商品数量
  getCartNum:function(){
    var that = this;
    API.ajax('/cart/num', function (res) {
      that.setData({
        num: res.num
      })
    });
  },
  // 更新商品数量
  updateGoodsNum:function(){

  },
  // 计算商品价格
  getTotalPrice:function(){
    var that = this;
    API.ajax('/cart/total', function (res) {
      that.setData({
        price: res.total
      })
    });
  },
  // 获取购物车
  getCart:function(){
    var that = this;
    API.ajax('/cart', function (res) {
      that.setData({
        fruits: res.fruits
      })
    });
  },
  // 全选商品
  checkall:function(){
    var check=this.data.checkcss==='iconcheckall'?'iconquanxuan':'iconcheckall';
    this.setData({
      checkcss:check
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCart();
    this.getTotalPrice();
    this.getCartNum();
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