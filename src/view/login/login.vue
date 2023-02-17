<template>
  <div class="login-container">
    <div class="text">管理系统</div>
    <div class="login">
      <el-form
        ref="form"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="right"
        label-width="70px"
        size="midden"
      >
        <el-form-item prop="account" class="form-item" label="用户名">
          <el-input
            v-model="loginForm.account"
            placeholder="用户名"
            name="account"
            size="midden"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="password" label="密码">
          <el-input
            ref="password"
            v-model="loginForm.password"
            size="midden"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          size="midden"
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
import { useRouter } from 'vue-router'
import { login } from '../../api/user'
const loading = ref(false)
//路由
const redirect = ref()
const currentRoute = reactive(useRouter().currentRoute.value)
const router = reactive(useRouter())
watch(
  useRouter().currentRoute,
  (route) => {
    redirect.value = route.query && route.query.redirect
  },
  { immediate: true },
)
//登录
const loginForm = reactive({
  account: '',
  password: '',
})
const form = ref()
const handleLogin = () => {
  login({
    account: '1',
    password: '1',
  })
  console.log('login')
  form.value.validate((valid: boolean) => {
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
  })
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
