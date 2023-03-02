<template>
  <el-form ref="form" :model="formData" label-suffix="：" :rules="rules" v-bind="$attrs">
    <el-row :key="key" :gutter="10">
      <el-col v-for="(item, index) in formConf" :key="index" :span="item.span ? item.span : 24">
        <slot v-if="item.type === 'title'" name="title" v-bind="item" />

        <el-form-item v-else-if="!item.hide" v-bind="item">
          <el-input
            v-if="item.type === 'input'"
            v-model.trim="formData[item.prop]"
            class="type-input"
            :class="
              item.otherProps?.['show-word-limit'] &&
              item.otherProps.type !== 'textarea' &&
              'inner-padding' + item.otherProps.paddingRight
            "
            :placeholder="
              item.otherProps?.placeholder !== undefined ? item.otherProps.placeholder : '请输入' + item.label
            "
            v-bind="item.otherProps"
            :style="{ width: item.width ? item.width + 'px' : undefined }"
          >
            <template v-if="item.unit" slot="append">{{ item.unit }}</template>
          </el-input>

          <el-select
            v-else-if="item.type === 'select'"
            v-model="formData[item.prop]"
            :clearable="item.otherProps?.clearable !== undefined ? item.otherProps?.clearable : true"
            :placeholder="
              item.otherProps?.placeholder !== undefined ? item.otherProps.placeholder : '请选择' + item.label
            "
            v-bind="item.otherProps"
          >
            <el-option
              v-for="option in item.selectOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-cascader
            v-else-if="item.type === 'cascader'"
            v-model="formData[item.prop]"
            :clearable="item.otherProps?.clearable !== undefined ? item.otherProps?.clearable : true"
            :placeholder="
              item.otherProps?.placeholder !== undefined ? item.otherProps.placeholder : '请选择' + item.label
            "
            v-bind="item.otherProps"
          ></el-cascader>

          <div v-else-if="item.type === 'number'" class="type-number">
            <el-input-number
              v-model.trim="formData[item.prop]"
              style="text-align: left"
              :class="item.unit ? 'hasUnit' : ''"
              v-bind="item.otherProps"
            ></el-input-number>
            <span v-if="item.unit" class="unit">{{ item.unit }}</span>
          </div>
          <slot v-else-if="item.type === 'file'" :name="item.prop" v-bind="item" />

          <slot v-else-if="item.type === 'slot'" :name="item.prop" v-bind="item" />

          <el-date-picker
            v-else-if="item.type === 'datePicker'"
            v-model="formData[item.prop]"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            v-bind="item.otherProps"
          ></el-date-picker>
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="formData[item.prop]"
            active-color="#ff4949"
            inactive-color="#1677FF"
            active-text="异常"
            inactive-text="正常"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
          <span v-else>{{ formData[item.prop] }}</span>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose, watch } from 'vue'
import { ElForm } from 'element-plus'
import type { formConfType } from './type'
import _ from 'loadsh'

interface propsType {
  formConf: formConfType[]
  rules: object
  formData: any
}
const props = withDefaults(defineProps<propsType>(), {
  rules: () => ({})
})
const formConf = ref(props.formConf)
const key = ref(Math.random())
watch(
  () => props.formConf,
  (newval, preval) => {
    formConf.value = _.cloneDeep(newval)
    key.value = Math.random()
    console.log(key.value, newval, preval, 'watchtablelabel')
  },
  {
    deep: true
  }
)
const form = ref<InstanceType<typeof ElForm>>()
const submitForm = () => {
  return form.value?.validate()
}
defineExpose({ submitForm, form })
form.value
</script>

<style lang="less" scoped>
.el-select,
.el-cascader {
  width: 100%;
}
.type-number {
  position: relative;
  display: flex;
  align-items: baseline;
  .el-input-number {
    &.hasUnit {
      :deep(.el-input__inner) {
        border-radius: 4px 0 0 4px;
      }
    }
    :deep(.el-input__inner) {
      text-align: left;
    }
    flex: 1;
  }
  .unit {
    padding: 0 5px;
    background-color: rgb(245, 247, 250);
    border: 1px solid #dcdfe6;
    border-left: none;
    height: 32px;
    line-height: 32px;
    border-radius: 0 4px 4px 0;
  }
}
:deep(.el-textarea__inner) {
  padding-right: 52px;
}
</style>
