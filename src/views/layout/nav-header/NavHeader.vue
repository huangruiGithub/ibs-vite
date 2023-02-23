<template>
  <div class="nav-header">
    <span @click="logOutClick" style="cursor: pointer">退出登录</span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
const logOutClick = () => {
  useUserStore().logout()
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;

  .menu-icon {
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
