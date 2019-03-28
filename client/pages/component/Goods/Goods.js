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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeFromTrolley:function(event){
      this.triggerEvent('removeEvent', {}) 
    },
    addToTrolley:function(event){
      this.triggerEvent('addevent',{});
    }
  }
})