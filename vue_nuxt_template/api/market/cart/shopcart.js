import request from "~/utils/request";

export default {

  addToCart(goodsId, num) {
    return request({
      url: `/shopcart/cart/addToCart/${goodsId}/${num}`,
      method: 'get'
    })
  },
  getCartList() {
    return request({
      url: '/shopcart/cart/cartList',
      method: 'get'
    })
  },
  removeItem(goodsId) {
    return request({
      url: '/shopcart/cart/removeItem/' + goodsId,
      method: 'delete'
    })
  },
  removeCheckItems(ids) {
    return request({
      url: '/shopcart/cart/removeCheckItems',
      method: 'delete',
      data: ids
    })
  },
  clearCart() {
    return request({
      url: '/shopcart/cart/clearCart',
      method: 'delete'
    })
  },
  updateItemNum(goodsId, num) {
    return request({
      url: `/shopcart/cart/updateItemNum/${goodsId}/${num}`,
      method: 'put'
    })
  },
  checkItem(id, check) {
    return request({
      url: `/shopcart/cart/${id}/${check}`,
      method: 'put'
    })
  },
  //向购物项表中添加数据
  createCartItems(ids, counts) {
    return request({
      url: '/shopcart/cartitem/createCartItems',
      method: 'post',
      data: {ids, counts}
    })
  }
}

