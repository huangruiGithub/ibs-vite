<template>
  <div class="department">
    <el-row style="height: 100%">
      <el-col :span="6" style="height: 100%">
        <MainPage card title="部门树">
          <DepartmentTree :edit="true" @getTreeData="getTreeData" />
        </MainPage>
      </el-col>
      <el-col :span="18" style="height: 100%">
        <MainPage card style="margin-left: 0" title="组织架构图">
          <template #title>
            <el-button plain class="topBtn" @click="downloadImg">下 载</el-button>
          </template>
          <OrgChart v-if="show" ref="orgChart" :org-chart-data="orgChartData" />
        </MainPage>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import DepartmentTree from '@/components/DepartmentTree/index.vue'
import OrgChart from './components/orgChart.vue'
import { objAssign } from '@/utils/index'
import { ref, reactive, nextTick } from 'vue'
const orgChart = ref()
const downloadImg = () => {
  orgChart.value.generatorImage()
}
interface DepartmentDataProps {
  children?: DepartmentDataProps[]
  id?: number | null
  label?: string
  company?: boolean
  expand?: boolean
}
let orgChartData: DepartmentDataProps = reactive({
  children: [],
  id: null,
  label: '',
  company: true,
  expand: true
})
const show = ref(true)
const getTreeData = (treeData: any) => {
  objAssign(orgChartData, treeData)
  if (show.value) {
    orgChart.value?.toggleExpand(orgChartData, true)
  }
  show.value = false
  setTimeout(() => {
    show.value = true
    nextTick(() => {
      orgChart.value?.toggleExpand(orgChartData, true)
    })
  }, 100)
}
</script>
<style lang="less" scoped>
.department {
  height: 100%;
}
.topBtn {
  margin-left: 12px;
}
</style>
