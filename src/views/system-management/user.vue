<template>
  <div class="user">
    <el-row style="height: 100%">
      <el-col :span="6" style="height: 100%">
        <PageCard :title-name="'部门树'" :type="'pageTitle'">
          <DepartmentTree @nodeClick="nodeClick" />
        </PageCard>
      </el-col>
      <el-col :span="18" style="height: 100%; border-left: 1px solid #dcdee0">
        <PageCard :title-name="'用户列表'" :type="'pageTitle'">
          <div class="pageTopDiv">
            <div class="topText">用户名称/登录名：</div>
            <el-input v-model="search.userName" placeholder="请输入" class="searchInput" />
            <el-button type="primary" class="topBtn" @click="searchClick">搜索</el-button>
            <el-button type="primary" plain class="topBtn" @click="alertForm('add')">新增</el-button>
          </div>
          <MyTable
            ref="myTable"
            v-model:search-data="searchData"
            :row-key="'userId'"
            :table-label="tableLabel"
            :table-total-size="tableTotalSize"
            @getTableData="getTableData"
            @currentChange="currentChange"
          >
            <template #operating="slotProps">
              <el-link
                v-show="slotProps.userId !== 1"
                :underline="false"
                type="primary"
                style="padding-right: 10px"
                @click="alertForm('edit', slotProps)"
              >
                编辑
              </el-link>
              <el-link :underline="false" type="primary" style="padding-right: 10px" @click="dialogVisible = true">
                重置密码
              </el-link>
              <el-link
                v-show="slotProps.userId !== 1 && slotProps.userId !== store.state.user.id"
                :underline="false"
                type="primary"
                style="color: red"
                @click="deleteClick(slotProps)"
              >
                删除
              </el-link>
            </template>
          </MyTable>
        </PageCard>
      </el-col>
    </el-row>
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
  </div>
</template>

<script setup lang="ts">
import md5 from 'js-md5'
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  sendUserPasswordEmail,
  resetPassword,
  getDepartmentNodeTree
} from '@/api/system-management'
import SetUser from './components/setUser.vue'
import PageCard from '@/components/page/PageCard.vue'
import MyTable from '@/components/Table/index.vue'
import DepartmentTree from '@/components/DepartmentTree/index.vue'
import { onMounted, nextTick, ref, reactive, watch } from 'vue'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
const pageType = ref('index')
//--表单相关
const setUser = ref()
const alertForm = (type: string, row?: any) => {
  pageType.value = type
  nextTick(() => {
    setUser.value.is(pageType.value, row)
  })
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
        myTable.value.getTableData()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
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
  myTable.value.getTableData()
}
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
//--表格相关
const myTable = ref()
const search = ref({ userName: '' })
let searchData = reactive({
  pageSize: 10,
  currentPage: 1,
  sort: {},
  params: {}
})
let tableLabel = [
  {
    prop: 'userId',
    label: '用户ID',
    width: 200,
    showOverflowTooltip: false
  },
  {
    prop: 'account',
    label: '登录账号',
    showOverflowTooltip: false
  },
  {
    prop: 'userName',
    label: '用户名称',
    // minWidth: 120,
    width: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'departmentName',
    label: '部门',
    width: 200,
    showOverflowTooltip: false
  },
  {
    prop: 'operating',
    label: '操作',

    type: 'scope',
    width: 250,
    showOverflowTooltip: false
  }
]
let tableTotalSize = ref(0)
let currentRow = ref()
const getTableData = (cab: any) => {
  getUser(searchData)
    .then((res: any) => {
      tableTotalSize.value = res.totalCount
      cab(res.data)
    })
    .catch(() => {
      cab('error')
    })
}
const currentChange = (val: any) => {
  currentRow.value = val
}
const searchClick = () => {
  searchData.currentPage = 1
  searchData.params['userName'] = search.value.userName
  myTable.value.getTableData()
}
//树点击效果
const nodeClick = (node: any) => {
  if (node.company) {
    searchData.params['departmentId'] = null
  } else {
    searchData.params['departmentId'] = node.id
  }
  myTable.value.getTableData()
}
</script>

<style lang="less" scoped>
@import '../../styles/pageTableTop.less';
.user {
  height: 100%;
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
}
</style>
