// pages/goodsDetail/goodsDetail.js
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
    goods: {
      id: 1
    },
    comment: '暂无评论',
    comments: [],
    cart: []
  },

  // 获取用户评价
  getComment: async function(options) {
    var res = await $request({
      url: config.url.getonecomment,
      data: {
        id: this.data.goods.id,
        start: 0,
        offset: 1
      }
    });
    if (res.data.reviews.length != 0) {
      this.setData({
        comment: res.data.reviews[0].content,
        comments: res.data.reviews
      })
    }

  },
  // 获取购物车
  getcart: async function() {
    var res = await $request({
      url: config.url.getcart
    });
    this.setData({
      cart: res.data
    });
  },
  // 导航至主页
  linkToHome: function() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  // 导航至购物车
  linkToCart: function() {
    wx.switchTab({
      url: '../shoppingCart/shoppingCart',
    })
  },
  // 导航至
  linkToAllComment: function() {
    wx.navigateTo({
      url: '../allComment/allComment?comments=' + JSON.stringify(this.data.comments),
    })
  },
  // 加入购物车
  addToCart: async function(options) {
    var flag = 0;
    var goods=this.data.goods;
    var cart=this.data.cart;
    console.log(goods);
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == goods.id) {
        cart[i].num = cart[i].num + 1;
        flag = 1;
      }
    }
    if (flag == 0) {
      cart.push({
        id: goods.id,
        num: 1,
        name: goods.name,
        description: goods.description,
        price: goods.price,
        options: []
      });
    }
    this.setData({
      cart:cart
    })
    var res = await $request({
      url: config.url.updatecart,
      method: 'POST',
      data: {
        goods: cart
      }
    });
    if(res.code==20000)
    {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    }

  },
  // 立即购买
  buyNow: function() {
    // TODO
    wx.navigateTo({
      url: '../readyToPay/readyToPay',
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    var goods = JSON.parse(options.goods);
    // console.log(goods);
    this.setData({
      goods: JSON.parse(options.goods)
    })
    this.getComment();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getcart();
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