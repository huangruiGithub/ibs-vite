<template>
  <MainPage title="用户列表" card style="margin-left: 0">
    <div class="content">
      <div class="search">
        <span>角色名称：</span>

        <el-input v-model="search.roleName" placeholder="请输入" class="searchInput" />
        <el-button v-blur type="primary" class="topBtn" @click="searchClick">搜索</el-button>
        <el-button v-blur type="primary" class="topBtn" @click="alertForm('add', null)">新增</el-button>
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
        <SetRole v-if="pageType !== 'index'" ref="setRole" @closeForm="closeForm" @submitForm="submitForm" />
      </div>
    </div>
  </MainPage>
</template>

<script setup lang="ts">
import { getRole, deleteRole, addRole, updateRole } from '@/api/system-management'
import SetRole from './components/setRole.vue'
import { nextTick, ref, reactive } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
let pageType = ref('index')
const setRole = ref()
const alertForm = async (type: string, row: any) => {
  pageType.value = type
  await nextTick(() => {
    setRole.value.is(pageType.value, row)
  })
}
const closeForm = () => {
  pageType.value = 'index'
}
const submitForm = (type: string, row: any) => {
  if (type === 'add') {
    addRole(row).then(() => {
      ElNotification({
        title: '成功',
        message: '新增角色成功',
        type: 'success'
      })
      closeForm()
      myTable.value.getTableData()
    })
  }
  if (type === 'edit') {
    updateRole(row).then(() => {
      ElNotification({
        title: '成功',
        message: '修改角色成功',
        type: 'success'
      })
      closeForm()
      myTable.value.getTableData()
    })
  }
}
const deleteClick = (row: any) => {
  ElMessageBox.confirm('确认要删除' + row.roleName + '角色?此操作会同时删除用户配置的角色并不可恢复!', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteRole(row.roleId).then(() => {
      ElNotification({
        title: '成功',
        message: '删除角色成功',
        type: 'success'
      })
      myTable.value.getTableData()
    })
  })
}
//表格相关
const myTable = ref()
const search = ref({ roleName: '' })
let searchData: {
  pageSize: number
  currentPage: number
  sort: {}
  params: {
    roleName?: any
  }
} = reactive({
  pageSize: 10,
  currentPage: 1,
  sort: {},
  params: {}
})
let tableLabel = [
  {
    prop: 'roleId',
    label: '角色ID',
    width: 300
  },
  {
    prop: 'roleName',
    label: '角色名称',
    width: 300,
    showOverflowTooltip: false
  },
  {
    prop: 'remark',
    label: '角色描述',
    showOverflowTooltip: true
  },
  {
    prop: 'operating',
    label: '操作',
    fixed: 'right',
    type: 'scope',
    width: 150,
    minWidth: 150,
    showOverflowTooltip: false
  }
]
let tableTotalSize = ref(0)
let currentRow = ref({})
const isLoading = ref(false)
const getTableData = (cab: any) => {
  isLoading.value = true
  getRole(searchData)
    .then((res: any) => {
      tableTotalSize.value = res.data.totalCount
    })
    .finally(() => {
      isLoading.value = false
    })
}
const currentChange = (val: any) => {
  currentRow.value = val
}
const searchClick = () => {
  searchData.currentPage = 1
  searchData.params['roleName'] = search.value.roleName
  myTable.value.getTableData()
}
</script>

<style lang="less" scoped></style>
