import request from '/@/utils/request'
import qs from 'qs'

export function login(data: any) {
  return request.post({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: 'login',
    params: data,
  })
}
export function getInfo() {
  return request.get({
    url: 'login/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request.post({
    url: 'logout',
  })
}
export function changePassword(data: any) {
  return request.post({
    url: 'user/changePassword',
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
  return request.get({
    url: '/user/loadAllOptionList'
  })
}

// 根据用户名称加载配置选项
export function loadOptionListByUserName(data: any) {
  return request.post({
    url: '/user/loadOptionListByUserName',
    method: 'post',
    transformRequest: [
      function (data: any) {
        return qs.stringify(data)
      },
    ],
  })
}
