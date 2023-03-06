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

            <el-button type="primary" style="margin-left: auto" @click="alertForm('add')">新增</el-button>
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
              @row-click="rowClick"
              @paginationChange="getTableData"
            >
              <template #operation="slotProps">
                <el-link
                  v-show="slotProps.userId !== 1"
                  :underline="false"
                  type="primary"
                  style="padding-right: 10px"
                  @click="alertForm('edit', slotProps.row)"
                >
                  编辑
                </el-link>
                <el-link :underline="false" type="primary" @click="dialogVisible = true">重置密码</el-link>
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
          </div>
        </div>
      </MainPage>
      <el-dialog v-model="dialogVisible" title="新密码发送方式" width="35%">
        <div v-if="!resetSuccess">
          <el-row style="margin: 50px">
            <!-- <el-col :span="12">
            <div :class="resetClass[0]" @click="setResetCSS(0)">通过邮件发送</div>
          </el-col> -->
            <el-col :span="12" style="margin-left: 22%">
              <div :class="resetClass[1]" @click="setResetCSS(1)">自行告知用户</div>
            </el-col>
          </el-row>
        </div>

        <div v-if="resetSuccess">
          <el-row style="margin: 50px" :gutter="40">
            <el-col :span="8" align="right">
              <p style="font-size: 18px">账号：</p>
              <p style="font-size: 18px">新密码：</p>
            </el-col>
            <el-col :span="16">
              <p style="font-size: 18px">{{ newAccount }}</p>
              <p style="font-size: 18px">{{ newPassword }}</p>
            </el-col>
          </el-row>
          <p style="font-size: 18px; margin-left: 250px">请将新密码记录并告知用户</p>
        </div>
        <template #footer>
          <div v-if="!resetSuccess">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="resetPasswordClick">重 置</el-button>
          </div>
          <div v-if="resetSuccess">
            <el-button @click="closeSuccessDialog">关 闭</el-button>
          </div>
        </template>
      </el-dialog>
      <SetUser v-if="pageType !== 'index'" ref="setUser" @submitForm="submitForm" @closeForm="closeForm()" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, computed, ref, nextTick, onMounted } from 'vue'
import DepartmentTree from '@/components/DepartmentTree/index.vue'
import SetUser from './components/setUser.vue'
import md5 from 'js-md5'
// import DetailForms from './DetailForms'
import {
  getUser,
  deleteUser,
  addUser,
  updateUser,
  sendUserPasswordEmail,
  resetPassword
} from '@/api/system-management'
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
const isLoading = ref(false)
let currentRow = ref()
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

const rowClick = (val: any) => {
  console.log(val)
  currentRow.value = val
}
//--表单相关
const pageType = ref('index')
const setUser = ref()
const alertForm = (type: string, row?: any) => {
  pageType.value = type
  nextTick(() => {
    setUser.value.is(pageType.value, row)
  })
}
const submitForm = (type: string, data: any, informType: string, originalPassword: string) => {
  if (type === 'add') {
    addUser(data).then((res: any) => {
      if (informType === 'self') {
        dialogVisible.value = true
        resetSuccess.value = true
        newAccount.value = data.account
        newPassword.value = originalPassword
      }
      if (informType === 'email') {
        sendUserPasswordEmail({ userId: res.id }).then(() => {
          ElNotification({
            title: '成功',
            message: '已发送邮件',
            type: 'success'
          })
        })
      }
      ElNotification({
        title: '成功',
        message: '新增用户成功',
        type: 'success'
      })
      closeForm()
    })
  }
  if (type === 'edit') {
    updateUser(data).then(() => {
      ElNotification({
        title: '成功',
        message: '修改用户成功',
        type: 'success'
      })
      closeForm()
    })
  }
}
const closeForm = () => {
  pageType.value = 'index'
  getTableData()
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

//--重置密码
const dialogVisible = ref(false)
const resetSuccess = ref(false)
const newAccount = ref('')
const newPassword = ref('')
let resetClass = reactive(['resetBox', 'resetBox'])
// 关闭重置成功弹窗
const closeSuccessDialog = () => {
  dialogVisible.value = false
  setTimeout(() => {
    resetSuccess.value = false
  }, 400)
}
let online = false
onMounted(() => {
  let i = new Image()
  i.src = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png?t=' + Date.parse(String(new Date()))
  i.onload = function () {
    online = true
  }
  i.onerror = function () {
    online = false
  }
})
// 设置重置框css
const setResetCSS = (index: number) => {
  // index为0就是用邮件发送
  if (index === 0) {
    if (online) {
      resetClass = ['resetBoxChoose', 'resetBox']
    } else {
      ElMessage({
        message: '需要联网才可以进行发送邮件操作',
        type: 'warning'
      })
    }
  }
  // index为1就是自行告知
  if (index === 1) {
    resetClass = ['resetBox', 'resetBoxChoose']
  }
}
// 重置密码
const resetPasswordClick = () => {
  // console.log(md5('hello world'))
  let resetIndex = ''
  for (const index in resetClass) {
    if (resetClass[index] === 'resetBoxChoose') {
      resetIndex = index
    }
  }
  const originalPassword = randomString(8)
  const passwordMD5 = md5(originalPassword)
  switch (resetIndex) {
    case '0':
      sendUserPasswordEmail({ userId: currentRow.value.userId }).then(() => {
        dialogVisible.value = false
        ElNotification({
          title: '成功',
          message: '已发送邮件',
          type: 'success'
        })
      })
      break
    case '1':
      resetPassword({ userId: currentRow.value.userId, password: passwordMD5 }).then((res: any) => {
        // this.dialogVisible = false
        resetSuccess.value = true
        newAccount.value = res.data.account
        newPassword.value = originalPassword
      })
      break
    default:
      ElMessage({
        message: '请先选择新密码告知方式再重置密码',
        type: 'warning'
      })
      break
  }
}
// 随机生成指定长度的字符串
const randomString = (length: number) => {
  const str = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let tmp = ''
  let i = 0
  const l = str.length
  for (i = 0; i < length; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l))
  }
  return tmp
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
.resetBox {
  position: relative;
  width: 200px;
  height: 80px;
  margin: 0 30px;
  padding: 27px 45px;
  color: #aaaaaa;
  font-size: 17px;
  border: 2px solid #aaaaaa;
}
.resetBox:hover {
  box-sizing: border-box;
  border: 2px solid #4675cc;
}
.resetBoxChoose {
  position: relative;
  width: 200px;
  height: 80px;
  margin: 0 30px;
  padding: 27px 45px;
  color: #4675cc;
  font-size: 17px;
}
.resetBoxChoose {
  box-sizing: border-box;
  border: 3px solid #4675cc;
}
.resetBoxChoose:before {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 17px solid #4675cc;
  border-top-color: transparent;
  border-left-color: transparent;
  color: #fff;
}
.resetBoxChoose:after {
  content: '';
  display: block;
  width: 5px;
  height: 12px;
  position: absolute;
  right: 6px;
  bottom: 6px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
:deep(.el-tree) {
  border-right: none;
  .el-tree-node__expand-icon {
    font-size: 18px;
    position: relative;
    left: 5px;
  }
  .tree-spt {
    padding-left: 15px;
  }
  .el-tree-node .is-current {
    background-color: #f5f7fa;
  }
  .el-tree-node__expand-icon {
    float: right;
    margin-right: 1.5625rem !important;
  }
  .el-tree-node__content {
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 16px;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background: #ecf5ff;
  }
}
</style>
