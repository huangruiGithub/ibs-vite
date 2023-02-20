import Cookies from 'js-cookie'

const TokenKey = 'token'
const SessionId = 'JSESSIONID'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function getSessionId() {
  return Cookies.get(SessionId)
}
export function setToken(token: any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
