<template>
  <div class="content">
    <div class="search">
      <span>接口名称：</span>
      <el-input
        v-model="filterData.endpointName"
        style="width: 240px; margin-right: 12px"
        placeholder="请输入接口名称"
      ></el-input>
      <span>工具名称：</span>
      <el-input
        v-model="filterData.testToolName"
        style="width: 240px; margin-right: 12px"
        placeholder="请输入攻击工具名称"
      ></el-input>
      <span>协议类型：</span>
      <el-select
        v-model="filterData.protocolType"
        placeholder="请选择"
        style="line-height: 40px"
        clearable
      >
        <el-option
          v-for="item in options.apiTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="getTableData">搜索</el-button>

      <el-button type="primary" style="margin-left: auto" @click="command('')"
        >新增</el-button
      >
      <el-button type="danger" @click="batchDeleteClick">批量删除</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <!-- <template #files="slotProps">
          <el-link
            v-if="slotProps.row.files.path"
            type="primary"
            :underline="false"
            @click="fileDownloadClick(slotProps.row.files)"
          >
            下载附件
          </el-link>
        </template> -->
        <template #operation="slotProps">
          <!-- <el-link type="primary" :underline="false" @click="previewClick(slotProps.row)">查看</el-link> -->
          <el-link
            type="primary"
            :underline="false"
            @click="editClcik(slotProps.row)"
            >修改</el-link
          >

          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            :disabled="!!slotProps.row.status"
            icon="el-icon-info"
            icon-color="red"
            :title="`确定删除${slotProps.row.endpointName}吗？`"
            @confirm="delClick(slotProps.row.endpointId)"
          >
            <el-link
              slot="reference"
              type="primary"
              style="margin-left: 12px"
              :underline="false"
              @click="tipDelete(slotProps.row)"
            >
              删除
            </el-link>
          </el-popconfirm>
        </template>
      </FormTable>
      <!-- <DetailForms ref="detailForms" :options="options" @saved="getTableData" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
// import DetailForms from './DetailForms'
import {
  loadEndpointTableData,
  deleteThreePartyEndpoint,
  getProtocolList
} from '@/api/resource-management'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { download } from '@/api/resource-management'
// import { fileDownload } from '@/utils/download.js'
import type { tableLabelType } from '@/components/form-table/type'
import _ from 'loadsh'
// 过滤
interface filterDataType {
  testToolName?: string
  endpointName?: string
  protocolType?: string | number
}
const filterData = reactive<filterDataType>({
  testToolName: '',
  endpointName: '',
  protocolType: ''
})

// 获取数据
const formTable = ref()
const tableData = ref([])
const paginationData = reactive({ currentPage: 1, pageSize: 10 })
const tableTotalSize = ref(0)
const options: { apiTypeOptions: { label: string; value: number | string }[] } =
  reactive({
    apiTypeOptions: []
  })
const isLoading = ref(false)
const getTableData = _.throttle(() => {
  isLoading.value = true
  filterData.protocolType =
    filterData.protocolType === '' ? undefined : filterData.protocolType
  loadEndpointTableData({
    params: {
      type: 1,
      ...filterData
    },
    sort: {},
    ...paginationData
  })
    .then((data: any) => {
      tableData.value = data.data
      tableTotalSize.value = data.totalCount
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    })
}, 2000)
getProtocolList({ type: 1 }).then((res: any) => {
  options.apiTypeOptions = res.data.map(
    ({
      description,
      protocolTypeId
    }: {
      description: string
      protocolTypeId: string
    }) => ({
      label: description,
      value: protocolTypeId
    })
  )
})
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
    ElMessageBox.confirm('确认要批量删除吗', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      console.log('删除', selectItems.value)
      const endpointIds = selectItems.value.map(
        ({ endpointId }: { endpointId: number }) => endpointId
      )
      deleteThreePartyEndpoint({ endpointIds }).then(() => {
        if (
          tableData.value.length === endpointIds.length &&
          paginationData.currentPage !== 1
        ) {
          paginationData.currentPage--
        }
        getTableData()
        ElMessage.success('删除成功！')
      })
    })
  } else {
    ElMessage.warning('请至少选择一条数据')
  }
}

// 删除
const delClick = (endpointId: any) => {
  deleteThreePartyEndpoint({ endpointIds: [endpointId] }).then(() => {
    if (tableData.value.length === 1 && paginationData.currentPage !== 1) {
      paginationData.currentPage--
    }
    getTableData()
    ElMessage.success('删除成功！')
  })
}

const tipDelete = (row: any) => {
  if (row.status) {
    ElMessageBox.confirm('该数据已上报，将会远程同步删除，确认删除？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delClick(row.endpointId)
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

// const fileDownloadClick = (file) => {
//   const path = file.path
//   const fileName = file.fileName
//   download({ files: [{ path, fileName }] }).then((res) => {
//     fileDownload(res)
//   })
// }
// 查看
// const previewClick = (data) => {
//   const fromData = _.cloneDeep(data)
//   detailForms.value.showPreview(fromData)
// }
// 表格配置
const tableLabel = computed((): tableLabelType[] => [
  {
    type: 'selection',
    align: 'center'
  },
  {
    prop: 'endpointName',
    label: '接口名称'
  },
  {
    prop: 'testToolName',
    label: '工具名称',
    valueFormat(scope: any, label: any) {
      return (
        scope.row[label.prop]?.reduce(
          (total: any, item: any) => total + `<div>${item}</div>`,
          ''
        ) ?? ''
      )
    }
  },
  {
    prop: 'protocolType',
    label: '协议类型',
    type: 'selectValue',
    selectOptions: options.apiTypeOptions
  },
  {
    prop: 'path',
    label: '接口地址'
  },
  {
    prop: 'description',
    label: '接口描述'
  }
  // {
  //   prop: 'files',
  //   type: 'slot',
  //   label: '接口文档'
  // },
  // {
  //   prop: 'operation',
  //   type: 'slot',
  //   width: 180,
  //   label: '操作'
  // }
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
