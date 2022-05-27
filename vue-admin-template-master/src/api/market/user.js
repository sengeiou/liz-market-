import request from '../../utils/request'

export default {
  getDetailList() {
    return request({
      url: '/ucenter/detail/getDetailList',
      method: 'get'
    })
  },
}
