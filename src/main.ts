import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './styles/index.less' // global css
import App from './App.vue'
import router from './routes/index'
import store from './store'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
