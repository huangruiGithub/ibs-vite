<template>
  <div class="content">
    <div class="search">
      <el-input v-model="keyWord" style="width: 240px" placeholder="请输入资产名称"></el-input>

      <el-button type="primary" @click="getTableData">搜索</el-button>
      <!-- <BatchImport type="knowledgebaseAsset" @successed="getTableData" /> -->
      <el-button type="primary" style="margin-left: auto" @click="command('')">新增</el-button>
    </div>
    <div class="selectdDiv">
      <i class="el-icon-info" />
      <div>
        已选择
        <span>{{ selectItems.length }}</span>
        条
      </div>
      <el-divider direction="vertical"></el-divider>
      <el-button type="text" @click="batchDeleteClick">批量删除</el-button>
    </div>
    <div v-loading="isLoading" class="table-wrap">
      <FormTable
        ref="formTable"
        :table-label="tableLabel"
        :table-data="tableData"
        :current-page.sync="paginationData.currentPage"
        :page-size.sync="paginationData.pageSize"
        :table-total-size="tableTotalSize"
        pagination
        selection
        @paginationChange="getTableData"
        @filter-change="filterChange"
        @selection-change="handleSelectionChange"
      >
        <template #operation="slotProps">
          <!-- <el-link type="primary" :underline="false" @click="previewClick(slotProps.row)">查看</el-link> -->
          <!-- <el-link type="primary" :underline="false" @click="editClcik(slotProps.row)">编辑</el-link> -->

          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            :disabled="!!slotProps.row.status"
            icon="el-icon-info"
            icon-color="red"
            :title="`确定删除${slotProps.row.name}吗？`"
            @confirm="delClick(slotProps.row.id)"
          >
            <!-- <el-link
              slot="reference"
              type="primary"
              style="margin-left: 12px"
              :underline="false"
              @click="tipDelete(slotProps.row)"
            >
              删除
            </el-link> -->
          </el-popconfirm>
        </template>
      </FormTable>
      <DetailForms ref="detailForms" :options="options" @saved="getTableData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import DetailForms from './DetailForms.vue'
// import BatchImport from '@/views/data-reporting-management/components/BatchImport'
import { loadKnowledgebaseAssetGrid, deleteKnowledgebaseAsset } from '@/api/data-reporting-management'
import { ElMessage, ElMessageBox } from 'element-plus'
import _ from 'loadsh'
import enumData from '@/views/data-reporting-management/enum'

// 过滤
const filterData = reactive({})
const filterChange = (tableFilterData: any) => {
  Object.assign(filterData, tableFilterData)
  console.log(filterData, 'filterData')
  paginationData.currentPage = 1
  getTableData()
}

// 获取数据
const formTable = ref()
const keyWord = ref('')
const tableData = ref([])
const filters = reactive({
  // typeList: enumData.typeList.map(({ label, value }) => ({ text: label, value }))
})
console.log(filters)
const paginationData = reactive({ currentPage: 1, pageSize: 10 })
const tableTotalSize = ref(0)
const options = reactive({
  assetTypeList: enumData.assetTypeList,
  sourceDeptList: enumData.sourceDeptList,
  statusList: enumData.statusList,
  applicationAreaList: enumData.applicationAreaList,
  sourceDevList: enumData.sourceDevList,
  equipmentTypeList: enumData.equipmentTypeList,
  systemTypeList: enumData.systemTypeList,
  assetStatusList: enumData.assetStatusList
})
const isLoading = ref(false)
const getTableData = _.throttle(() => {
  isLoading.value = true
  loadKnowledgebaseAssetGrid({
    params: { ...filterData, name: keyWord.value },
    sort: {},
    ...paginationData
  })
    .then(({ data }) => {
      tableData.value = data.data
      tableTotalSize.value = data.totalCount
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 200)
    })
}, 1000)
getTableData()

// 新增
const detailForms = ref()
const command = (typeValue: any) => {
  detailForms.value.show('add', typeValue)
}
// 批量删除
const selectItems = ref([])
const handleSelectionChange = (val: any) => {
  selectItems.value = val
}
const batchDeleteClick = () => {
  if (selectItems.value.length > 0) {
    // 查询是否有上报
    const notEscalation = selectItems.value.every(({ status }) => status === 0)
    const tip = notEscalation ? '确认要批量删除吗' : '存在已上报的数据，将会远程同步删除，确认删除？'
    ElMessageBox.confirm(tip, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      console.log('删除', selectItems.value)
      const ids = selectItems.value.map(({ id }) => id)
      deleteKnowledgebaseAsset({ ids }).then(() => {
        if (tableData.value.length === ids.length && paginationData.currentPage !== 1) {
          paginationData.currentPage--
        }
        getTableData()
      })
    })
  } else {
    ElMessage.warning('请至少选择一条数据')
  }
}

// 删除
const delClick = (id: any) => {
  deleteKnowledgebaseAsset({ ids: [id] }).then(() => {
    if (tableData.value.length === 1 && paginationData.currentPage !== 1) {
      paginationData.currentPage--
    }
    getTableData()
  })
}

const tipDelete = (row: any) => {
  if (row.status) {
    ElMessageBox.confirm('该数据已上报，将会远程同步删除，确认删除？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delClick(row.id)
    })
  }
}
// 修改
const editClcik = (data: any) => {
  if (data.status) {
    ElMessageBox.confirm('该数据已上报，将会远程同步修改，确认修改？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const fromData = _.cloneDeep(data)
      detailForms.value.show('edit', fromData)
    })
  } else {
    const fromData = _.cloneDeep(data)
    detailForms.value.show('edit', fromData)
  }
}
// 查看
const previewClick = (data: any) => {
  const fromData = _.cloneDeep(data)
  detailForms.value.showPreview(fromData)
}
// 表格配置
const tableLabel = computed(() => [
  {
    type: 'selection',
    align: 'center'
  },
  {
    prop: 'assetCode',
    label: ' 资产编号'
  },
  {
    prop: 'name',
    label: '资产名称'
  },
  {
    prop: 'ip',
    label: ' 资产IP'
  },
  {
    prop: 'type',
    label: '资产类型',
    type: 'selectValue',
    selectOptions: options.assetTypeList
  },
  {
    prop: 'assetStatus',
    label: '设备状态',
    type: 'selectValue',
    selectOptions: options.assetStatusList
  },
  {
    prop: 'equipmentType',
    label: '工业设备类型',
    type: 'selectValue',
    selectOptions: options.equipmentTypeList
  },
  {
    prop: 'createTime',
    label: '创建时间'
  },
  {
    prop: 'status',
    label: '状态标识',
    type: 'selectValue',
    selectOptions: options.statusList
  },
  {
    prop: 'sourceDept',
    label: '来源单位',
    type: 'selectValue',
    selectOptions: options.sourceDeptList
  },
  {
    prop: 'sourceDev',
    label: '来源设备/系统',
    type: 'selectValue',
    selectOptions: options.sourceDevList
  },
  {
    prop: 'operation',
    type: 'slot',
    width: 180,
    label: '操作'
  }
])
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
