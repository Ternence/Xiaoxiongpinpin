// pages/component/option/option.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    clickoption:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeClick:function(event){
      var detail={
        selectindex: event.currentTarget.dataset.oid
      }
      this.triggerEvent('selectevent', detail,{}) 
    }
  }
})
