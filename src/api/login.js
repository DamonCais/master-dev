import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
// ==================for guzzu===============
import gRequest from '@/utils/gRequest'

export function guzzuLogin(username, password) {
  return gRequest({
    url: '/Auth.signin',
    method: 'post',
    data: {
      'clientType': 'master.guzzu.cn',
      'login': username,
      'password': password
    }
  })
}
