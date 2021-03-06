// pages/home/home.js
var API = require('../../utils/api.js');
var util = require('../../utils/util.js')
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
    options: [{
      key: '送达时间',
      selectindex: 0,
      values: []
    }],
    selected: [],
    groundhidden: true,
    // price: 12,
    // selectname: '配送时间',
    index: 0,
    hidden: false,
    islogin: getApp().globalData.islogin,
    currentad: '',
    height: 555,
    cart: [],
    precart: [],
    items: [],
    close: true,
    time: '请选择具体时间',
    begintime: '',
    endtime: ''
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var res = await $request({
      url: config.url.allgoods
    });

    var goods = this.nomarlizegoods(res.data.goods);
    this.setData({
      goods: goods || []
    })
    wx.hideLoading();
    // console.log('getgoods');
  },
  // 格式化商品数据
  nomarlizegoods: function(goods) {
    goods = goods.map(value => ({
      id: value.id,
      name: value.name,
      catagory: value.category,
      stock: value.stock,
      price: value.price,
      originPrice: value.originPrice,
      status: value.status,
      number: value.num || 0,
      options: value.options,
      description: value.description,
      previewPic: value.previewPic,
      pictures: value.pictures,
      sale: value.sale,
      toView: '',
      earliestDeliverTime: value.earliestDeliverTime || 0,
      finalDeliverTime: value.finalDeliverTime
    }));
    return goods;
  },
  // 选择商品种类
  getGoodsByCategory: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.setData({
      toView: event.currentTarget.id
    })
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
    this.getcart();
    wx.hideLoading();
  },
  // 跳转搜索
  linkToSearch: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.navigateTo({
      url: '../search/search',
    })
    wx.hideLoading();
  },
  //跳转地址定位
  linkToAddress: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.navigateTo({
      url: '../address/address',
    })
    wx.hideLoading();
  },
  // 跳转商品详情页
  linkToDetail: function(event) {
    var index = event.currentTarget.dataset.goodid;
    // console.log(index);
    var id = this.data.goods[index].id;
    // console.log(goods);
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?gid=' + JSON.stringify(id),
    })
  },
  // 加入购物车
  addtoCart: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.hideLoading();
    var index = event.currentTarget.dataset.goodid;
    this.setData({
      index: index
    })
    var good = this.data.goods[this.data.index];
    // console.log(good);
    if (good.number > 0) {
      var num = good.number;
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
    } else if (good.finalDeliverTime <= 0) {
      if (this.data.cart.length == 0 || this.data.cart[0].options[0].length == 0) {
        app.globalData.ispre = false;
        var num = good.number;
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
      } else {
        wx.showToast({
          title: '在售商品不能和预售商品同时购买',
          icon: 'none',
          mask: true
        })
      }

    } else {
      console.log(this.data.cart);
      if (this.data.cart.length == 0 || this.data.cart[0].options.length != 0) {
        app.globalData.ispre=true;
        var day = util.getDates(good.earliestDeliverTime, good.finalDeliverTime);
        // var day=util.getDates(2,5);
        var options = this.data.options;
        var values = [];
        for (let time of day) {
          values.push(time.month + '月' + time.day + '日');
        }
        // console.log(values);
        options[0].values = values;
        // console.log(options);
        this.setData({
          options: options,
          groundhidden: false
        })
      } else {
        wx.showToast({
          title: '预售商品不能和在售商品同时购买',
          icon: 'none',
          mask: true,
          duration: 3000
        });

      }

    }

  },
  // 更新购物车
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
        name: goods.name,
        description: goods.description,
        options: goods.options || [],
        previewPic: goods.previewPic,
        price: goods.price
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
  // 从购物车移除1件商品 
  removefromCart: async function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var index = event.currentTarget.dataset.goodid;
    this.setData({
      index: index
    })
    if (this.data.goods[index].number > 0) {
      var num = this.data.goods[index].number;
      var param = {};
      num = num - 1;
      var string = "goods[" + index + "].number";
      param[string] = num;
      this.setData(param);
      this.changethecart();
      // console.log(this.data.cart);
      var res = await $request({
        url: config.url.updatecart,
        method: 'POST',
        data: {
          goods: this.data.cart
        }
      });
    }

    wx.hideLoading();
  },
  //  获取购物册
  getcart: async function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var res = await $request({
      url: config.url.getcart
    });
    this.setData({
      cart: res.data
    });
    // console.log(this.data.cart);

    this.setcart();
    wx.hideLoading();
  },
  // 同步购物车
  setcart: function() {
    var goods = this.data.goods;
    for (let i = 0; i < this.data.goods.length; i++) {
      for (let j = 0; j < this.data.cart.length; j++) {
        if (this.data.goods[i].id == this.data.cart[j].id) {
          goods[i].number = this.data.cart[j].num
        }
      }
    };
    // console.log(goods);
    this.setData({
      goods: goods
    });
    // console.log('1');
    // console.log(this.data.goods);
    // console.log('setcart');
  },
  // 授权相关
  cancel: function() {
    this.setData({
      hidden: true
    });
    wx.navigateBack({
      delta: 0
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
  // 滑动到底检测
  lower: function(event) {
    // console.log('到底了')
  },
  // 获取首页图片
  getpictures: async function() {
    var res = await $request({
      url: config.url.getpictures
    })
    if (res.code == 20000) {
      this.setData({
        items: res.data.items
      })
    } else {
      console.log('获取错误');
    }
  },
  // 首页图片导航
  linktogoodsby: function(event) {
    if (this.data.close)
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?gid=' + JSON.stringify(this.data.items[event.currentTarget.dataset.pid].id),
      })
    else {
      wx.showToast({
        title: '本店暂时休息了',
        icon: 'none'
      })
    }
  },
  // 检查打烊
  checkclose: async function() {
    var res = await $request({
      url: config.url.getphone
    });
    this.setData({
      close: res.data.settings.isOpen
    })
  },
  // 预售商品处理逻辑
  // 预售商品确认
  addpregood: async function() {
    // console.log(day);
    if (this.data.time == '请选择具体时间') {
      wx.showToast({
        title: '您还未选择配送时间',
        icon: 'none',
        mask: true
      })
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      var index = this.data.index;
      var good = this.data.goods[this.data.index];
      var num = good.number;
      var param = {};
      num = 1;
      var string = "goods[" + this.data.index + "].number";
      var string1 = "goods[" + this.data.index + "].options";
      param[string] = num;
      var value = [];
      value.push(this.data.options[0].values[this.data.options[0].selectindex]);
      value.push(this.data.time);
      param[string1] = {
        key: this.data.options[0].key,
        value: value
      }
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
      this.setData({
        groundhidden: true
      })
      wx.hideLoading();
    }

  },
  cancelOption: function() {
    this.setData({
      groundhidden: true,
      time: '请选择具体时间'
    })
  },
  // 选择时间段
  setSelect: function(event) {
    var options = this.data.options;
    options[0].selectindex = event.detail.selectindex;
    // console.log(event.detail);
    this.setData({
      options: options
    })
  },
  // 选择具体时间
  bindTimeChange: function(event) {
    // console.log(event.detail);
    this.setData({
      time: event.detail.value
    })
  },
  getSettings: async function() {
    var res = await $request({
      url: config.url.getphone
    });
    // console.log(res);
    app.globalData.begintime = res.data.settings.startDeliverTime || '';
    app.globalData.endtime = res.data.settings.endDeliverTime || '';
    app.globalData.selfserviceaddress = res.data.settings.selfPickUpAddress;
    this.setData({
      begintime: app.globalData.begintime,
      endtime: app.globalData.endtime
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.getSettings();
    this.getpictures();
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    // console.log('onshow');
    app.globalData.buynow = {};
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
      clicknumber: 0
    })
    if (session) {
      await this.getCatagorys();
      await this.getGoods();
      await this.getcart();
      await this.checkclose();
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
  onPullDownRefresh: async function() {
    console.log('hi');
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      clicknumber: 0
    })
    await this.getGoods();
    wx.hideLoading();
    wx.stopPullDownRefresh();
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