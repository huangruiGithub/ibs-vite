<template>
  <el-sub-menu :index="menu.name">
    <template #title>
      <svg-icon :name="menu.meta.icon" color="#fff" class-name="memu-icon"></svg-icon>
      <i :class="menu.icon"></i>
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
.selectActiveColor {
  color: white !important;
}

.sile-menu {
  height: 100%;
  // width: 100%;

  // logo 布局
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 1px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu-vertical {
    // 没有设置100%, 右边会突出（因为子布局比父亲大）
    width: 100%;
    border-right: none;

    // 目录
    .el-submenu {
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        font-size: 20px !important;
        background-color: @side-lighten-bg-color !important;
      }
    }

    // hover 高亮
    .el-menu-item:hover {
      .selectActiveColor(); // 菜单
    }

    .el-menu-item:hover i::before {
      .selectActiveColor(); // 菜单 icon
    }

    .el-submenu__title:hover span {
      .selectActiveColor(); // 目录
    }

    .el-submenu__title:hover i::before {
      .selectActiveColor(); // 目录 icon
    }

    // 二级菜单选中
    .el-menu-item.is-active {
      color: white !important;
      background-color: @side-sel-bg-color !important;
    }
  }
}
.memu-icon {
  padding-right: 5px;
}
</style>
