<template>
  <div class="sile-menu">
    <el-menu
      class="el-menu-vertical"
      :unique-opened="false"
      :default-active="currentActiveMenuIndex"
      :collapse="props.collapse"
      background-color="#001529"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <template v-for="menu in menus" :key="menu.id">
        <SubMenu :menu="menu" />
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import SubMenu from './SubMenu.vue'
const route = useRoute()
const router = useRouter()
const currentActiveMenuIndex = ref(route.name as string)
watch(
  () => route.name,
  () => {
    currentActiveMenuIndex.value = route.name as string
  }
)
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
  }
}
.memu-icon {
  padding-right: 5px;
}
</style>
