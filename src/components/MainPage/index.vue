<template>
  <div class="main-page" :class="card && 'card'">
    <div class="title">
      <span class="title-border">&nbsp;</span>
      <span style="padding-right: 12px">
        {{ props.title || $route.meta.title }}
      </span>
      <slot name="title"></slot>
    </div>
    <div class="main" :style="contentStyle">
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
  min-height: 400px;
  overflow-y: hidden;
  &.card {
    height: calc(100% - 20px);
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 12px 0;
    box-shadow: var(--el-box-shadow-light);
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
    > .main {
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
  > .main {
    height: calc(100% - 64px);
    padding: 0 24px;

    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
    }
    > :deep(.content) {
      height: 100%;
      display: flex;
      flex-direction: column;

      .search {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        .el-input {
          width: 200px;
        }
        .el-button {
          margin-left: 12px;
        }
        .add-btn {
          margin-left: auto;
        }
      }

      .selectdDiv {
        height: 40px;
        background: #e6f7ff;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid #91d5ff;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .el-icon-info {
          margin-left: 16px;
          color: #0062ff;
        }
        div {
          margin-left: 8px;
          color: rgba(0, 0, 0, 0.65);
          span {
            color: #0062ff;
          }
        }
      }
      .blue {
        color: #0062ff;
      }
      .table-wrap {
        flex: 1;
        min-height: 200px;
        overflow-y: hidden;
      }
    }
  }
}
</style>
