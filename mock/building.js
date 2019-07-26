import Mock from 'mockjs'

const data = Mock.mock({
  'items|2': [{
    id: '@id',
    image: '',
    'managerName|1': ['张三','李四','小李飞刀'],
    'status|1': ['在建', '出租中', '已租馨'],
    buildingName: '华融大厦',
    updateTime: '@datetime',
    'localtion|1': ['广东省深圳市福田区','江苏省南京市玄武区']
  }]
})

export default [
  {
    url: '/building/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
