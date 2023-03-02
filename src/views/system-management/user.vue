<template>
  <el-row style="height: 100%; margin: 0; padding: 0">
    <el-col :span="6" style="height: 100%">
      <MainPage card title="组织树">
        <DepartmentTree :edit="true" @nodeClick="getTableData" />
      </MainPage>
    </el-col>
    <el-col :span="18" style="height: 100%">
      <MainPage title="用户列表" card style="margin-left: 0">
        <div class="content">
          <div class="search">
            <span>用户名称/登录名：</span>
            <el-input
              v-model="filterData.userName"
              style="width: 240px; margin-right: 12px"
              placeholder="请输入接口名称"
            ></el-input>
            <el-button type="primary" @click="getTableData()">搜索</el-button>

            <el-button type="primary" style="margin-left: auto" @click="command('')">新增</el-button>
          </div>
          <div v-loading="isLoading" class="table-wrap">
            <FormTable
              ref="formTable"
              :table-label="tableLabel"
              :table-data="tableData"
              v-model:current-page="paginationData.currentPage"
              v-model:page-size="paginationData.pageSize"
              :table-total-size="tableTotalSize"
              pagination
              selection
              @paginationChange="getTableData"
            >
              <template #operation="slotProps">
                <el-link v-if="slotProps.row.userId !== 1" :underline="false" type="primary">编辑</el-link>
                <el-link :underline="false" type="primary" class="operatingBtn">重置密码</el-link>
                <el-link
                  v-if="slotProps.row.userId !== 1 && slotProps.row.userId !== userStore?.userId"
                  :underline="false"
                  type="primary"
                  style="color: red"
                  class="operatingBtn"
                  @click="deleteClick(slotProps.row)"
                >
                  删除
                </el-link>
              </template>
            </FormTable>
            <!-- <DetailForms ref="detailForms" :options="options" @saved="getTableData" /> -->
          </div>
        </div>
      </MainPage>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import DepartmentTree from '@/components/DepartmentTree/index.vue'
// import DetailForms from './DetailForms'
import { getUser, deleteUser } from '@/api/system-management'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type { tableLabelType } from '@/components/FormTable/type'
import _ from 'loadsh'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
// 过滤
interface filterDataType {
  userName?: string
}
const filterData = reactive<filterDataType>({
  userName: ''
})

// 获取数据
const formTable = ref()
const tableData = ref([])
const paginationData = reactive({ currentPage: 1, pageSize: 10 })
const tableTotalSize = ref(0)
const options: { apiTypeOptions: { label: string; value: number | string }[] } = reactive({
  apiTypeOptions: []
})
const getTreeData = (treeData: any) => {
  // objAssign(orgChartData, treeData)
  // if (show.value) {
  //   orgChart.value?.toggleExpand(orgChartData, true)
  // }
  // show.value = false
  // setTimeout(() => {
  //   show.value = true
  //   nextTick(() => {
  //     orgChart.value?.toggleExpand(orgChartData, true)
  //   })
  // }, 100)
}
const isLoading = ref(false)
const getTableData = _.throttle((data?: any) => {
  isLoading.value = true
  const departmentId = data?.id === 100 ? undefined : data?.id
  getUser({
    params: {
      departmentId,
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
getTableData()

// 新增
const detailForms = ref()
const command = (typeValue: any) => {
  detailForms.value.show('add', typeValue)
}

// 删除
// const delClick = (endpointId: any) => {
//   deleteThreePartyEndpoint({ endpointIds: [endpointId] }).then(() => {
//     if (tableData.value.length === 1 && paginationData.currentPage !== 1) {
//       paginationData.currentPage--
//     }
//     getTableData()
//     ElMessage.success('删除成功！')
//   })
// }

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
const deleteClick = (row: any) => {
  ElMessageBox.confirm('此操作将永久删除' + row.userName + '用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteUser({ userId: row.userId }).then(() => {
        ElNotification({
          type: 'success',
          message: '删除成功!'
        })
        getTableData()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
// 表格配置
const tableLabel = computed((): tableLabelType[] => [
  {
    prop: 'userId',
    label: '用户ID'
  },
  {
    prop: 'account',
    label: '登录账号'
  },
  {
    prop: 'userName',
    label: '用户名称'
  },
  {
    prop: 'departmentName',
    label: '部门'
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
