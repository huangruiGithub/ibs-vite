<template>
  <span style="margin-left: 12px">
    <el-button v-if="props.type" @click="showDialog">批量导入</el-button>
    <el-dialog title="批量导入" :visible.sync="dialogVisible" width="30%" :before-close="dialogClose" center>
      <span style="float: left; margin-top: 10px">数据表：</span>
      <div>
        <el-upload ref="upload" :action="uploadUrl" :on-success="uploadFileSuccess" :limit="1">
          <el-button size="small">
            上传文件
            <i class="el-icon-upload el-icon--right" />
          </el-button>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        <el-button type="primary" @click="templateDownload">下载模板</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps } from 'vue'
import { ElLoading, ElMessage, ElNotification } from 'element-plus'
import { fileDownload } from '@/utils/download.js'
import { importDataFromExcel, downloadTemplate } from '@/api/data-reporting-management'
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
const dialogVisible = ref(false)
const showDialog = () => {
  dialogVisible.value = true
}
const uploadUrl = import.meta.env.VUE_APP_BASE_API + 'files/uploadFile'
const emit = defineEmits(['successed'])
// 以下都是文件上传函数
const filePath = ref('')
const uploadFileSuccess = (res: any, file: any) => {
  console.log(res.url)
  filePath.value = res.url
}
const upload = ref()
const dialogClose = () => {
  dialogVisible.value = false
  filePath.value = ''
  // 清除导入的文件列表
  upload.value.clearFiles()
}
// dialog确定事件
const dialogConfirm = () => {
  if (filePath.value == '') {
    ElMessage({
      message: '请上传文件！！',
      type: 'warning'
    })
  } else {
    const loading = ElLoading.service({
      lock: true,
      text: '数据导入中',
      body: true,
      fullscreen: true,
      background: 'hsla(0,0%,100%,.9)'
    })
    importDataFromExcel({ filePath: filePath.value }, props.type)
      .then((res) => {
        ElNotification({
          title: '成功',
          message: '导入成功',
          type: 'success'
        })
        emit('successed')
        // 清除导入的文件列表
        upload.value.clearFiles()
        filePath.value = ''
        dialogVisible.value = false
        // const deviceKeys = res.data.deviceKeys

        // MessageBox.confirm('是否将刚导入的设备信息导出?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   emit('exportDevices', deviceKeys)
        // })
      })
      .finally(() => {
        loading.close()
      })
  }
}
const templateDownload = () => {
  downloadTemplate({}, props.type).then((res) => {
    fileDownload(res)
  })
}
defineExpose({ showDialog })
</script>

<style lang="less" scoped></style>
