//app.js
import { setLoginUrl } from './lib/page.auth'
global.regeneratorRuntime = require('./lib/regenerator/runtime-module')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
App({
  globalData:{
    islogin:false,
    userInfo:{},
    currentaddress: { district:'请选择收货地址',detail:''},
  },
  onLaunch: function() {
    // qcloud.setLoginUrl(config.service.loginUrl)
    setLoginUrl(config.url.login)
  }
})