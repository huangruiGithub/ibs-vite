import request from '@/utils/request'
import qs from 'qs'
export function login(data: any) {
  return request.request({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: 'login',
    method: 'post',
    params: data,
  })
}
export function getInfo() {
  return request.request({
    url: 'login/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request.request({
    url: 'logout',
    method: 'post',
  })
}
export function changePassword(data: any) {
  return request.request({
    url: 'user/changePassword',
    method: 'post',
    data,
    transformRequest: [
      function (data: any) {
        return qs.stringify(data)
      },
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
// 加载用户的全部配置列表
export function loadAllUserOptionList() {
  return request.request({
    url: '/user/loadAllOptionList',
    method: 'get',
  })
}

// 根据用户名称加载配置选项
export function loadOptionListByUserName(data: any) {
  return request.request({
    url: '/user/loadOptionListByUserName',
    method: 'post',
    transformRequest: [
      function (data: any) {
        return qs.stringify(data)
      },
    ],
  })
}
