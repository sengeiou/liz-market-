import request from "~/utils/request";

export default {

  //1. 生成订单的接口
  createOrder(goodsId) {
    return request({
      url: '/orderservice/order/createOrder/' + goodsId,
      method: 'post'
    })
  },
  //2. 根据订单id查询订单信息
  getOrderInfo(orderNo) {
    return request({
      url: '/orderservice/order/getOrderInfoByNo/' + orderNo,
      method: 'get'
    })
  },
  //4. 查询订单状态的方法
  // queryPayStatus(orderNo) {
  //   return request({
  //     url: '/eduorder/paylog/queryPayStatus/' + orderNo,
  //     method: 'get'
  //   })
  // }
  //完善订单信息
  updateOrderInfo(order) {
    return request({
      url: '/orderservice/order/updateOrderInfo',
      method: 'post',
      data: order
    })
  },
  //初始化支付详情
  initPayDetailInfo(orderNo) {
    return request({
      url: '/orderservice/order/getFinalSubmitInfo/' + orderNo,
      method: 'get'
    })
  },
  //提交支付方法
  submitPay(payDetail) {
    return request({
      url: '/orderservice/order/submitPay',
      method: 'post',
      data: payDetail
    })
  },
  //购物项订单支付
  createCartOrder(cartOrderDto) {
    return request({
      url: '/orderservice/cartorder/createCartOrder',
      method: 'post',
      data: cartOrderDto
    })
  }
}

