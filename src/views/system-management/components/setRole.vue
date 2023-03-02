<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      custom-class="dialog"
      width="35%"
      @close="closeDialog()"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" style="padding: 0px 40px">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="formData.remark" placeholder="请输入角色描述" type="textarea" />
        </el-form-item>
        <el-form-item label="菜单权限：" prop=" rightIds">
          <el-dropdown style="padding: 0px 20px 10px 0px" @command="setRoleTree">
            <el-button plain>
              使用模板
              <el-icon><ArrowDown /></el-icon>
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
              <el-icon><ArrowDown /></el-icon>
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
            ref="tree"
            :data="treeList"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button v-blur type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getUserRole, getRightTree, getRoleRightIds, getRoleOption } from '@/api/system-management'
import { ArrowDown } from '@element-plus/icons-vue'
import { onMounted, nextTick, ref, reactive } from 'vue'
import { objAssign } from '@/utils/index'
const emit = defineEmits(['submitForm', 'closeForm'])
//--弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('角色')
const formDialogType = ref('')
const is = (type: string, data: any) => {
  dialogVisible.value = true
  if (type === 'add') {
    dialogTitle.value = '新增角色'
  } else {
    dialogTitle.value = '编辑角色'
    setRole(data.roleId)
  }
  setRoleOption()
  formDialogType.value = type
}
const closeDialog = () => {
  emit('closeForm')
  dialogVisible.value = false
}
defineExpose({ is })
//--表单数据
interface DataProps {
  roleId: number
  roleName: string
  remark: string
  rightIds: any[]
  isPersonal: number
  email?: string
}
const formData: DataProps = reactive({
  roleId: 0,
  roleName: '',
  remark: '',
  rightIds: [],
  isPersonal: 0,
  email: ''
})
const rules = {
  personName: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  // email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
}
//获取角色列表
const roleOption: { label: string; value: number }[] = reactive([])
const setRoleOption = () => {
  getRoleOption().then((res: any) => {
    res.data.forEach((item: any) => {
      roleOption.push(item)
    })
  })
}
// 初始化
const setRole = (roleId: number) => {
  getUserRole(roleId).then((res: any) => {
    objAssign(formData, res.data)
  })
  setRoleTree(roleId)
}
// 提交
const form = ref()
const submitForm = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      getRoleTreeKey()
      emit('submitForm', formDialogType.value, formData)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
//--树相关
const treeList = ref([])
const tree = ref()
onMounted(() => {
  getRightTree().then((res: any) => {
    treeList.value = res.data
  })
})
const defaultProps = {
  children: 'children',
  label: 'label'
}
const setRoleTree = (roleId: number) => {
  getRoleRightIds(roleId).then((res: any) => {
    tree.value.setCheckedKeys([])
    tree.value.setCheckedKeys(res.data)
  })
}
const getRoleTreeKey = () => {
  const arr = tree.value.getCheckedNodes(false, true)
  formData.rightIds = []
  for (const item of arr) {
    formData.rightIds.push(item.id)
  }
}
const treeOperating = (command: string) => {
  switch (command) {
    case 'allSet':
      tree.value.setCheckedNodes(treeList.value)
      break
    case 'allClean':
      tree.value.setCheckedKeys([])
      break
    case 'allSpread':
      nextTick(() => {
        for (let i = 0; i < tree.value.store._getAllNodes().length; i++) {
          tree.value.store._getAllNodes()[i].expanded = true
        }
      })
      break
    case 'allMerge':
      nextTick(() => {
        for (let i = 0; i < tree.value.store._getAllNodes().length; i++) {
          tree.value.store._getAllNodes()[i].expanded = false
        }
      })
      break
    default:
      break
  }
}
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  margin-top: 15vh !important;
}
:deep(label) {
  font-weight: 500;
}
:deep(.el-form-item__content) {
  display: block;
}
</style>
