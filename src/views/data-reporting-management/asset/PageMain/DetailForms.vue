<template>
  <span class="detail-forms">
    <el-drawer
      :visible.sync="drawer"
      size="800px"
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
              label-width="150px"
            >
              <template #addressNo>
                <RegionSelection v-model="formData.addressNo" @codeToText="codeToText" />
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
    <el-drawer :visible.sync="previewDrawer" size="800px" title="查看">
      <div v-if="previewDrawer" class="preview">
        <DescForm :form-conf="formConf" :form-data="formData">
          <template #addressNo>{{ formData?.provice }}{{ formData?.city }}{{ formData?.dist }}</template>
        </DescForm>
      </div>
    </el-drawer>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, reactive, defineExpose, defineProps, defineEmits, nextTick } from 'vue'
import MyForm from '@/components/MyForm/index.vue'
import DescForm from '@/components/DescForm/index.vue'
import RegionSelection from '@/views/data-reporting-management/components/RegionSelection.vue'
import { addKnowledgebaseAsset, updateKnowledgebaseAsset } from '@/api/data-reporting-management'

import { ElMessageBox } from 'element-plus'
const preData = ref('')
const beforeClose = (done: () => void) => {
  if (preData.value === JSON.stringify(formData.value)) {
    done()
  } else {
    ElMessageBox.confirm('数据未保存，点击确定后数据将不保存，是否确定？', '提示').then(done)
  }
}

const emits = defineEmits(['saved'])
const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
})
const drawer = ref(false)

