import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './styles/index.less' // global css
import App from './App.vue'
import store from './store'
import router from './router/index'
import { setupRouterGuard } from '@/router/guard/index'
import FormTable from '@/components/form-table/index.vue'
import MainPage from '@/components/main-page/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import vue3TreeOrg from 'vue3-tree-org';
import "vue3-tree-org/lib/vue3-tree-org.css";

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { locale })
app.use(vue3TreeOrg)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('MainPage', MainPage)
app.component('FormTable', FormTable)
setupRouterGuard()
app.mount('#app')
