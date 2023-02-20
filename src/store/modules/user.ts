import { defineStore } from 'pinia'
import { login, getInfo } from '/@/api/user'
import { getToken, setToken, removeToken } from '/@/utils/auth'
import { ElMessage } from 'element-plus'
interface loginInfoType {
  account: string,
  password: string
}


export function setupUser() {
  const userStore = useUserStore()

  // 设置token
  // const token = localCahce.getCache(TOKEN_KEY)
  // token && userStore.setToken(token)

  // // 设置userInfo
  // const user = JSON.parse(localCahce.getCache(USER_INFO_KEY) || '{}')
  // console.log('user=', user)
  // user && userStore.setUserInfo(user)

  // // 设置 userMenus
  // const menus = JSON.parse(localCahce.getCache(USER_MENUS_KEY) || '{}')
  // menus && userStore.setUserMenus(menus)

  // // 设置 userPermission
  // const permissons = JSON.parse(localCahce.getCache(USER_PERMISSION_KEY) || '{}')
  // permissons && userStore.setUserPermission(permissons)

  // // 获取角色/部门
  // useRoleStore().getEntireRoles()
  // useDepartmentStore().getEntireDepartments()
}
export const useUserStore = defineStore({
  id: 'role',
  state: () => ({
    entireRoles: [],
    token: getToken(),
  }),
  getters: {
  },
  actions: {
    login(userInfo: loginInfoType) {

      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account: account.trim(), password: password })
          .then((response: any) => {
            console.log(response,)
            this.token = response.data.user.roleId
            // localStorage.setItem('single_token', encodeURIComponent(response.data.token))
            // localStorage.setItem('account', encodeURIComponent(response.data.user.account))
            // localStorage.setItem('password', encodeURIComponent(response.data.user.password))
            setToken(response.data.user.userId)

            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response: any) => {
            const roles = response.data.roles
            const name = response.data.user.userName
            const id = response.data.user.userId
            const hasUpdateRole = response.data.hasUpdateRole
            const rights = response.data.rights
            // if (hasUpdateRole) {
            //   resetRouter()
            // }
            // roles must be a non-empty array
            if (id !== 1 && (!roles || roles.length <= 0)) {
              ElMessage({
                message: '该用户未设置角色,请联系管理员!',
                type: 'error',
                duration: 5 * 1000
              })
              reject('该用户未设置角色,请联系管理员!')
            }
            resolve(rights)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
  }
})
