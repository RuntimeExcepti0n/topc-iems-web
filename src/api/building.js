import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/building/list',
    method: 'get',
    params
  })
}
