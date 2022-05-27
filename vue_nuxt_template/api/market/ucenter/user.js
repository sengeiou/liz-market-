import request from "@/utils/request";

export default {

  getUserDetailInfo(userId) {
    return request({
      url: '/ucenter/detail/getUserDetailInfo/' + userId,
      method: 'get'
    })
  },
  addUserDetailInfo(userDetailDto) {
    return request({
      url: '/ucenter/detail/saveUserDetail',
      method: 'post',
      data: userDetailDto
    })
  },
  deleteUserDetail(detailId) {
    return request({
      url: '/ucenter/detail/deleteUserDetail/' + detailId,
      method: 'delete'
    })
  },
  updateUserDetail(userDetailDto) {
    return request({
      url: '/ucenter/detail/updateUserDetail',
      method: 'post',
      data: userDetailDto
    })
  },
  getDetailList() {
    return request({
      url: '/ucenter/detail/getDetailList',
      method: 'get'
    })
  },
  getUserInfo() {
    return request({
      url: '/ucenter/user/getUserInfo',
      method: 'get'
    })
  }
}
