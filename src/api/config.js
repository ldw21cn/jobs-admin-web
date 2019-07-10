/**
 * 全局相关配置
 */
import Qs from 'qs'

// 对外暴露全局常量及函数
export default {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: "http://127.0.0.1:8088",
  transformRequest: [
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    function(data) {
      return Qs.stringify(data)
    }
  ]
}
