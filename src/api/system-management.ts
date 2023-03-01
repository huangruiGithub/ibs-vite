import request from '@/utils/request'
// import qs from 'qs'


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
// export function addUser(object) {
//   return request({
//     url: 'user/add',
//     method: 'post',
//     data: object
//   })
// }
// export function updateUser(object) {
//   return request({
//     url: 'user/update',
//     method: 'post',
//     data: object
//   })
// }
// export function deleteUser(object) {
//   return request({
//     url: 'user/delete',
//     method: 'post',
//     data: object
//   })
// }

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
  export function getMenuTreeData(){
    return request.request({
      url:"right/loadTreeWithSystemName",
      method:'get'
    })
    
  }