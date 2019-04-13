// pages/component/Orderitem/Orderitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Object
  },

  attached:function() {
    var order=this.properties.order;
    var items = this.properties.order.items;
    var total = 0;
    for (let i = 0; i < items.length; i++) {
      total = total + items[i].price * items[i].amount
    }
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }    
    // var time = new Date(this.properties.order.createTime);
    // var ftime = time.format("yyyy-MM-dd hh:mm:ss");
    this.setData({
      goods: items[0].name||'',
      price: total,
      order:order
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    goods: '',
    price: 0,
    time:'',
    order:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formattime: function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  }
})
