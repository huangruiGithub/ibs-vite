import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './styles/index.less' // global css
import App from './App.vue'
import store from './store'
import router from './router/index'
import { setupRouterGuard } from '/@/router/guard/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { locale })
setupRouterGuard()
app.mount('#app')
