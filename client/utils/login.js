import consts from './consts'
import Session from './session'
var app=getApp();
function login() {
  console.log('out');
  wx.login({
    success: function (res) {
      var code = res.code;
      wx.getUserInfo({
        success(res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
      if (code) {
        console.log('获取用户登录凭证：' + code);
        wx.request({
          url: 'http://localhost:3000/userlogin',
          method: 'POST',
          data: {
            code: code,
            encryptedData: encryptedData,
            iv: iv
          },
          success(res) {
            Session.set(res);
            app.globalData.userInfo=res.userInfo;
          }
        })
      } else {
        console.log('获取用户登录态失败：' + res.errMsg);
      }
    }
  })
};

function loginwithcode() {
    console.log('in');
    wx.login({
      success:function(res){
        var code =res.code;
        console.log(code);
        if(code)
        {
          wx.request({
            url: 'http://localhost:3000/userlogin',
            method: 'POST',
            data: {
              code: code,
            },
            success(res) {
              Session.set(res);
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
}



module.exports={login,loginwithcode}