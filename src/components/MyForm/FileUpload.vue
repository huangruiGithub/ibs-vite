<template>
  <el-upload
    v-bind="$attrs"
    ref="upload_instructionsForUseFileList"
    class="upload-demo"
    :action="url"
    :limit="props.limit"
    multiple
    :file-list="props.fileList"
    :before-upload="beforeAvatarUpload"
    :on-success="handleSuccess"
    :on-preview="handlePreview"
    :before-remove="beforeRemove"
    :on-remove="handleRemove"
    :on-exceed="onExceed"
  >
    <el-button v-if="!props.disabled" size="small" icon="el-icon-upload2">上传附件</el-button>

    <div v-if="!props.disabled" slot="tip" class="el-upload__tip">
      <div v-html="props.tip"></div>
      <div v-if="!!props.fileSize">
        文件大小不超过{{ fileSize + sizeUnit }}
        <!-- 当前文件大小：{{ (sumFileSize / sizeMap[sizeUnit]).toFixed(14) + sizeUnit }} -->
      </div>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { download } from '@/api/resource-management'
import { fileDownload } from '@/utils/download.js'
import { defineProps, defineEmits, watch, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-ui'

const props = defineProps({
  fileList: {
    type: Array,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  tip: {
    type: String,
    default: ''
  },
  fileSize: {
    type: Number,
    default: 0
  },
  sizeUnit: {
    type: String,
    default: 'MB'
  },
  limit: {
    type: Number,
    default: 100
  }
})
const sumFileSize = ref(0)

watch(
  () => props.fileList,
  () => {
    sumFileSize.value = props.fileList.reduce((pre, item) => pre + item.fileSize, 0)
    console.log(props.fileList, sumFileSize, 'filesize')
  },
  { deep: true, immediate: true }
)
const emits = defineEmits(['input'])
const url = process.env.VUE_APP_BASE_API + 'files/uploadFile'
const handleSuccess = (response, file) => {
  console.log('handleSuccess')
  if (file.status === 'success') {
    const index = props.fileList.findIndex((item) => {
      const fileName = item.name ?? item.response?.name
      return fileName === file.response.name
    })
    console.log(file, 'filele')
    if (index === -1) {
      props.fileList.push({ ...file.response, fileSize: file.size })
    } else {
      props.fileList.splice(index, 1, { ...file.response, fileSize: file.size })
    }
    emits('input')
  }
}

const beforeAvatarUpload = (file: any) => {
  const sizeMap = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024
  }
  const { fileSize, sizeUnit }: { fileSize: number; sizeUnit: string } = props
  if (!fileSize) {
    return true
  }
  const isInSize = file.size < fileSize * sizeMap[sizeUnit] - sumFileSize.value
  if (!isInSize) {
    ElMessage.error(
      `上传失败！已上传文件大小${(sumFileSize.value / sizeMap[sizeUnit]).toFixed(3) + sizeUnit},
      ，还能上传 ${(fileSize - sumFileSize.value / sizeMap[sizeUnit]).toFixed(3) + sizeUnit}!`
    )
  }
  return isInSize
}

const handlePreview = (file) => {
  const path = file.url ?? file.response?.url
  const fileName = file.name ?? file.response?.name
  download({ files: [{ path, fileName }] }).then((res) => {
    fileDownload(res)
  })
}
const beforeRemove = (file, fileList) => {
  if (props.disabled) {
    ElMessage.error('查看状态不可删除文件')
    return false
  }
  if (file.status === 'ready') {
    return true
  } else {
    return ElMessageBox.confirm(`确定移除 ${file.name}？`)
  }
}
const handleRemove = (file, fileList) => {
  const index = props.fileList.findIndex((item) => {
    const fileName = item.name ?? item.response?.name
    const delFileName = file.name ?? file.response?.name
    return fileName === delFileName
  })
  if (index !== -1) {
    props.fileList.splice(index, 1)
  }
}
const onExceed = () => {
  ElMessage.error(`超过最大文件上传数量,最多能上传${props.limit}个！`)
}
</script>

<style lang="less"></style>
