<template>
  <MainPage title="资产库上报">
    <div class="content">
      <PageMain />
    </div>
  </MainPage>
</template>

<script setup lang="ts">
import PageMain from './PageMain/PageMain.vue'
</script>

<style lang="less" scoped>
.content {
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
  }
}
</style>
