<template>
  <el-sub-menu :index="menu.name">
    <template #title>
      <el-icon size="22px" v-if="menu.meta.icon">
        <svg-icon :name="menu.meta.icon" color="#fff" class-name="memu-icon"></svg-icon>
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-for="cmenu in menu.children" :key="cmenu.id">
      <SubMenu v-if="cmenu.children?.length" :menu="cmenu" />
      <el-menu-item v-else :index="cmenu.name" @click="handleItemClick(cmenu)">
        {{ cmenu.meta.title }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>
<script setup lang="ts" name="SubMenu">
import router from '@/router'
defineProps<{ menu: any }>()
const handleItemClick = (menu: any) => {
  router.push({ name: menu.name })
}
</script>
<style scoped lang="less">
@import '@/styles/_var.less';
// 混合

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
  }

  .el-menu-item:hover {
    color: #fff;
    background-color: var(--el-color-primary);
  }

  .el-menu-item.is-active {
    background-color: var(--el-color-primary);
  }
}
.memu-icon {
  padding-right: 5px;
}
</style>
