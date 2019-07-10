/**
 * 用户信息表相关
 */
import http from './http'

const url = '/v1/statistics'

export default {
  getImportantNum: () => http.get(url + '/important-num').then(res => res),
  getSuccessRatio: () => http.get(url + '/success-ratio').then(res => res)
}
