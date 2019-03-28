let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;

var Mock = require('./mock.js')

function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : {
        "Content-Type": "application/json"
      },
      success: function(res) {
        fn(res);
      }
    });
  } else {
    switch (data) {
      case '/fruit':
        var res = Mock.mock({
          'goods|10': [{
            'name': '@ctitle(3,8)',
            'stock': '@integer(40,100)',
            'price': '@float(10,20)',
            'sales': '@integer(20,30)',
            'number':'@integer(0,0)'
          }]
        });
        fn(res);
        break;
      case '/catagory':
        var res = Mock.mock({
          'catagorys|8': [{
            'name': '@ctitle(2,5)'
          }]
        });
        fn(res);
        break;
      case '/cart':
        var res = Mock.mock({
          'fruits|10': [{
            'name': '@ctitle(2,5)',
            'price': '@integer(20,30)',
            'dscr': '@ctitle(6,10)',
            'number': '@integer(1,5)'
          }]
        });
        fn(res);
        break;
      case '/cart/num':
        var res = Mock.mock({
          'num|': '@integer(1,10)'
        });
        fn(res);
        break;
      case '/cart/total':
        var res = Mock.mock({
          'total|': '@integer(50,60)'
        });
        fn(res);
        break;
        case '/option':
        var res=Mock.mock({
          'options|2-4':[{
            'title':'@ctitle(2,4)',
            'options|1-3':[{
              'name':'@ctitle(1,3)',
            }],
            'selectindex':'@integer(0,0)'
          }]
        })
        console.log(res);
        fn(res);
        break;
    }


  }
}

module.exports = {
  ajax: ajax
}


// var Mock = require("../utils/mock.js");

// Mock.mock('https://xxx.com/users', {
//   "code": 200,
//   "data|1-20": [
//     {
//       "name": function () {
//         return Mock.Random.cname()
//       },
//       "lastLogin": function () {
//         return Mock.Random.datetime()
//       }
//     }
//   ]
// })
// Mock.mock('https://xxx.com/user/delete', {
//   "code": 200,
//   "message": "s删除成功"
// })