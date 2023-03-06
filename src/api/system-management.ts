import request from '@/utils/request'
import qs from 'qs'


// 用户管理
interface getUserParamsType {
  pageSize: number
  currentPage: number
  sort: {}
  params: {}
}


export function getUser(data: getUserParamsType) {
  return request({
    url: 'user/loadTable',
    method: 'post',
    data
  })
}
export function addUser(object: any) {
  return request({
    url: 'user/add',
    method: 'post',
    data: object
  })
}
export function updateUser(object: any) {
  return request({
    url: 'user/update',
    method: 'post',
    data: object
  })
}
export function deleteUser(data: { userId: any }) {
  return request({
    url: 'user/delete',
    method: 'post',
    data
  })
}
export function sendUserPasswordEmail(object: any) {
  return request({
    url: 'user/send',
    method: 'post',
    data: object
  })
}
export function resetPassword(object: any) {
  return request({
    url: 'user/resetPassword',
    method: 'post',
    data: object
  })
}
export function getDeptOptions() {
  return request({
    url: 'department/loadTree',
    method: 'get'
  })
}

// 角色管理
export function getRole(data: {
  pageSize: number;
  currentPage: number;
  sort: {};
  params: {};
}) {
  return request({
    url: 'role/loadRoleGrid',
    method: 'post',
    data
  })
}
export function deleteRole(roleId: any) {
  return request({
    url: 'role/delete?roleId=' + roleId,
    method: 'get'
  })
}
export function addRole(data: any) {
  return request({
    url: 'role/add',
    method: 'post',
    data
  })
}
export function updateRole(data: any) {
  return request({
    url: 'role/update',
    method: 'post',
    data
  })
}
export function getUserRole(roleId: any) {
  return request({
    url: 'role/findById?roleId=' + roleId,
    method: 'get'
  })
}
export function getRoleRightIds(roleId: any) {
  return request({
    url: 'right/loadRoleRightIds?roleId=' + roleId,
    method: 'get'
  })
}
export function getRightTree() {
  return request({
    url: 'right/loadTree',
    method: 'get'
  })
}
export function getRoleOption() {
  return request({
    url: 'role/loadRoleComboOption',
    method: 'get'
  })
}
// 部门管理
export function updateCompanyName(object: {
  companyName: string
  companyId: number | null
  parentId: number
}) {
  return request({
    url: 'company/updateCompanyName',
    method: 'post',
    data: object
  })
}
export function addDepartmentNode(object: {
  name: string
  parentId: number | null
}) {
  return request({
    url: 'department/add',
    method: 'post',
    data: object
  })
}
export function setDepartmentName(object: {
  departmentName: string;
  departmentId: number | null;
  parentId: number;
}) {
  return request({
    url: 'department/updateDepartmentName',
    method: 'post',
    data: object
  })
}
export function deleteDepartmentNode(departmentId: number) {
  return request({
    url: 'department/delete?departmentId=' + departmentId,
    method: 'get'
  })
}
export function getAreaCode() {
  return request({
    url: 'department/loadTree',
    method: 'get'
  })
}
export function setDepartmentArea(data: {
  departmentId: number | null
  areaCode: string
}) {
  return request({
    url: 'department/configArea',
    method: 'post',
    data: data
  })
}
export function getDepartmentNodeTree() {
  return request({
    url: 'department/loadTree',
    method: 'get'
  })

}
//获取菜单树
export function getMenuTreeData() {
  return request.request({
    url: "right/loadTreeWithSystemName",
    method: 'get'
  })

}


// 菜单权限
export function loadTreeWithSystemName() {
  return request({
    url: 'right/loadTreeWithSystemName',
    method: 'get'
  })
}
export function setRightName(data: {
  rightName: string;
  rightId: number | null;
}) {
  return request({
    url: 'right/update',
    method: 'post',
    data: data,
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}