const formData = ref<any>({
  sourceDev: '',
  name: '',
  ip: '',
  mask: '',
  mac: '',
  contributor: '',
  type: '',
  applicationArea: '',
  assetStatus: '',
  manufacturer: '',
  sn: '',
  systemType: '',
  systemVersion: '',
  softwareVersion: '',
  hardwareVersion: '',
  protocol: '',
  department: '',
  manager: '',
  description: '',
  purpose: '',
  equipmentType: '',
  websiteName: '',
  domainName: '',
  addressNo: [],
  provice: '',
  city: '',
  dist: ''
})
const rules = reactive({
  sourceDev: [{ required: true, message: '来源设备/系统不能为空', trigger: 'change' }],
  name: [{ required: true, message: '资产名称不能为空', trigger: 'blur' }],
  ip: [{ required: true, message: '资产IP不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '资产类型不能为空', trigger: 'change' }],
  applicationArea: [{ required: true, message: '应用领域不能为空', trigger: 'change' }],
  assetStatus: [{ required: true, message: '设备状态不能为空', trigger: 'change' }],
  manufacturer: [{ required: true, message: '品牌不能为空', trigger: 'blur' }],
  systemType: [{ required: true, message: '操作系统类型不能为空', trigger: 'change' }],
  systemVersion: [{ required: true, message: '操作系统版本不能为空', trigger: 'blur' }],
  softwareVersion: [{ required: true, message: '应用软件及版本不能为空', trigger: 'blur' }],
  hardwareVersion: [{ required: true, message: '硬件版本号不能为空', trigger: 'blur' }],
  protocol: [{ required: true, message: '开放协议不能为空', trigger: 'blur' }],
  department: [{ required: true, message: '所属单位不能为空', trigger: 'blur' }],
  manager: [{ required: true, message: '资产拥有者不能为空', trigger: 'blur' }],
  purpose: [{ required: true, message: '资产用途不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '资产描述不能为空', trigger: 'blur' }],
  location: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
  addressNo: [{ required: true, message: '所在地区不能为空', trigger: 'change' }],
  equipmentType: [{ required: true, message: '工业设备类型不能为空', trigger: 'change' }]
})
const operationType = ref('')
const show = (type: string, value: any) => {
  drawer.value = true
  operationType.value = type
  console.log(operationType.value)
  if (type === 'add') {
    formData.value = {
      name: '',
      ip: '',
      mask: '',
      mac: '',
      contributor: '',
      type: '',
      applicationArea: '',
      assetStatus: 1,
      manufacturer: '',
      sn: '',
      systemType: '',
      systemVersion: '',
      softwareVersion: '',
      hardwareVersion: '',
      protocol: '',
      department: '',
      manager: '',
      description: '',
      purpose: '',
      equipmentType: '',
      websiteName: '',
      domainName: '',
      provice: '',
      city: '',
      dist: '',
      sourceDev: ''
    }
  } else if (type === 'edit') {
    formData.value = value
  }
  nextTick(() => {
    preData.value = JSON.stringify(formData.value)
  })
}
const cancelClick = () => {
  if (preData.value === JSON.stringify(formData.value)) {
    drawer.value = false
  } else {
    ElMessageBox.confirm('数据未保存，点击确定后数据将不保存，是否确定？', '提示').then(() => {
      drawer.value = false
    })
  }
}
const myForm = ref()
const saveClick = () => {
  const saveState = myForm.value.submitForm()
  if (saveState) {
    console.log(operationType.value, 'edit2')

    if (operationType.value === 'add') {
      addKnowledgebaseAsset(formData.value).then(() => {
        emits('saved')
        drawer.value = false
      })
    } else if (operationType.value === 'edit') {
      updateKnowledgebaseAsset(formData.value).then(() => {
        emits('saved')
        drawer.value = false
      })
      console.log('edit')
    }
  }
}

const codeToText = (provice: string, city: string, dist: string) => {
  console.log(provice, city, dist)
  formData.value.provice = provice
  formData.value.city = city
  formData.value.dist = dist
}
// 查看
const previewDrawer = ref(false)
const showPreview = (data: any) => {
  formData.value = data
  previewDrawer.value = true
}
const drawerClosed = () => {
  formData.value = {}
}
// 表单配置
const formConf = computed(() => [
  {
    label: '资产名称',
    type: 'input',
    prop: 'name',
    span: 12,
    otherProps: {
      style: { width: '100%' },
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    label: '资产IP',
    prop: 'ip',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'mask',
    label: '子网掩码',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'mac',
    label: 'mac地址',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },

  {
    prop: 'contributor',
    span: 12,
    label: '资产贡献者',
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'type',
    span: 12,
    label: '资产类型',
    type: 'select',
    selectOptions: props.options.assetTypeList
  },
  {
    prop: 'applicationArea',
    span: 12,
    label: '应用领域',
    type: 'select',
    selectOptions: props.options.applicationAreaList
  },
  {
    prop: 'assetStatus',
    span: 12,
    label: '设备状态',
    type: 'select',
    selectOptions: props.options.assetStatusList
  },
  {
    prop: 'manufacturer',
    label: '品牌',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'sn',
    label: '设备序列号',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'systemType',
    label: '操作系统类型',
    span: 12,
    type: 'select',
    selectOptions: props.options.systemTypeList
  },
  {
    prop: 'systemVersion',
    label: '操作系统版本',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'softwareVersion',
    label: '应用软件及版本',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'hardwareVersion',
    label: '硬件版本号',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'protocol',
    label: '开放协议',
    type: 'input',
    span: 12,
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'department',
    label: '所属单位',
    type: 'input',
    span: 12,
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'manager',
    label: '资产拥有者',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'description',
    label: '资产用途',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'purpose',
    label: '资产描述',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'addressNo',
    label: '所在地区',
    span: 12,
    type: 'slot',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'location',
    label: '详细地址',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '100',
      paddingRight: 52,
      'show-word-limit': true
    }
  },
  {
    prop: 'equipmentType',
    label: '工业设备类型',
    span: 12,
    type: 'select',
    selectOptions: props.options.equipmentTypeList
  },
  {
    prop: 'websiteName',
    label: '网站名称',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'domainName',
    label: '域名',
    span: 12,
    type: 'input',
    otherProps: {
      maxlength: '50',
      paddingRight: 45,
      'show-word-limit': true
    }
  },
  {
    prop: 'sourceDev',
    label: '来源设备/系统',
    span: 12,
    type: 'select',
    selectOptions: props.options.sourceDevList,
    otherProps: {
      disabled: operationType.value === 'edit'
    }
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
