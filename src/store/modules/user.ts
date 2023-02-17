import { defineStore } from 'pinia'
import { login } from '/@/api/user'
interface loginInfoType {
  loginName: string,
  password: string
}
export const setupUser = defineStore({
  id: 'role',
  state: () => ({
    entireRoles: []
  }),
  getters: {
  },
  actions: {
    login(userInfo: loginInfoType) {

      const { loginName, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account: loginName.trim(), password: password })
          .then((response: any) => {
            // commit('SET_TOKEN', response.data.user.roleId)
            // localStorage.setItem('single_token', encodeURIComponent(response.data.token))
            // localStorage.setItem('account', encodeURIComponent(response.data.user.account))
            // localStorage.setItem('password', encodeURIComponent(response.data.user.password))
            // setToken(response.data.user.userId)
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    }
  }
})
