/**
 * 日志信息表相关
 */
import http from './http'

const url = '/v1/jobs-log'

export default {
  page: data => http.get(url + '/page', data).then(res => res)
}
