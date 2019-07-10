/**
 * 任务组信息表相关
 */
import http from './http'

const url = '/v1/job-group'

export default {
  page: data => http.get(url + '/page', data).then(res => res),
  remove: id => http.post(url + '/remove-' + id).then(res => res)
}
