/**
 * HTTP 请求 axios 封装
 */
import axios from 'axios'
import global from './config'

// Axios 全局配置
const http = axios.create()
http.defaults.baseURL = global.baseURL
http.defaults.withCredentials = true
// 添加请求拦截器
http.interceptors.request.use(
  config => {
    config.headers = global.headers
    config.transformRequest = global.transformRequest
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回数据处理
// 返回格式 {code:业务码 , data: 内容 ， msg: 描述}
http.interceptors.response.use(
  response => {
    console.log('----response---响应结果---', response)
    switch (response.data.code) {
      case '-2':
        location.reload()
        break
      case 0:
        return response.data.data
      default:
        //loading.toast.show(response.data.code, response.data.msg)
    }
  },
  error => {
    console.log('--error---', error)
    return Promise.reject(error)
  }
)

export default http
