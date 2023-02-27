<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>

    <div class="content">
      <span @click="logOutClick" style="cursor: pointer">退出登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
const logOutClick = () => {
  useUserStore().logout()
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
