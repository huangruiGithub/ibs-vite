<template>
  <el-row style="height: 100%">
    <el-col :span="6" style="height: 100%">
      <MainPage card title="菜单树">
        <menuTree :treeData="treeData" :treeProps="defaultTreeProps" />
      </MainPage>
    </el-col>
    <el-col :span="18" style="height: 100%">
      <MainPage card style="margin-left: 0" title="菜单架构图">
        <template #title>
          <el-button plain class="topBtn" @click="downloadImg">下 载</el-button>
        </template>
        <OrgChart ref="orgChartRef" :org-chart-data="orgChartData" />
      </MainPage>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import menuTree from './components/menu-cpns/menuTree.vue'
import OrgChart from './components/orgChart.vue'
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

const orgChartRef = ref<InstanceType<typeof OrgChart>>()
const orgChartData = ref<DepartmentDataProps>({
  children: [],
  id: null,
  label: '',
  system: true,
  expand: true
})

let treeData: Tree[] = reactive([])
getMenuTreeData().then((res) => {
  treeData.push(res.data)
  orgChartData.value = res.data
  orgChartRef.value?.toggleExpand(res.data, true)
})

const downloadImg = () => {
  orgChartRef.value?.generatorImage()
}
</script>

<style lang="less" scoped></style>
