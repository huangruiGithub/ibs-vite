<template>
  <div class="sile-menu">
    <el-menu
      class="el-menu-vertical"
      :unique-opened="false"
      :default-active="currentActiveMenuIndex"
      :collapse="props.collapse"
      background-color="#001529"
      text-color="#eee"
      active-text-color="#fff"
    >
      <template v-for="menu in menus" :key="menu.id">
        <!-- 1.只有一级菜单  -->
        <!-- <el-menu-item
          v-if="!(menu.children && menu.children.length)"
          :index="menu.name"
          @click="handleItemClick(menu)"
        >
          <svg-icon :name="menu.meta.icon" color="#fff" class-name="memu-icon"></svg-icon>
          <i :class="menu.meta.icon"></i>
          这个标签不能删，折叠效果需要菜单需要
          <span>{{ menu.meta.title }}</span>
        </el-menu-item> -->

        <!-- 2.包含二级菜单 -->
        <!-- <SubMenu v-else :menu="menu" /> -->
        <el-sub-menu :index="menu.name">
          <template #title>
            <el-icon size="22px">
              <svg-icon :name="menu.meta.icon" color="#fff" class-name="memu-icon"></svg-icon>
            </el-icon>

            <span>{{ menu.meta.title }}</span>
          </template>
          <template v-for="cmenu in menu.children" :key="cmenu.id">
            <el-menu-item :index="cmenu.name" @click="handleItemClick(cmenu)">
              {{ cmenu.meta.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import SubMenu from './SubMenu.vue'
const currentActiveMenuIndex = ref('')
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const menus = useUserStore().rights
const handleItemClick = (menu: any) => {
  router.push({ name: menu.name })
}
const logoClick = () => {
  console.log()
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
