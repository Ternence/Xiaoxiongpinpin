// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: ''
  },

  //定位
  locate: function(options) {
    var page = this
    wx.getLocation({
      success: function(res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        console.log(longitude + " " + latitude);
        page.locateCity(longitude, latitude);
      },
    })
  },
  locateCity: function(longitude, latitude) {
    var page = this
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=XgstCc1ij4BvvkbYHUQrGYGHtkWe3ujV&location=' + latitude + ',' + longitude + '&output=json&pois=1',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // success  
        console.log(res);
        var city = res.data.result.addressComponent.city;

        console.log("城市为" + city)
        page.setData({
          city: city
        });
      },
      fail: function() {
        // fail  
      },
      complete: function() {
        // complete  
      }
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

  }
})