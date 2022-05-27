import request from "@/utils/request";

export default {

  //登录
  submitLoginUser(userInfo) {
    return request({
      url: '/ucenter/user/login',
      method: 'post',
      data: userInfo
    })
  },
  //根据token获取里面的用户信息
  getLoginUserInfo() {
    return request({
      url: '/ucenter/user/getUserInfo',
      method: 'get'
    })
  }
}
