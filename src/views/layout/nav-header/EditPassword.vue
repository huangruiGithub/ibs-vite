<template>
  <div class="editPassword">
    <el-dialog v-model="dialogVisible" :title="'修改密码'" width="500px" @close="closeDialog()">
      <el-form ref="form" :model="passwordData" :rules="rules" label-width="100px">
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input
            v-model="passwordData.oldPassword"
            placeholder="请输入旧密码"
            type="password"
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            v-model="passwordData.newPassword"
            placeholder="请输入新密码"
            type="password"
            style="width: 180px"
            @blur="check('newPassword')"
          />
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input
            v-model="passwordData.confirmPassword"
            placeholder="请重新输入密码"
            type="password"
            style="width: 180px"
            @blur="check('confirmPassword')"
          />
          <span v-show="confirmPasswordCheck" class="check">与新密码不一致</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="savePassword">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { changePassword } from '@/api/user'
import md5 from 'js-md5'
import { ref, reactive } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const emit = defineEmits(['closeEditPassword'])

const is = () => {
  dialogVisible.value = true
}
defineExpose({ is })
const closeDialog = () => {
  dialogVisible.value = false
  emit('closeEditPassword')
}
const passwordData: {
  oldPassword: string
  newPassword: string
  confirmPassword: string
} = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const form = ref()
const savePassword = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      if (passwordData.newPassword === passwordData.confirmPassword) {
        if (passwordData.newPassword !== passwordData.oldPassword) {
          const data = {
            oldPassword: md5(passwordData.oldPassword),
            newPassword: md5(passwordData.newPassword)
          }
          changePassword(data).then(() => {
            ElNotification({
              title: '成功',
              message: '修改密码成功',
              type: 'success'
            })
            closeDialog()
          })
        } else {
          ElMessage.error('旧密码和新密码相同，请检查')
        }
      } else {
        ElMessage.error('你的新密码和确认密码不一致，请检查')
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
//校验相关
const rules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
}
const confirmPasswordCheck = ref(false)
const check = (type: string) => {
  switch (type) {
    case 'newPassword':
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        confirmPasswordCheck.value = true
      } else {
        confirmPasswordCheck.value = false
      }
      break
    case 'confirmPassword':
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        confirmPasswordCheck.value = true
      } else {
        confirmPasswordCheck.value = false
      }
      break
    default:
      break
  }
}
</script>

<style lang="less" scoped>
.editPassword {
  height: 100%;
  .check {
    color: red;
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>
