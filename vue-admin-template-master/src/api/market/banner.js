import request from '../../utils/request'

export default {

  createBanner(banner) {
    return request({
      url: '/front/banner/createBanner',
      method: 'post',
      data: banner
    })
  },
  getBannerList() {
    return request({
      url: '/front/banner/getBannerList',
      method: 'get'
    })
  }
}
