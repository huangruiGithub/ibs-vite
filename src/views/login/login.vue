<template>
  <div class="login-container">
    <div class="text">管理系统</div>
    <div class="login">
      <el-form
        ref="form"
        :rules="rules"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="right"
        label-width="70px"
      >
        <el-form-item prop="account" class="form-item" label="用户名">
          <el-input
            v-model="loginForm.account"
            placeholder="用户名"
            name="account"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="password" label="密码">
          <el-input
            ref="password"
            v-model="loginForm.password"
            show-password
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="loginBtn"
          round
          @click.native.prevent="handleLogin"
        >
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import md5 from 'js-md5'
import { watch, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const loading = ref(false)
//路由
const redirect = ref()
const router = reactive(useRouter())
const route = useRoute()
const userStore = useUserStore()
const rules = {
  account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}
watch(
  useRouter().currentRoute,
  (route) => {
    redirect.value = route.query?.redirect
  },
  { immediate: true }
)
//登录
const loginForm = reactive({
  account: '',
  password: ''
})
const form = ref()
const handleLogin = () => {
  form.value.validate().then(() => {
    userStore
      .login({ ...loginForm, password: md5(loginForm.password) })
      .then(() => {
        router.push('/eoms')
      })
  })

  // if (valid) {
  //   loading.value = true
  //   const data = JSON.parse(JSON.stringify(loginForm))
  //   data.password = md5(data.password)
  //   store
  //     .dispatch('user/login', data)
  //     .then(() => {
  //       store.dispatch('meter/initLevelName')
  //       router.push({ path: redirect.value || '/' })
  //       loading.value = false
  //     })
  //     .catch(() => {
  //       loading.value = false
  //     })
  // } else {
  //   console.log('error submit!!')
  //   return false
  // }
}
</script>
<style lang="scss" scoped>
.login-container {
  background-color: #263039;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 360px;
    }
  }
  .text {
    font-size: 28px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .login {
    margin-bottom: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-form {
      width: 440px;
      .form-item {
        ::v-deep .el-form-item__label {
          color: #fff !important;
        }
      }
    }
    .loginBtn {
      width: 350px;
      margin-left: 70px;
    }
    .el-input {
      width: 350px;
      ::v-deep .el-input__inner {
        border-radius: 28px;
        background-color: #fff !important;
        &.hover {
          background-color: #fff !important;
        }
        &:-webkit-autofill {
          /* //背景色透明  生效时长  过渡效果  启用时延迟的时间 */
          transition: background-color 50000s ease-in-out 0s;
        }
      }
    }
  }
}
</style>
