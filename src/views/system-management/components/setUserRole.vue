<template>
  <div class="setUserRole">
    <el-dialog v-model="dialogVisible" :title="formData.roleName" width="35%" @close="closeDialog()">
      <el-form
        v-show="formDialogType === 'normal'"
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="100px"
        style="padding: 0px 40px"
      >
        <el-form-item label="角色描述：">
          {{ formData.remark }}
        </el-form-item>
        <el-form-item label="菜单权限：" prop=" rightIds">
          <el-dropdown @command="treeOperating">
            <el-button plain>
              树操作
              <el-icon><ArrowDown /></el-icon>
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="allSpread">展开所有</el-dropdown-item>
                <el-dropdown-item command="allMerge">合并所有</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tree
            ref="normalTree"
            :data="treeList"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-show="formDialogType === 'custom'"
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="100px"
        style="padding: 0px 40px"
      >
        <el-form-item label="角色描述：">
          <el-input v-model="formData.remark" placeholder="请输入角色描述" type="textarea" />
        </el-form-item>
        <el-form-item label="菜单权限：" prop=" rightIds">
          <el-dropdown style="padding: 0px 20px 10px 0px" @command="setRoleTree">
            <el-button plain>
              使用模板
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in roleOption" :key="index" :command="item.value">
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="treeOperating">
            <el-button plain>
              树操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="allSet">全部勾选</el-dropdown-item>
                <el-dropdown-item command="allClean">清空选择</el-dropdown-item>
                <el-dropdown-item command="allSpread">展开所有</el-dropdown-item>
                <el-dropdown-item command="allMerge">合并所有</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tree
            ref="customTree"
            :data="treeList"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog()">关 闭</el-button>
        <el-button v-show="formDialogType === 'custom'" type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getUserRole,
  getRightTree,
  getRoleRightIds,
  getRoleOption,
  addRole,
  updateRole
} from '@/api/system-management'
import { objAssign } from '@/utils/index'
import { ArrowDown } from '@element-plus/icons-vue'
import { nextTick, ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
const emit = defineEmits(['changeRoleId', 'closeDetailDialog'])
const formDialogType = ref('normal')
const dialogVisible = ref(false)
const rules = {
  personName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
}
const roleOption: { label: string; value: number }[] = reactive([])
getRoleOption().then((res: any) => {
  for (const item of res.data) {
    roleOption.push(item)
  }
})
const closeDialog = () => {
  emit('closeDetailDialog')
}
const is = async (type: string, roleId: number | null) => {
  await getRightTree().then((res: any) => {
    for (const item of res.data) {
      treeList.push(item)
    }
  })
  if (type === 'normal') {
    setTreeDisabled(treeList)
  }
  formDialogType.value = type
  getRoleInfo(roleId)
  dialogVisible.value = true
}
defineExpose({ is })
//表单数据
interface fromDataProps {
  roleId: number | null
  roleName: string
  remark: string
  rightIds: any[]
  isPersonal: number
}
const formData: fromDataProps = reactive({
  roleId: null,
  roleName: '自定义角色',
  remark: '',
  rightIds: [],
  isPersonal: 1
})
const getRoleInfo = (roleId: number | null) => {
  if (roleId !== null) {
    getUserRole(roleId).then((res: any) => {
      objAssign(formData, res.data)
    })
    setRoleTree(roleId)
  }
}
const form = ref()
const submitForm = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      getRoleTreeKey()
      if (formData.roleId === null) {
        addRole(formData).then((res) => {
          ElNotification({
            title: '成功',
            message: '新增角色成功',
            type: 'success'
          })
          emit('changeRoleId', res.data)
          closeDialog()
        })
      } else {
        updateRole(formData).then((res) => {
          ElNotification({
            title: '成功',
            message: '修改角色成功,对应用户重新登录后生效',
            type: 'success'
          })
          emit('changeRoleId', res.data)
          closeDialog()
        })
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
//--树相关
const defaultProps = {
  children: 'children',
  label: 'label'
}
interface TreeDataProps {
  label: string
  value: number
  disabled?: boolean
  children: TreeDataProps[]
}
const treeList: TreeDataProps[] = reactive([])
const normalTree = ref()
const setRoleTree = (roleId: number | null) => {
  getRoleRightIds(roleId).then((res: any) => {
    normalTree.value.setCheckedKeys([])
    normalTree.value.setCheckedKeys(res.data)
  })
}
const setTreeDisabled = (treeData: TreeDataProps[]) => {
  for (const item of treeData) {
    item.disabled = true
    if (item.children) {
      setTreeDisabled(item.children)
    }
  }
}
const getRoleTreeKey = () => {
  const arr = normalTree.value.getCheckedNodes(false, true)
  formData.rightIds = []
  for (const item of arr) {
    formData.rightIds.push(item.id)
  }
}
const treeOperating = (command: any) => {
  switch (command) {
    case 'allSet':
      checkAll(true)
      break
    case 'allClean':
      checkAll(false)
      break
    case 'allSpread':
      spreadTree(true)
      break
    case 'allMerge':
      spreadTree(false)
      break
    default:
      break
  }
}
const checkAll = (flag: boolean) => {
  if (flag) {
    // 全选
    normalTree.value.setCheckedNodes(treeList)
  } else {
    // 取消选中
    normalTree.value.setCheckedKeys([])
  }
}
const spreadTree = (flag: boolean) => {
  nextTick(() => {
    for (let i = 0; i < normalTree.value.store._getAllNodes().length; i++) {
      normalTree.value.store._getAllNodes()[i].expanded = flag
    }
  })
}
</script>

<style lang="less" scoped>
.setUserRole {
  height: 99%;
  :deep(label) {
    font-weight: 500;
  }
}
:deep(.el-form-item__content) {
  display: block;
}
</style>
