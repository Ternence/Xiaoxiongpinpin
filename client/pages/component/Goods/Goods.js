// pages/component/Goods/Goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    number:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeFromTrolley:function(){
      var num=this.data.number;
      num=num-1;
      this.setData({
        number:num
      })
    },
    addToTrolley:function(){
      var num=this.data.number;
      num=num+1;
      this.setData({
        number:num
      })
    }
  }
})