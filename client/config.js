const host = 'http://127.0.0.1:3000'

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
    updatecart:`${host}/api/updatecart`
  }
}
