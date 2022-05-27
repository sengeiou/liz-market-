import request from "@/utils/request";

export default {
  //根据发送验证码
  sendCode(mailAddress) {
    return request({
      url: '/message/mail/sendCode/' + mailAddress,
      method: 'get'
    })
  },
  //注册方法
  registerUser(registerVo) {
    return request({
      url: '/ucenter/user/register',
      method: 'post',
      data: registerVo
    })
  }
}
