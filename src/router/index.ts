import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/layout'
  },{
    path: '/layout',
    component:() => import('@/views/layout/layout.vue')
  },
  {
    path: '/login',
    name: 'login',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import('@/views/login/login.vue')
  },

  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
  //{
  //配置404页面
  //path: '/:catchAll(.*)',
  //name: '404',
  //component: () => import(''),
  //}
]
// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export const resetRouter = () => {
  location.reload()
}
// 导出
export default router 