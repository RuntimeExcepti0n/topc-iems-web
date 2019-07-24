import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/floor/list',
    method: 'get',
    params
  })
}
