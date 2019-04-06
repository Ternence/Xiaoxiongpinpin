// const host = 'http://127.0.0.1:3000'
const host = 'http://47.102.144.176:3000'

module.exports = {
  url: {
    login: `${host}/userlogin`,
    address:`${host}/api/address`,
    updatead:`${host}/api/updateaddress`,
    catagory:`${host}/api/catagory`,
    allgoods:`${host}/api/allgoods`,
    goodsbycatagory:`${host}/goods/category`,
    getonecomment: `${host}/reviews/good`,
    getcart:`${host}/api/cart`,
    updatecart:`${host}/api/updatecart`,
    clearcart:`${host}/api/clearcart`,
    addorder:`${host}/api/order`,
    getorder: `${host}/api/order/user`,
    editorder:`${host}/api/editorder`,
    getpictures:`${host}/setting/items`,
    search:`${host}/search`
  }
}
