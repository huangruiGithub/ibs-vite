<template>
  <div class="setUser">
    <el-drawer v-model="drawerVisible" title="我是标题" size="40%" :with-header="false" @close="cancelForm">
      <div class="drawerForm">
        <div class="pageTitle">
          <div class="titleText">{{ pageTitle }}</div>
          <slot name="header" />
          <el-divider />
        </div>
        <el-form
          ref="userForm"
          :model="userData"
          :rules="rules"
          label-width="140px"
          style="flex: 1; margin: 0px 30px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input v-model="userData.userName" placeholder="请输入用户姓名" />
              </el-form-item>
              <el-form-item ref="department" label="归属部门：" prop="department">
                <el-cascader
                  v-model="userData.department"
                  :options="departmentOptions"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true }"
                  clearable
                  style="width: 100%"
                  @change="departmentChange"
                />
              </el-form-item>
              <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="userData.mobile" placeholder="请输入移动电话号码" type="tel" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录账号：" prop="account">
                <el-input v-model="userData.account" placeholder="请输入登录账号" />
              </el-form-item>
              <el-form-item label="邮箱地址：" prop="email">
                <el-input v-model="userData.email" placeholder="请输入邮箱地址" />
              </el-form-item>
              <el-form-item label="固定电话：" prop="telephone">
                <el-input v-model="userData.telephone" placeholder="请输入固定电话号码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="性别：">
            <el-radio v-model="userData.sex" label="男">男</el-radio>
            <el-radio v-model="userData.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="角色：" prop="roleId">
            <el-select v-model="roleShow" placeholder="请选择" popper-class="userRoleSelect" @change="roleChange">
              <el-option v-for="item in roleOption" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button plain style="margin: 0 20px" :disabled="!userData.roleId" @click="detailClick('normal')">
              详细
            </el-button>
            <!-- <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              content="点击“详细”修改自定义角色权限。此处仅支持“自定义角色”的权限修改。若要增加或修改通用角色（权限模版），请至《角色管理》模块。"
            >
              <template #reference>
                <i class="el-icon-question" style="font-size: 17px" />
              </template>
            </el-popover> -->
          </el-form-item>

          <el-form-item v-if="pageType === 'add'" label="新密码告知方式：" style="width: 50%">
            <el-select v-model="newPasswordInform" placeholder="请选择">
              <el-option v-for="item in InformOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="drawerFooter" align="right">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button v-blur type="primary" @click="submitForm">确 定</el-button>
        </div>
      </div>
    </el-drawer>
    <SetUserRole
      v-if="detailType !== 'index'"
      ref="setUserRole"
      @closeDetailDialog="closeDetailDialog"
      @changeRoleId="changeRoleId"
    />
  </div>
</template>
<script setup lang="ts">
import { getRoleOption, getDeptOptions } from '@/api/system-management'
import SetUserRole from './setUserRole.vue'
import { ValidPhone } from '@/utils/validate'
import { objAssign } from '@/utils/index'
import md5 from 'js-md5'
import { nextTick, ref, reactive } from 'vue'
const emit = defineEmits(['submitForm', 'closeForm'])
const drawerVisible = ref(false)
const pageType = ref('')
const pageTitle = ref('用户')
const is = (type: string, currentRow: FormDataProps) => {
  pageType.value = type
  getRoleOption().then((res: any) => {
    for (const item of res.data) {
      roleOption.push(item)
    }
    if (type === 'add') {
      pageTitle.value = '新增用户'
    } else {
      pageTitle.value = '编辑用户'
      setRoleShow(currentRow.roleId)
      objAssign(userData, currentRow)
    }
  })
  drawerVisible.value = true
}
defineExpose({ is })
const setRoleShow = (roleId: number | null) => {
  if (!roleId) {
    return
  }
  var flag = false
  for (const item of roleOption) {
    if (item.value === roleId) {
      flag = true
    }
  }
  if (flag) {
    roleShow.value = roleId
  } else {
    roleShow.value = '自定义角色'
  }
}
const changeRoleId = (roleId: number) => {
  userData.roleId = roleId
}
const cancelForm = () => {
  pageType.value = ''
  emit('closeForm')
  drawerVisible.value = false
}

