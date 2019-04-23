// pages/component/Address/Address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address:Object
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
    chose:function(event){
      var detail=this.properties.address;
      this.triggerEvent('choseEvent',detail,{})
    },
    edit:function(event){
      var detail=this.properties.address;
      this.triggerEvent('editEvent',detail,{});
    },
    delete:function(event){
      var detail=this.properties.address;
      this.triggerEvent('deleteEvent', detail, {});
    }
  }
})
