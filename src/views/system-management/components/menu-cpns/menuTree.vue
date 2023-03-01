<template>
  <div class="menu-tree">
    <!-- 搜索输入框 -->
    <el-input v-model="serachVal" class="search-input" placeholder="输入关键字进行过滤">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    <div class="filter-tree">
      <el-tree
        ref="treeRef"
        :data="props.treeData"
        :props="props.treeProps"
        default-expand-all
        :filter-node-method="filterNode"
      >
        <template v-slot="slotData">
          <el-icon><OfficeBuilding /></el-icon>
          <span style="margin-left: 4px">{{ slotData.data.label }}</span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  },
  treeProps: {
    type: Object,
    default: () => ({ children: 'children', label: 'label' })
  }
})

const serachVal = ref('')

const treeRef = ref<InstanceType<typeof ElTree>>()

watch(serachVal, (val: string) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>
<style lang="less" scoped>
.menu-tree {
  .search-input {
    height: 32px;
  }
  .filter-tree {
    overflow-y: auto;
    margin-top: 16px;
    height: calc(100vh - 172px);
  }
}
</style>
