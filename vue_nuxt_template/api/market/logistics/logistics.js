import request from "@/utils/request";

export default {
  getLogisticsList() {
    return request({
      url: '/backstage/logistics/getLogisticsList',
      method: 'get'
    })
  },
  getLogisticsInfo(status) {
    return request({
      url: '/backstage/logistics/getLogisticsInfo/' + status,
      method: 'get'
    })
  },
  getLogisticsInfoById(logisticsId) {
    return request({
      url: '/backstage/logistics/getLogisticsInfoById/' + logisticsId,
      method: 'get'
    })
  },
  confirm(logisticsId) {
    return request({
      url: '/backstage/logistics/confirm/' + logisticsId,
      method: 'get'
    })
  },
  removeLogisticsInfo(logisticsId) {
    return request({
      url: '/backstage/logistics/removeLogisticsInfo/' + logisticsId,
      method: 'delete'
    })
  }
}
