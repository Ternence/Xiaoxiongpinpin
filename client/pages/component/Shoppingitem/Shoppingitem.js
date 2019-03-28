// pages/component/Shoppingitem/Shoppingitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fruit:Object
  },

  attached: function () {
    var that=this;
    this.setData({
      num:that.properties.fruit.number
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    num:'',
    css:'icondagou'
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    removeFromTrolley: function () {
      var num = this.data.num;
      num = num - 1;
      this.setData({
        num: num
      })
    },
    addToTrolley: function () {
      var num = this.data.num;
      num = num + 1;
      this.setData({
        num: num
      })
    },
    dagou:function(){
      var check = this.data.css === 'icondagou' ? 'iconok' : 'icondagou';
      this.setData({
        css: check
      })
    }
  }
})
