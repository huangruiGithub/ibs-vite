export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
export function ValidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
/**
 * @param {Array} arr
 * @returns {Boolean}
 */
export function ValidFile(arr) {
  return arr.length > 0
}
