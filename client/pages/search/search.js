// pages/search/search.js
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
    keyword:'',
    searchresult:[],
    height: 555,
    goods:[],
    haveresult:true
  },

  // 设置关键字
  setKeyword:function(event){
    this.setData({
      keyword:event.detail.value
    })
  },

  // 搜索
  search:async function(options){
    var res = await $request({ url: config.url.search,data:{name:this.data.keyword}});
    var good=res.data.good;
    good = this.nomarlizegoods(good);
    this.setData({
      goods:good
    });
    good=good.map(value=>({
      id:value.id,
      src: value.previewPic,
      name:value.name,
      price:value.price
    }));
    var hasresult=good.length>0?true:false;
    this.setData({
      searchresult:good,
      haveresult:hasresult
    })
  },
  nomarlizegoods: function (goods) {
    goods = goods.map(value => ({
      id: value.id,
      name: value.name,
      catagory: value.category,
      stock: value.stock,
      price: value.price,
      status: value.status,
      number: 0,
      options: value.options,
      description: value.description,
      src: value.previewPic,
      pictures: value.pictures
    }));
    return goods;
  },
  linkToDetail: function (event) {
    var index = event.currentTarget.dataset.gid;
    console.log(index);
    var goods = this.data.goods[index];
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goods=' + JSON.stringify(goods),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
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