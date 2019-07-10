/**
 * 任务信息表相关
 */
import http from './http'

const url = '/v1/job-info'

export default {
  page: data => http.get(url + '/page', data).then(res => res),
  execute: (id, param) => http.post(url + '/execute-' + id, {param: param}).then(res => res),
  start: id => http.post(url + '/start-' + id).then(res => res),
  stop: id => http.post(url + '/stop-' + id).then(res => res),
  remove: id => http.post(url + '/remove-' + id).then(res => res)
}
