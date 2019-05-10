// pages/readyToPay/readyToPay.js
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
    address: '请选择收获地址',
    price: '',
    user: '',
    phonenumber: '',
    time: '请选择时间',
    cart: [],
    first: true,
    height: '',
    notetoast: false,
    note: '',
    begintime: '',
    endtime: '',
    ispre:false,
    isself:false
  },
  // 留言相关
  shownote: function() {
    this.setData({
      notetoast: true
    })
  },
  cancelnote: function() {
    this.setData({
      notetoast: false
    })
  },
  confirmnote: function(event) {
    this.setData({
      notetoast: false
    })
  },
  setNote: function(event) {
    this.setData({
      note: event.detail.value
    })
  },

  choseaddress: function() {
    wx.navigateTo({
      url: '../address/address',
    });
    console.log('hi');
    // var district=address.district;
    // var detail=address.detail;
    // console.log(district+detail);
  },
  setaddress: function() {
    var address = app.globalData.currentaddress;
    var ad = address.district + " " + address.detail;
    if (address.detail != "") {
      this.setData({
        address: ad,
        user: address.name || '',
        phonenumber: address.phone || address.phonenumber
      })
    } else {
      this.setData({
        address: ad,
        user: address.name || '',
      })
    }

  },
  pay: async function() {
    if (!this.data.first) {
      wx.switchTab({
        url: '../home/home',
      })
      return;
    }
    var str = '请选择收货地址';
    if (this.data.address.trim() != str.trim()) {
      if (this.data.allpre || this.data.time !='请选择时间')
      {
        if(this.data.user!=''&&this.data.phonenumber!='')
        {
          this.setData({
            first: false
          });
          var address = app.globalData.currentaddress;
          var items = this.data.cart;
          items = items.map(value => ({
            id: value.id,
            name: value.name,
            amount: value.num,
            price: value.price,
            options: value.options || [],
            previewPic: value.previewPic
          }));
          var time = this.data.time;
          time = time == '请选择时间' ? '' : time;
          var res = await $request({
            url: config.url.addorder,
            method: 'POST',
            data: {
              order: {
                name: this.data.user,
                province: address.province,
                city: address.city,
                district: address.district,
                detail: address.detail,
                phone: address.phone || address.phonenumber,
                status: '未支付',
                items: items,
                note: this.data.note,
                requestDeliverTime: time,
                isSelfPickUp: items[0].options.length == 0 ? false : true
              }
            }
          });
          console.log(res);
          if (res.code == 20000) {
            var id = res.data.order._id;

            let respre = await $request({
              url: config.url.wxpreorder,
              method: 'POST',
              data: {
                orderid: res.data.order._id,
                fee: this.data.price * 100
              }
            });
            // console.log('unifiedorder');
            // console.log(respre);
            if (respre.status == 100) {
              wx.requestPayment({
                'timeStamp': respre.timestamp,
                'nonceStr': respre.nonceStr,
                'package': respre.package,
                'signType': 'MD5',
                'paySign': respre.paySign,
                'success': async function (res) {
                  if (app.globalData.buynow.id == undefined) {
                    var res = await $request({
                      url: config.url.clearcart
                    });
                  } else {
                    app.globalData.buynow = {};
                  }

                  wx.switchTab({
                    url: '../home/home',
                  })
                },
                'fail': async function (res) {
                  if (res.errMsg == 'requestPayment:fail cancel') {
                    console.log(id);
                    wx.showToast({
                      title: '支付取消',
                      icon: 'none'
                    });
                    var deleteres = await $request({
                      url: config.url.deleteorder,
                      data: {
                        id: id
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'fail'
                    })
                    // var chekcres = await $request({ url: config.url.checkorder})
                  }
                }
              })
            } else {
              wx.showToast({
                title: '系统繁忙,稍后再试',
                icon: 'fail'
              })
            }
            var checkorderres = await $request({
              url: config.url.checkorder,
              data: {
                out_trade_no: res.data.order._id
              }
            });

          } else {
            wx.showToast({
              title: '库存不足',
              icon: 'none'
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../home/home',
              })
            }, 2000);
          }
        }
        else
        {
          wx.showToast({
            title: '请填写联系人及联系电话',
            icon:'none',
            mask:true
          })
        }
      }
      else
      {
        wx.showToast({
          title: '请填写配送时间',
          icon:'none',
          mask:true
        })
      }

    } else {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        mask: true
      })
    }


  },
  getcart: async function() {
    var res = await $request({
      url: config.url.getcart
    });
    // console.log(res);
    var cart = res.data;
    // console.log(cart);
    cart = cart.map(value => ({
      id: value.id,
      description: value.description,
      name: value.name,
      previewPic: value.previewPic,
      price: value.price,
      total: value.price * value.num,
      options: value.options,
      num: value.num
    }));
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].num
    }
    this.setData({
      cart: cart,
      price: total
    })
    this.isAllPre();
  },
  isAllPre:function(){
    var cart=this.data.cart;
    console.log(cart[0].options)
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].options.length==0)
      {
        this.setData({
          allpre: false
        })
        return
      }
    }
    this.setData({
      allpre:true
    })
  },
  getestimatetime: async function() {
    var res = await $request({
      url: config.url.getphone
    });
    let date = new Date();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var delay = parseInt(res.data.settings.estimateTime) || 40;
    var total = hh * 60 + mm;
    total = total + delay;
    hh = Math.floor(total / 60);
    mm = total % 60;
    this.setData({
      begintime: hh + ':' + mm,
      endtime: res.data.settings.endDeliverTime
    })
    // this.setData({
    //   time: res.data.settings.estimateTime || '30'
    // })
  },
  bindTimeChange: function(event) {
    this.setData({
      time: event.detail.value
    })
  },
  editpinfo: function () {
    wx.navigateTo({
      url: '../newAddress/newAddress?selfservice=' + JSON.stringify(app.globalData.selfserviceaddress),
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
    if (app.globalData.buynow.id == undefined) {
      this.getcart();
    } else {
      this.setData({
        cart: [app.globalData.buynow],
        price: app.globalData.buynow.total
      })
    }

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
    console.log(app.globalData.isSelfPickUp)
    this.setData({
      isself:app.globalData.isSelfPickUp||false,
      ispre:app.globalData.ispre
    })
    this.setaddress();
    this.getestimatetime();
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