//--表单选项相关
//密码告知选项
const newPasswordInform = ref('self')
const InformOptions: { label: string; value: string }[] = reactive([
  {
    value: 'self',
    label: '自行告知用户'
  }
])
//部门选项
interface DepartmentDataProps {
  userId: number | null
  userName: string
  account: string
}
const departmentOptions: DepartmentDataProps[] = reactive([])
const parseJson = (arr: any[]) => {
  if (arr.length === 0) {
    return []
  }
  arr = arr.slice()
  const key = 'value'
  function toParse(arr: any[]) {
    arr.forEach(function (item) {
      item[key] = item.id
      if (item.children && Array.isArray(item.children)) {
        toParse(item.children)
      }
      delete item.id
    })
    arr.forEach(function (item) {
      if (item.children && Array.isArray(item.children)) {
        if (item.children.length === 0) {
          delete item.children
        }
      }
    })
    return arr
  }
  return toParse(arr)
}
getDeptOptions().then((res: any) => {
  const deptArr: any = []
  deptArr.push(res.data)
  const arr = parseJson(res.data.children)
  for (const item of arr) {
    departmentOptions.push(item)
  }
})
getDeptOptions()
const department = ref()
const departmentChange = () => {
  if (userData.department instanceof Array) {
    if (userData.department.length > 0) {
      department.value.clearValidate()
    }
  }
}
//角色选项
const roleShow = ref()
const roleOption: { label: string; value: number }[] = reactive([])
const roleChange = (val: number) => {
  userData.roleId = val
}
const detailType = ref('')
const setUserRole = ref()
const detailClick = (type: string) => {
  // 点击详细
  if (type === 'normal') {
    if (roleShow.value === '自定义角色') {
      detailType.value = 'custom'
    } else {
      detailType.value = type
    }
  } else {
    detailType.value = type
  }
  nextTick(() => {
    setUserRole.value.is(detailType.value, userData.roleId)
  })
}
const closeDetailDialog = () => {
  detailType.value = 'index'
}
//表单校验
const validPhone = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!ValidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
const rules = {
  userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  department: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [{ required: true, validator: validPhone, trigger: 'blur' }]
}
//--表单数据
interface FormDataProps {
  userId: number | null
  userName: string
  account: string
  department: any[] | null
  roleId: number | null
  sex: string
  email: string | null
  mobile: string | null
  telephone: string | null
  password: string
}
const userData: FormDataProps = reactive({
  userId: null,
  userName: '',
  account: '',
  department: [],
  roleId: null,
  sex: '未定义',
  email: '',
  mobile: '',
  telephone: '',
  password: ''
})
const userForm = ref()
const submitForm = () => {
  userForm.value.validate((valid: boolean) => {
    if (valid) {
      let originalPassword = ''
      if (pageType.value === 'add') {
        originalPassword = randomString(8)
        userData['password'] = md5(originalPassword)
      }
      console.log(pageType.value)
      emit('submitForm', pageType.value, userData, newPasswordInform.value, originalPassword)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
// 随机生成字符串，用于生成密码
const randomString = (len: number) => {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
</script>
<style lang="less">
.userRoleSelect {
  .el-select-menu__list {
    border-top: solid 1px #e4e7ed;
    padding: 10px;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
    .nodeText {
      font-size: 14px;
    }
  }
  .el-select-menu__list:hover {
    background-color: #f5f7fa;
  }
}
</style>
<style lang="less" scoped>
:deep(.el-form-item__content) {
  display: block;
}
.setUser {
  height: 100%;
  :deep(label) {
    font-weight: 500;
  }
  .drawerForm {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .drawerFooter {
    justify-content: right;
    padding: 20px;
  }
  .pageTitle {
    padding-top: 15px;
    padding-left: 15px;
    font-size: 20px;
    .titleBorder {
      font-weight: bold;
      font-size: 22px;
      color: #00a0e9;
      margin-right: 5px;
    }
    .titleText {
      display: inline;
      padding-right: 20px;
      padding-left: 5px;
    }
  }
}
</style>
