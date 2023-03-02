<template>
  <el-cascader
    v-model.trim="modelValue"
    placeholder="请选择地区"
    :options="regionData"
    clearable
    @change="handleChange"
  ></el-cascader>
</template>

<script>
// import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: 'IbsWebRegionSelection',
  props: {
    value: {
      default: undefined
    },
    conf: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      regionData
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value ?? undefined
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  mounted() {},

  methods: {
    handleChange(val) {
      this.$emit('codeToText', CodeToText[val[0]], CodeToText[val[1]], CodeToText[val[2]])
    }
  }
}
</script>

<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
</style>
