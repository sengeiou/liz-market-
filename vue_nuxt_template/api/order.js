import request from "~/utils/request";

export default {

  //1. 生成订单的接口
  createOrder(goodsId) {
    return request({
      url: '/orderservice/order/createOrder/' + goodsId ,
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
}
