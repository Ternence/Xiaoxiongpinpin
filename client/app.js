//app.js
import {
  setLoginUrl
} from './lib/page.auth'
global.regeneratorRuntime = require('./lib/regenerator/runtime-module')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
App({
  globalData: {
    begintime:'',
    endtime:'',
    islogin: false,
    userInfo: {},
    currentaddress: {
      district: '请选择收货地址',
      detail: '',
      name:'',
      phonenumber:''
    },
    selfserviceaddress:'',
    isSelfService:false,
    buynow: {}
  },
  onLaunch: function() {
    // qcloud.setLoginUrl(config.service.loginUrl)
    setLoginUrl(config.url.login)
  },

  /**
   * 设置监听器
   */
  setWatcher(data, watch) {
    Object.keys(watch).forEach(v => {
      let key = v.split('.'); // 将watch中的属性以'.'切分成数组
      let nowData = data; // 将data赋值给nowData
      for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
        nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
      }
      let lastKey = key[key.length - 1];
      // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
      this.observe(nowData, lastKey, watch[v]); // 监听nowData对象的lastKey
    })
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function() {
        return val;
      }
    })
  }
})