import request from '../../utils/request'

export default {

  getAllSales(current, limit) {
    return request({
      url: `/servicesales/sales/getAllSales/${current}/${limit}`,
      method: 'get'
    })
  },
  acceptApply(id) {
    return request({
      url: '/servicesales/sales/acceptApply/' + id,
      method: 'put'
    })
  },
  refuseApply(id) {
    return request({
      url: '/servicesales/sales/refuseApply/' + id,
      method: 'put'
    })
  },
  getSalesDetail(id) {
    return request({
      url: '/servicesales/sales/getSalesDetail/' + id,
      method: 'get'
    })
  }
}
