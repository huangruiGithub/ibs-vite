<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon>
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="logo">
      <img class="img" src="https://cn.vitejs.dev/logo.svg" alt="logo" />
      <span class="title">Vue3-TypeScript-Vite</span>
    </div>
    <div class="content">
      <div class="info">
        <el-icon><UserFilled /></el-icon>

        <span class="user" @click="editPasswordClick">{{ userStore.userName }}</span>
        <el-icon><SwitchButton /></el-icon>
        <span @click="logOutClick" style="cursor: pointer">退出登录</span>
        <EditPassword v-if="showEditPassword" ref="editPassword" @closeEditPassword="closeEditPassword" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessageBox } from 'element-plus'
import EditPassword from './EditPassword.vue'
const showEditPassword = ref(false)
const userStore = useUserStore()
const logOutClick = () => {
  ElMessageBox.confirm('是否退出登录', '提示').then(() => {
    useUserStore().logout()
  })
}

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

// 1.记录状态
const isFold = ref(false)
function handleMenuIconClick() {
  // 1.内部改变状态
  isFold.value = !isFold.value

  // 2.将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
//编辑密码相关
const editPassword = ref()
const editPasswordClick = () => {
  showEditPassword.value = true
  nextTick(() => {
    editPassword.value.is()
  })
}
const closeEditPassword = () => {
  showEditPassword.value = false
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  color: #fff;
  .logo {
    display: flex;
    height: 28px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .menu-icon {
    font-size: 24px;
    margin-right: 10px;
    cursor: pointer;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 18px;
    .info {
      margin-left: auto;
      display: flex;
      align-items: center;
      .el-icon {
        font-size: 18px;
        margin: 0 5px;
      }
      .user {
        padding: 0 20px 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
