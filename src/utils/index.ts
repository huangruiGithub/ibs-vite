import { ElMessage } from 'element-plus'
//把对象B的值赋值给A
export function objAssign(objA: any, objB: any) {
  Object.keys(objA).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(objB, key)) {
      objA[key] = objB[key]
    }
  })
}
////把数组B的值赋值给A
export function arrAssign(arrA: any[], arrB: any[]) {
  arrA.length = 0
  arrB.forEach((item: any) => {
    arrA.push(deepClone(item))
  })
  // let arr: any[] = []
  // arr = arrB.concat([])
  // arr.forEach((item: any) => {
  //   arrA.push(item)
  // })
  // arrA = arrB.concat([])
}
export function deepClone(target: any, hash = new WeakMap()) {
  // 额外开辟一个存储空间WeakMap来存储当前对象
  if (target === null) return target // 如果是 null 就不进行拷贝操作
  if (target instanceof Date) return new Date(target) // 处理日期
  if (target instanceof RegExp) return new RegExp(target) // 处理正则
  if (target instanceof HTMLElement) return target // 处理 DOM元素
  if (typeof target !== 'object') return target // 处理原始类型和函数 不需要深拷贝，直接返回
  // 是引用类型的话就要进行深拷贝
  if (hash.get(target)) return hash.get(target) // 当需要拷贝当前对象时，先去存储空间中找，如果有的话直接返回
  const cloneTarget = new target.constructor() // 创建一个新的克隆对象或克隆数组
  hash.set(target, cloneTarget) // 如果存储空间中没有就存进 hash 里

  Reflect.ownKeys(target).forEach((key) => {
    // 引入 Reflect.ownKeys，处理 Symbol 作为键名的情况
    cloneTarget[key] = deepClone(target[key], hash) // 递归拷贝每一层
  })
  return cloneTarget // 返回克隆的对象
}
export function objCopy(objA: any, objB: any) {
  Object.keys(objB).forEach((key) => {
    objA[key] = objB[key]
  })
}
//复制内容
export function copyClipboard(text: string) {
  // 创建input标签
  const input = document.createElement('input')
  // 将input的值设置为需要复制的内容
  input.value = text
  // 添加input标签
  document.body.appendChild(input)
  // 选中input标签
  input.select()
  // 执行复制
  document.execCommand('copy')
  // 成功提示信息
  ElMessage.success('复制成功!')
  // 移除input标签
  document.body.removeChild(input)
}

//检测图片是否存在
export function imageIsExist(url: string) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = function () {
      resolve(true)
    }
    img.onerror = function () {
      resolve(false)
    }
  })
}
//复制函数
export function copy(text: string) {
  const input = document.createElement('input')
  input.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  const res = document.execCommand('copy')
  document.body.removeChild(input)
  return res
}

// 加
export function floatAdd(arg1: number, arg2: number) {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 减
export function floatSub(arg1: number, arg2: number) {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘
export function floatMul(arg1: number, arg2: number) {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) { }
  try {
    m += s2.split('.')[1].length
  } catch (e) { }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

// 除
export function floatDiv(arg1: number, arg2: number) {
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) { }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) { }

  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

export function getNowMonth() {
  const date = new Date()
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  month = month > 9 ? month : '0' + month
  const nowMonth = year + '-' + month
  return nowMonth
}

/**获取上一个月 */
export function getPreMonth() {
  const arr = getNowMonth().split('-')
  const year = arr[0] //获取当前日期的年份
  const month = arr[1] //获取当前日期的月份

  let year2: string | number = year
  let month2: string | number = parseInt(month) - 1
  if (month2 == 0) {
    //1月的上一月是前一年的12月
    year2 = parseInt(year2) - 1
    month2 = 12
  }

  if (month2 < 10) {
    //10月之前都需要补0
    month2 = '0' + month2
  }
  const preMonth = year2 + '-' + month2
  return preMonth
}
// 获取当前月的下一月
export function getNextMonth() {
  const arr = getNowMonth().split('-')
  const year = arr[0] //获取当前日期的年份
  const month = arr[1] //获取当前日期的月份

  let year2: string | number = year
  let month2: string | number = parseInt(month) + 1
  if (month2 == 13) {
    //12月的下月是下年的1月
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  if (month2 < 10) {
    //10月之前都需要补0
    month2 = '0' + month2
  }

  const nextMonth = year2 + '-' + month2
  return nextMonth
}

/**
 * 一维数组转树形数组
 * @param {array} data 一维数组
 * @param {string} id
 * @param {string} parent_id
 * @param {string} children
 * @returns {array}
 */
// export function toTree(data: any[], id = 'id', parent_id = 'parent_id', children = 'children') {
//   const result: any[] = []
//   if (!Array.isArray(data)) {
//     return result
//   }
//   data.forEach((item) => {
//     delete item[children]
//   })
//   const map = {}
//   data.forEach((item) => {
//     map[item[id]] = item // id为键，原数据每一项为值的map对象
//   })
//   data.forEach((item) => {
//     const parent = map[item[parent_id]] // item的parent_id若与map对象的键相同，则item为父级节点
//     if (parent) {
//       ; (parent[children] || (parent[children] = [])).push(item)
//     } else {
//       result.push(item)
//     }
//   })
//   return result
// }
/**
 * 树形数组转一维数组
 * @param {array} treeObj
 * @param {string} children
 * @returns {array}
 */
export function treeToList(treeObj: any, children = 'children') {
  const res: any[] = [] // 用于存储递归结果（扁平数据）
  // 递归函数
  const fn = (source: any) => {
    source.forEach((el: any) => {
      res.push(el)
      el[children] && el[children].length > 0 ? fn(el[children]) : '' // 子级递归
      delete el[children]
    })
  }
  fn(treeObj)
  return res
}
