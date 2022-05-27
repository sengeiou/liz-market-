import request from '../../utils/request'

export default {

  getAllLogistics(current, limit, searchObj) {
    return request({
      url: `/backstage/logistics/getAllLogisticsList/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  updateLogisticsStatus(id, status) {
    return request({
      url: `/backstage/logistics/updateLogistics/${id}/${status}`,
      method: 'get'
    })
  }
}
