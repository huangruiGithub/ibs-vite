import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '/@/store/modules/user'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '/@/utils/auth' // get token from cookie
import getPageTitle from '/@/utils/get-page-title'
// const _import = require('./router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from '/@/views/layout/layout.vue' // Layout 是架构组件，不在后台返回，在文件里单独引入
import error from '/@/views/404page/index.vue'
import { localCache } from '/@/utils/cache'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 路由守卫 - 监听授权页面的授权
 * @param router 路由对象z
 */

let routes: any = null // 用来获取后台拿到的路由
const whiteList = ['/login'] // no redirect whitelist
export const createPermissionGuard = (router: Router): void => {

  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta?.title)
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next()
        NProgress.done()
      } else {
        try {
          if (!routes) {
            const LocalStotageRouter = localCache.getItem('ibsRouter')
            if (LocalStotageRouter) {
              routes = LocalStotageRouter // 拿到路由
              routerGo(to, next, router) // 执行路由跳转方法
            } else {
              await useUserStore().getInfo()
              routerGo(to, next, router) // 执行路由跳转方法
            }
          } else {
            next()
          }
        } catch (error) {
          // remove token and go to login page to re-login
          console.error(error)
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')y
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })
  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
}

function routerGo(to: any, next: any, router: Router) {
  const page404 = { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
  routes = filterAsyncRouter(routes) // 过滤路由
  routes.push(page404)
  for (const item of routes) {
    router.addRoute(item)
  }
  next({ ...to, replace: true })
}



function filterAsyncRouter(asyncRouterMap: any) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route: any) => {
    if (route.component) {
      if (route.component === 'Layout') {
        // Layout组件特殊处理
        route.component = Layout
      } else {
        try {
          route.component = () => import(`../../views/${route.component}.vue`)

        } catch {
          route.component = error
        }
      }
    } else {
      route.component = {
        template: ''
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
