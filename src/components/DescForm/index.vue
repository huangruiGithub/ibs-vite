<template>
  <el-descriptions
    :column="24"
    size="mini"
    :title="title"
    :label-style="{ 'font-size': '14px', 'min-width': '120px' }"
    :content-style="{ 'font-size': '14px', 'line-height': '24px', 'min-width': '250px' }"
    border
  >
    <el-descriptions-item
      v-for="item in formConf"
      :key="item.label"
      :span="item.span ? item.span : 24"
      :label="item.label"
    >
      <template v-if="item.type === 'input' || item.type === 'number'">
        <div style="word-break: break-all">{{ formData[item.prop] }}</div>
      </template>
      <template v-else-if="item.type === 'datePicker'">
        <div style="word-break: break-all">{{ formData[item.prop] }}</div>
      </template>
      <template v-else-if="item.type === 'cascader'">
        <div style="word-break: break-all">{{ cascaderValue(item, formData) }}</div>
      </template>

      <template v-else-if="item.type === 'select'">
        {{ selectValue(item.selectOptions, formData[item.prop]) }}
      </template>
      <div v-else-if="item.type === 'file'" style="width: 100%">
        <FileUpload :file-list.sync="formData[item.prop]" disabled />
      </div>
      <slot v-else-if="item.type === 'slot'" :name="item.prop" v-bind="item" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose, computed } from 'vue'
import FileUpload from '@/components/MyForm/FileUpload.vue'
const props = withDefaults(defineProps<{ formConf: any[]; formData: any; title: string }>(), {
  title: undefined
})
const formConf = ref(props.formConf)
const form = ref()
const submitForm = () => {
  console.log('submitForm')
  let state = false
  form.value.validate((valid: any) => {
    if (valid) {
      state = true
    }
  })
  return state
}
const cascaderValue = computed(() => (conf: any, data: any) => {
  if (!data[conf.prop]) {
    return ''
  }
  const valList: any = []
  let list = conf.otherProps.options
  data[conf.prop].forEach((item: any, index: any) => {
    list.forEach(({ value, label, children }: { value: any; label: any; children: any }) => {
      if (value === item) {
        valList[index] = label
        list = children
      }
    })
  })
  return conf.otherProps['show-all-levels'] === false ? valList[valList.length - 1] : valList.join('/')
})
const selectValue = (options: any, value: any) => {
  const item = options?.filter((item: any) => item.value === value)
  return item?.[0]?.label ?? ''
}

defineExpose({ submitForm })
</script>

<style lang="less">
.el-descriptions-item__content {
  flex: 1;
}
</style>
