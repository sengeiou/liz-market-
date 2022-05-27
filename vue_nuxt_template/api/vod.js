import request from "@/utils/request";

export default {

  //1. 获取视频凭证
  getPlayAuth(id) {
    return request({
      url: '/eduvod/video/getPlayAuth/' + id,
      method: 'get',
    })
  }
}
