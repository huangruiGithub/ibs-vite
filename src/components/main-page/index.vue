<template>
  <div class="main-page">
    <div class="title">
      <span>
        {{ props.title || $route.meta.title }}
      </span>
      <slot name="title"></slot>
    </div>
    <div class="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  contentStyle: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.main-page {
  height: 100%;
  background-color: #eee;
  > .title {
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  > .content {
    height: calc(100% - 64px);
    padding: 0 24px;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
