<template>
  <div class="form-table">
    <div class="table-wrap">
      <el-table
        ref="table"
        :key="key"
        size="default"
        :data="props.tableData"
        height="100%"
        :header-row-style="{ color: '#333' }"
        :header-cell-style="{
          background: '#fafafa',
          height: '54px',
          fontSize: '15px',
          color: '#000000'
        }"
        v-bind="$attrs"
      >
        <template v-for="item of props.tableLabel">
          <el-table-column
            v-if="item.type === 'selection'"
            :key="item.label || item.type"
            type="selection"
            v-bind="item"
          />
          <el-table-column
            v-if="item.type !== 'selection' && item.prop"
            :key="item.label || item.type"
            :column-key="item.columnKey ? item.columnKey : item.prop"
            :show-overflow-tooltip="item.showOverflowTooltip ?? true"
            v-bind="item"
          >
            <template #default="scope">
              <span v-if="item.type === 'input'" class="type-input">
                <el-input v-model.trim="scope.row[item.prop]" v-bind="item.otherProps">
                  <template v-if="item.unit" slot="append">{{ item.unit }}</template>
                </el-input>
              </span>
              <component
                :is="item.tag"
                v-else-if="item.type === 'component'"
                v-model="scope.row[item.prop]"
                v-bind="item.otherProps"
              ></component>
              <el-select v-else-if="item.type === 'select'" v-model="scope.row[item.prop]" placeholder="请选择">
                <el-option
                  v-for="selectOption in item.selectOptions"
                  :key="selectOption.value"
                  :label="selectOption.label"
                  :value="selectOption.value"
                ></el-option>
              </el-select>
              <span v-else-if="item.type === 'selectValue'">
                {{ selectValue(item.selectOptions, scope.row[item.prop]) }}
              </span>
              <el-tag
                v-else-if="
                  item.type === 'tag' && tagValue(item.tagOptions, scope.row[item.prop])?.label !== undefined
                "
                v-bind="item.otherProps"
                :type="tagValue(item.tagOptions, scope.row[item.prop])?.type"
              >
                {{ tagValue(item.tagOptions, scope.row[item.prop])?.label }}
              </el-tag>

              <div v-else-if="item.type === 'number'" class="type-number">
                <el-input-number
                  v-model.trim="scope.row[item.prop]"
                  :class="item.unit ? 'hasUnit' : ''"
                  v-bind="item.otherProps"
                ></el-input-number>
                <span v-if="item.unit" class="unit">{{ item.unit }}</span>
              </div>

              <span v-else-if="item.type === 'index'">
                {{ tableIndex(scope.$index, item.index) }}
              </span>
              <span
                v-else-if="item.type === 'time'"
                v-html="formatterDate(scope.row[item.prop], item.format)"
              ></span>
              <slot v-else-if="item.type === 'slot'" :name="item.prop" v-bind="scope" :label="item" />

              <slot v-else-if="item.type === 'expand'" name="expand" v-bind="scope" :label="item" />
              <span v-else v-html="dataValue(scope, item)"></span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div v-if="props.pagination" class="pagination">
      <el-pagination
        :size="$attrs.size ? $attrs.size : 'medium'"
        :current-page="props.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="props.pageSize"
        background
        layout="total, prev, pager, next, sizes, jumper"
        :total="props.tableTotalSize ?? 0"
        class="page"
        @size-change="pageSizeChange"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
// import _ from 'lodash'
import type { selectOptionType, tagOptionType, indexType, tableLabelType } from './type'
interface propsType {
  tableLabel: tableLabelType[]
  tableData: any[]
  pagination?: boolean
  currentPage?: number
  pageSize?: number
  tableTotalSize?: number
}
const props = withDefaults(defineProps<propsType>(), {
  tableData: () => [],
  tableLabel: () => [],
  currentPage: 1,
  pageSize: 10,
  tableTotalSize: 0,
  pagination: false
})
const key = ref(Math.random())
watch(
  () => props.tableLabel,
  (newval, preval) => {
    key.value = Math.random()
    console.log(newval, preval, 'watchtablelabel')
  }
)
const selectValue = computed(() => (options?: selectOptionType[], value?: string) => {
  const item = options?.find((item) => item.value === value)
  return item?.label ?? ''
})
const tagValue = computed(() => (options?: tagOptionType[], value?: string) => {
  const item: tagOptionType | undefined = options?.find((item) => item.value === value)
  return item
})
const tableIndex = computed(() => (index: number, formatterFn?: indexType) => formatterFn?.(index) ?? index)
const formatterDate = computed(() => (date: any, format?: string) => {
  format = format ?? 'YYYY-MM-DD<br>HH:mm:ss'
  return date ? dayjs(date).format(format) : ''
})
const dataValue = computed(() => (scope: any, label: tableLabelType) => {
  if (typeof label.valueFormat === 'function') {
    return label.valueFormat(scope, label)
  } else {
    const key: string = label.prop as string
    return scope.row[key]
  }
})

const emit = defineEmits(['getTableData', 'paginationChange', 'update:currentPage', 'update:pageSize'])
// 页面条数回调函数
const pageSizeChange = (val: number) => {
  emit('update:pageSize', val)
  emit('paginationChange')
}
// 页码修改回调函数
const pageChange = (val: number) => {
  emit('update:currentPage', val)
  emit('paginationChange')
}
const table = ref()
defineExpose({ table })
</script>

<style lang="scss" scoped>
.el-table {
  :deep(th.el-table__cell) > .cell {
    white-space: pre-line;
  }
}
.form-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
  .table-wrap {
    flex: 1;
    min-height: 200px;
    padding-bottom: 5px;
  }
  .pagination {
    height: 50px;
    display: flex;
    align-items: center;
    align-content: flex-end;
  }
}
.type-input {
  :deep(.el-input__inner) {
    padding: 0 5px;
  }
  :deep(.el-input-group__append) {
    padding: 0 5px;
  }
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
      padding: 0 3px;
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
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 2px;
}
:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  border-radius: 2px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
}
:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  box-shadow: inset 0 0 5px #eee;
  border-radius: 2px;
  background: #eee;
}
:deep(.el-tooltip__popper) {
  color: red;
}
:deep(.el-textarea__inner) {
  padding-right: 52px;
}
</style>
