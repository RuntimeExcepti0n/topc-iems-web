import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/room/list',
    method: 'get',
    params
  })
}
