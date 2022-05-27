import request from "@/utils/request";

export default {

  getHotBannerList() {
    return request({
      url: '/front/banner/getHotBannerList',
      method: 'get'
    })
  }
}
