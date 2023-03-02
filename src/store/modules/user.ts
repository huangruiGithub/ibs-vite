import { defineStore } from 'pinia'
import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import type { RouteMeta } from 'vue-router'
import { ElMessage } from 'element-plus'
import { resetRouter } from '@/router'
import { localCache } from '@/utils/cache'
interface loginInfoType {
  account: string,
  password: string
}
interface uesrInfoType {
  account: string,
  lastLoginTime: string,
  password: string,
  userId: number,
  userName: string,
  roleId?: number
}
interface loginResType {
  token: string,
  updates: any[],
  user: uesrInfoType
}
interface rightsType {
  icon: string,
  alwaysShow: boolean,
  children: rightsType[],
  component: string,
  meta: {
    icon: string,
    image: string,
    noCache: boolean,
    title: string,
  },
  name: string,
  path: string,
  rightType: number,

}

interface stateType {
  token?: string,
  rights: rightsType[],
  userName: string,
  userId: number
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
  state: (): stateType => ({
    token: getToken(),
    rights: localCache.getItem('ibsRouter'),
    userName: localCache.getItem('userName'),
    userId: localCache.getItem('userId')

  }),
  getters: {
  },
  actions: {
    login(userInfo: loginInfoType) {

      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account: account.trim(), password: password })
          .then(async (response: any) => {
            const loginRes: loginResType = response.data
            this.token = String(loginRes.user.roleId)
            this.userName = loginRes.user.userName
            // localStorage.setItem('single_token', encodeURIComponent(response.data.token))
            // localStorage.setItem('account', encodeURIComponent(response.data.user.account))
            // localStorage.setItem('password', encodeURIComponent(response.data.user.password))
            setToken(loginRes.user.userId)
            await this.getInfo()
            resolve(loginRes)
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
            localCache.setItem('ibsRouter', rights)// 存储路由到localStorage
            localCache.setItem('userName', name)// 存储路由到localStorage
            localCache.setItem('userId', id)// 存储路由到localStorage
            this.rights = rights
            console.log(rights, 'rightsrightsrights')
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

    // remove token
    resetToken() {
      return new Promise((resolve) => {
        removeToken() // must remove  token  first
        resetRouter()
        localCache.removeItem('ibsRouter')
        this.$reset()
        resolve('')
      })
    },
    logout() {
      return new Promise((resolve, reject): void => {
        // removeToken()
        logout()
          .then(() => {
            removeToken() // must remove  token  first
            resetRouter()
            localCache.removeItem('ibsRouter')
            this.$reset()
            resolve('')
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  }
})
