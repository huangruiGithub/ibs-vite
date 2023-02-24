<template>
  <span class="detail-forms">
    <el-drawer
      :visible.sync="drawer"
      size="850px"
      :with-header="false"
      destory-on-close
      :before-close="beforeClose"
      @closed="drawerClosed"
    >
      <div v-if="drawer" class="add-drawer-wrap">
        <div class="drawer-content">
          <div class="header title">{{ operationType === 'add' ? '新增' : '编辑' }}</div>
          <div class="form-content">
            <MyForm
              ref="myForm"
              :form-conf="formConf"
              :form-data="formData"
              :rules="rules"
              inner-padding="60px"
              label-width="120px"
            >
              <template #files>
                <FileUpload :file-list.sync="formData.files" :limit="1" />
              </template>
            </MyForm>
          </div>
        </div>

        <div class="drawer-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="saveClick">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </span>
</template>

<script setup>
import { ref, computed, reactive, defineExpose, defineEmits, watch, nextTick, defineProps } from 'vue'
import MyForm from '@/components/MyForm/index.vue'
import { addThreePartyEndpoint, updateThreePartyEndpoint } from '@/api/resource-management'
import FileUpload from '@/components/MyForm/FileUpload.vue'
import { MessageBox } from 'element-ui'
const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})
const preData = ref('')
const beforeClose = (done) => {
  if (preData.value === JSON.stringify(formData.value)) {
    done()
  } else {
    MessageBox.confirm('数据未保存，点击确定后数据将不保存，是否确定？', '提示').then(done)
  }
}

const emits = defineEmits(['saved'])

const drawer = ref(false)
const formData = ref({
  endpointName: '',
  protocolType: '',
  path: '',
  description: '',
  files: []
})
const rules = reactive({
  endpointName: [{ required: true, message: '接口名称不能为空', trigger: 'blur' }],
  protocolType: [{ required: true, message: '协议类型不能为空', trigger: 'change' }],
  path: [{ required: true, message: '接口路径不能为空', trigger: 'blur' }],
  description: '',
  files: []
  // fileSource: [{ required: true, message: '攻击日志文件来源不能为空', trigger: 'blur' }],
  // files: [
  //   {
  //     validator(rule, value, callback) {
  //       if (!value.length) {
  //         callback('附件不能为空')
  //       } else {
  //         callback()
  //       }
  //     },
  //     required: true,
  //     trigger: 'blur'
  //   }
  // ]
})
const operationType = ref('')
const show = (type, value) => {
  drawer.value = true
  operationType.value = type
  console.log(props, 'props')
  if (type === 'add') {
    formData.value = {
      endpointName: '',
      protocolType: '',
      path: '',
      description: '',
      files: [],
      type: 1
    }
  } else if (type === 'edit') {
    formData.value = value
    formData.value.influencePort = formData.value.influencePort ? formData.value.influencePort : undefined
    formData.value.riskCreatetime = formData.value.riskCreatetime ? new Date(formData.value.riskCreatetime) : ''
    console.log(formData.value.riskCreatetime, 'formData.value.riskCreatetime')
    formData.value.files = formData.value.files.path ? [formData.value.files] : []
    formData.value.files.forEach((item) => {
      item.name = item.fileName
      item.url = item.path
    })
  }
  nextTick(() => {
    preData.value = JSON.stringify(formData.value)
  })
}
const cancelClick = () => {
  if (preData.value === JSON.stringify(formData.value)) {
    drawer.value = false
  } else {
    MessageBox.confirm('数据未保存，点击确定后数据将不保存，是否确定？', '提示').then(() => {
      drawer.value = false
    })
  }
}
const myForm = ref()
watch(
  () => formData.value.files,
  () => {
    myForm.value?.form?.validateField('files')
  },
  {
    deep: true
  }
)
const saveClick = () => {
  const saveState = myForm.value.submitForm()
  if (saveState) {
    formData.value.files.forEach((item) => {
      item.fileName = item.name
      item.path = item.url
    })

    if (operationType.value === 'add') {
      addThreePartyEndpoint(formData.value).then(() => {
        emits('saved')
        drawer.value = false
      })
    } else if (operationType.value === 'edit') {
      updateThreePartyEndpoint(formData.value).then(() => {
        emits('saved')
        drawer.value = false
      })
      console.log('edit')
    }
  }
}

// 查看
const previewDrawer = ref(false)
const showPreview = (data) => {
  formData.value = data
  previewDrawer.value = true
  formData.value.files.forEach((item) => {
    item.name = item.fileName
    item.url = item.path
  })
}
const drawerClosed = () => {
  formData.value = {}
}
// 表单配置
const formConf = computed(() => [
  {
    label: '接口名称',
    prop: 'endpointName',
    type: 'input',
    span: 12,
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    label: '协议类型',
    prop: 'protocolType',
    type: 'select',
    selectOptions: props.options.apiTypeOptions,
    span: 12,
    otherProps: {
      maxlength: '50',
      'show-word-limit': true
    }
  },
  {
    label: '接口地址',
    prop: 'path',
    type: 'input',
    span: 12,
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    label: '接口描述',
    prop: 'description',
    type: 'input',
    otherProps: {
      type: 'textarea',
      maxlength: '50',
      'show-word-limit': true
    }
  },
  {
    prop: 'files',
    label: '接口文档',
    type: 'file'
  }
])

defineExpose({ show, showPreview })
</script>

<style lang="scss" scoped>
.detail-forms {
  margin-left: auto;
  .add-drawer-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .drawer-content {
      flex: 1;
      padding: 0 30px;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      .form-content {
        flex: 1;
        min-height: 300px;
        max-height: 800px;
        overflow: hidden;
        padding-right: 15px;

        &:hover {
          overflow-x: hidden;
          overflow-y: overlay;
        }
        .el-scrollbar ::v-deep .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        padding: 20px 0;
      }
      .label {
        font-size: 14px;
        color: #333333;
        + .value {
          font-weight: bold;
        }
        + .el-input {
          width: 200px;
        }
      }
      > .device-info {
        border-bottom: 1px dashed #c7c7c7;
        .device-search {
          .search-item {
            margin-right: 10px;
          }
        }
      }
      > .spot-inspection-plan {
        > .spot-inspection-template {
          padding-bottom: 10px;
          > .template-name {
            margin-right: 10px;
          }
        }
      }
    }
    > .drawer-footer {
      border-top: 1px solid rgba(0, 0, 0, 0.09);
      height: 66px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      padding-left: auto;
      justify-content: flex-end;
      flex-shrink: 0;
    }
  }
}
.preview {
  padding: 0 30px 20px;
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 80px;
  }
}
</style>
