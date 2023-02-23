<template>
  <div>
    <TestTable :table-data="[{ a: 1, b: 2 }]" :table-label="tableLabel" />
  </div>
</template>

<script setup lang="ts">
import TestTable from './index.vue'
import type { selectOptionType, tableLabelType } from './type'
import { computed, reactive } from 'vue'
const options = reactive<{ col2s: selectOptionType[] }>({ col2s: [] })

setTimeout(() => {
  options.col2s = [
    { label: 'value1', value: 1 },
    { label: 'value22', value: 2 }
  ]
}, 2000)
const tableLabel = computed((): tableLabelType[] => [
  {
    label: 'col1',
    prop: 'a',
    type: 'selectValue',
    selectOptions: [
      { label: 'value1', value: 1 },
      { label: 'value2', value: 2 }
    ]
  },
  {
    label: 'col2',
    prop: 'b',
    type: 'selectValue',
    selectOptions: options.col2s
  }
])
</script>

<style lang="less"></style>
