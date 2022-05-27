import axios from 'axios'
import cookie from "js-cookie";
import {Message} from "element-ui";

//创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', //api的BaseUrl
  timeout: 20000 //请求超时时间
})
//请求拦截器
service.interceptors.request.use(
  config => {
    //判断cookie中是否有token的值--->会将token里面的uid设置在请求头--->后端通过uid获取并返回用户信息
    if (cookie.get('liz_token')) {
      config.headers['token'] = cookie.get('liz_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
// http response 响应拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      console.log("response.data.resultCode是28004")

      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        console.log("拦截器方放行.....")
        return response.data
      }
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });
export default service
