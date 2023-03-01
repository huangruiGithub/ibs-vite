<template>
  <div class="sys-menu">
    <div class="left comm-border">
      <div class="left-hd">
        <div class="comm-title">
          <span class="line"></span>
          <span class="title">菜单树</span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="left-bd">
        <menuTree :treeData="treeData" :treeProps="defaultTreeProps" />
      </div>
    </div>
    <div class="right comm-border">
      <div class="right-hd">
        <div class="comm-title">
          <span class="line"></span>
          <span class="title">菜单架构图</span>
          <div class="btns"><el-button size="small">下载</el-button></div>
        </div>
      </div>
      <div class="right-bd">
        <OrgChart ref="orgChartRef" :org-chart-data="orgChartData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { objAssign } from '@/utils/index'
import menuTree from './components/menu-cpns/menuTree.vue'
import orgChart from './components/orgChart.vue'
import { getMenuTreeData } from '@/api/system-management'

interface DepartmentDataProps {
  children?: DepartmentDataProps[]
  id?: number | null
  label?: string
  system?: boolean
  expand?: boolean
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const defaultTreeProps = {
  id: 'id',
  children: 'children',
  label: 'label'
}

const orgChartRef = ref(null)
let orgChartData: DepartmentDataProps = reactive({
  children: [],
  id: null,
  label: '',
  system: true,
  expand: true
})

let treeData: Tree[] = reactive([])
getMenuTreeData().then((res) => {
  treeData.push(res.data)
})
</script>

<style lang="less" scoped>
.sys-menu {
  display: flex;
  flex-shrink: 0;
  margin: 8px;
  .left {
    width: 300px;
    height: calc(100vh - 64px);
    margin-right: 8px;
    padding: 16px;
    box-sizing: border-box;
    .left-hd {
      padding-bottom: 8px;
      border-bottom: 1px solid #dcdfe6;
    }
    .left-bd {
      margin-top: 8px;
    }
  }
  .right {
    flex: 1;
    margin-left: 8px;
    padding: 16px;
    box-sizing: border-box;
    .right-hd {
      padding-bottom: 8px;
      border-bottom: 1px solid #dcdfe6;
      .btns {
        margin-left: 24px;
      }
    }
  }

  .comm-border {
    box-sizing: border-box;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  }
  .comm-title {
    display: flex;
    align-content: center;
    .line::after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 100%;
      margin-right: 16px;
      background-color: var(--primary-color);
    }
    .title {
      font-weight: 600;
    }
  }
}
</style>
