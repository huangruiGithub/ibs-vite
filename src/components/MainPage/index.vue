<template>
  <div class="main-page" :class="card && 'card'">
    <div class="title">
      <span class="title-border">&nbsp;</span>
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
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  contentStyle: {
    type: Object,
    default: () => ({})
  },
  card: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="less" scoped>
.main-page {
  height: 100%;
  &.card {
    height: calc(100% - 20px);
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 12px 0;
    .title {
      height: 54px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding: 0;
      font-size: 20px;
      font-weight: 600;
      > .title-border {
        font-size: 22px;
        padding-right: 4px;
        border-left: 2.5px solid var(--el-color-primary);
      }
    }
    > .content {
      height: calc(100% - 64px);
      padding: 0;
    }
  }

  > .title {
    height: 64px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  > .content {
    height: calc(100% - 64px);
    padding: 0 24px;

    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
    }
  }
}
</style>
