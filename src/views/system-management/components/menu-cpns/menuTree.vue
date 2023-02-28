<template>
  <div class="menu-tree">
    <!-- 搜索输入框 -->
    <el-input v-model="serachVal" class="search-input" placeholder="输入关键字进行过滤">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>

    <el-tree
      ref="treeRef"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
    >
      <template v-slot="slotData">
        <el-icon><OfficeBuilding /></el-icon>
        <span>{{ slotData.data.label }}</span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const serachVal = ref('')

const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(serachVal, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const treeData: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]
</script>
<style lang="less" scoped>
.menu-tree {
  .search-input {
    height: 32px;
  }
  .filter-tree {
    margin-top: 16px;
  }
}
</style>
