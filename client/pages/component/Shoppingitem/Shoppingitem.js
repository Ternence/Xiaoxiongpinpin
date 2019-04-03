// pages/component/Shoppingitem/Shoppingitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good:Object
  },

  attached: function () {

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
    removeFromTrolley: function () {
      this.triggerEvent('removeEvent', {}) 
    },
    addToTrolley: function () {
      this.triggerEvent('addEvent', {}) 
    },
  }
})
