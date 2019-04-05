// pages/home/home.js
var API = require('../../utils/api.js')
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
    textclass: 'catagory',
    goods: [],
    catagory: [],
    clicknumber: 0,
    options: [],
    selected: [],
    groundhidden: true,
    price: 12,
    selectname: 'Test',
    index: 0,
    hidden: false,
    islogin: getApp().globalData.islogin,
    currentad: '',
    height: 555,
    cart: []
  },

  //获取商品类别
  getCatagorys: async function(options) {
    var res = await $request({
      url: config.url.catagory
    });
    var temp = res.data.categories;
    temp.unshift({
      id: '',
      name: '全部'
    });
    this.setData({
      catagory: res.data.categories
    })
  },
  //获取商品
  getGoods: async function(options) {
    var res = await $request({
      url: config.url.allgoods
    });

    var goods = this.nomarlizegoods(res.data.goods);
    this.setData({
      goods: goods
    })
  },
  // 格式化商品数据
  nomarlizegoods: function(goods) {
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
      src:value.previewPic,
      pictures:value.pictures
    }));
    return goods;
  },
  // 选择商品种类
  getGoodsByCategory: async function(event) {
    var that = this;
    this.setData({
      clicknumber: event.currentTarget.dataset.gid
    })
    if (event.currentTarget.dataset.gid == 0) {
      await this.getGoods();
      // console.log('test');
      // console.log(this.data.goods);
    } else {
      var res = await $request({
        url: config.url.goodsbycatagory,
        data: {
          category: event.currentTarget.dataset.category.name
        }
      });
      var goods = this.nomarlizegoods(res.data.goods);
      this.setData({
        goods: goods
      });
    }
    // console.log(this.data.goods);
    this.setcart();
  },
  // 跳转搜索
  linkToSearch: function(options) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //跳转地址定位
  linkToAddress: function(options) {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  // 跳转商品详情页
  linkToDetail: function(event) {
    var index = event.currentTarget.dataset.goodid;
    var goods = this.data.goods[index];
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goods=' + JSON.stringify(goods),
    })
  },
  // 提交购物车
  addtoCart: async function(event) {
    var index = event.currentTarget.dataset.goodid;
    this.setData({
      index: index
    })
    var num = this.data.goods[this.data.index].number;
    var param = {};
    num = num + 1;
    var string = "goods[" + this.data.index + "].number";
    param[string] = num;
    this.setData(param);
    this.changethecart();
    var req = await $request({
      url: config.url.updatecart,
      method: 'POST',
      data: {
        goods: this.data.cart
      }
    });

  },
  changethecart: function() {
    var goods = this.data.goods[this.data.index];
    var cart = this.data.cart;
    // console.log(cart);
    var flag = 0;
    var that = this;
    var num = goods.number;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == goods.id) {
        cart[i].num = num;
        flag = 1;
      }
    }
    if (flag == 0) {
      goods = {
        id: goods.id,
        num: goods.number,
        name:goods.name,
        description: goods.description,
        options: [],
        price:goods.price
      };
      cart.push(goods);
    }
    var remove0 = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].num != 0)
        remove0.push(cart[i])
    }
    this.setData({
      cart: remove0
    })
  },
  //  
  removefromCart: async function(event) {
    var index = event.currentTarget.dataset.goodid;
    this.setData({
      index: index
    })
    var num = this.data.goods[index].number;
    var param = {};
    num = num - 1;
    var string = "goods[" + index + "].number";
    param[string] = num;
    this.setData(param);
    this.changethecart();
    // console.log(this.data.cart);
    var req = await $request({
      url: config.url.updatecart,
      method: 'POST',
      data: {
        goods: this.data.cart
      }
    });
  },
  getcart: async function() {
    var res = await $request({
      url: config.url.getcart
    });
    this.setData({
      cart: res.data
    });
    // console.log(this.data.cart);

    this.setcart();
  },
  setcart: function() {
    var goods = this.data.goods;
    for (let i = 0; i < this.data.goods.length; i++) {
      for (let j = 0; j < this.data.cart.length; j++) {
        if (this.data.goods[i].id == this.data.cart[j].id) {
          goods[i].number = this.data.cart[j].num
        }
      }
    }
    this.setData({
      goods: goods
    });
    // console.log('1');
    // console.log(this.data.goods);
  },
  cancel: function() {
    this.setData({
      hidden: true
    });
    wx.navigateBack({
      delta:0
    })
  },
  confirm: function() {
    this.setData({
      hidden: true
    });
    wx.showToast({
      title: '使用小程序必须获得您的授权',
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },
  async bindGetUserInfo(e) {
    if (app.globalData.islogin == true) {
      return;
    }
    try {
      const userInfo = await $login();
      app.globalData.islogin = true;
      app.globalData.userInfo = userInfo;
      this.setData({
        islogin: app.globalData.islogin
      })
      this.getCatagorys();
      this.getGoods();
      this.getcart();
    } catch (err) {
      console.log("+++1+++ error:", err)
    }
  },
  lower: function(event) {
    // console.log('到底了')
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
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
    console.log('onshow');
    const session = Session.get()
    if (session) {
      app.globalData.islogin = true;
      app.globalData.userInfo = session.userInfo;
      this.setData({
        islogin: app.globalData.islogin
      })
    } else {
      app.globalData.islogin = false;
      this.setData({
        islogin: app.globalData.islogin
      })
    }
    this.setData({
      currentad: app.globalData.currentaddress.detail,
      clicknumber:0
    })
    if(session)
    {
      this.getCatagorys();
      this.getGoods();
      this.getcart();
    }

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