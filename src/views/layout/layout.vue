<template>
  <div class="main">
    <el-header class="page-header">
      <nav-header @foldChange="handleFoldClick" />
    </el-header>
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '62px' : '240px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import NavMenu from './nav-menu/NavMemu.vue'
import NavHeader from './nav-header/NavHeader.vue'
const isCollapse = ref(false)

const handleFoldClick = (isFold: boolean) => {
  isCollapse.value = isFold
  console.log('isFold=', isCollapse.value)
}
</script>

<style scoped lang="less">
@import '@/styles/_var.less';

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  .el-header {
    background-color: #0062ff;
    height: 64px !important;
  }
}

.main-content {
  height: calc(100vh - 64px);
  .el-main {
    background-color: #fff;
    margin: 0;
    padding: 0;
    height: calc(100vh - 64px);
    // overflow: hidden;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: @side-bg-color;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  height: calc(100vh - 64px);

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
