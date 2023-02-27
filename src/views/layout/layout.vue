<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '62px' : '240px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>

      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldClick" />
        </el-header>
        <el-container class="page-content">
          <el-main><router-view /></el-main>
        </el-container>
      </el-container>
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
  height: 100%;
}

.main-content,
.page {
  height: 100%;
  .page-header {
    border-bottom: 1px solid #d8dce5;
  }
  .el-header {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5) !important;
  }
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
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

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  background-color: #fff;
  margin: 0;
  padding: 0;
}
</style>
