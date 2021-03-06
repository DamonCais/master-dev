import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// ================for guzzu========
import gRequest from '@/utils/gRequest'

export function getShopList(params) {
  return gRequest({
    url: '/Store.find',
    method: 'post',
    data: params
  })
}

export function getShopById(id) {
  return gRequest({
    url: '/Store.get',
    method: 'post',
    data: {
      storeId: id
    }
  })
}
