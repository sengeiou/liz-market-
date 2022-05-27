import request from '../../utils/request'

export default {

  //2. 根据订单id查询订单信息
  getOrderInfo(orderNo) {
    return request({
      url: '/orderservice/order/getOrderInfoByNo/' + orderNo,
      method: 'get'
    })
  },
}
