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

export function getOrderList(params) {
  return gRequest({
    url: '/Order.find',
    method: 'post',
    data: params
  })
}

export function doPost(url, params) {
  return gRequest({
    url: url,
    method: 'post',
    data: params
  })
}
