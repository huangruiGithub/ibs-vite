<template>
  <div class="menu-tree">
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="padding-bottom: 10px" />
    <el-tree
      ref="tree"
      :data="menuTree"
      default-expand-all
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="nodeClick"
    >
      <template #default="{ data }">
        <div
          style="width: 100%; display: flex; align-items: center"
          @mouseenter="mouseenter(data)"
          @mouseleave="mouseleave(data)"
        >
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          <span style="padding-left: 15px">{{ data.label }}</span>
          <el-popover popper-class="departmentPopover" placement="right" :width="200" trigger="click">
            <ul v-show="popoverType === 'index'" class="popoverUl">
              <li class="popoverItem" @click="popoverType = 'editName'">修改名称</li>
            </ul>
            <div v-show="popoverType === 'editName'" class="editName">
              <el-input v-model="editDeptName" placeholder="请输入菜单名称" />
              <el-button plain class="popoverBtn" @click="popoverType = 'index'">取 消</el-button>
              <el-button type="primary" class="popoverBtn" @click="submitSetName(data)">确 定</el-button>
            </div>
            <template #reference>
              <el-icon size="18px">
                <svg-icon v-if="data.show && !data.system" name="treeUnfold" @click="popoverShow(data)" />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { loadTreeWithSystemName, setRightName } from '@/api/system-management'
import { ref, reactive, watch, nextTick } from 'vue'
import { ElNotification } from 'element-plus'
import { objAssign } from '@/utils/index'
import { OfficeBuilding } from '@element-plus/icons-vue'
//菜单架构图
const orgChart = ref()
let orgChartData: MenuDataProps = reactive({
  children: [],
  id: null,
  label: '',
  company: true,
  expand: true
})
const orgChartShow = ref(true)
const setOrgChart = (treeData: any) => {
  objAssign(orgChartData, treeData)
  if (orgChartShow.value) {
    orgChart.value?.toggleExpand(orgChartData, true)
  }
  orgChartShow.value = false
  setTimeout(() => {
    orgChartShow.value = true
    nextTick(() => {
      orgChart.value?.toggleExpand(orgChartData, true)
    })
  }, 100)
}
//菜单树
const tree = ref()
const filterText = ref('')
watch(filterText, (val) => {
  tree.value.filter(val)
})
const defaultProps = {
  children: 'children',
  label: 'label'
}
interface MenuDataProps {
  children?: MenuDataProps[]
  id: number | null
  label?: string
  company?: boolean
  expand?: boolean
  show?: boolean
}
let menuTree: MenuDataProps[] = reactive([])
const init = () => {
  loadTreeWithSystemName().then((res: any) => {
    menuTree.length = 0
    menuTree.push(res.data)
    setOrgChart(res.data)
  })
}
init()
//编辑名称
const editDeptName = ref('')
const submitSetName = (data: MenuDataProps) => {
  const obj = {
    rightName: editDeptName.value,
    rightId: data.id
  }
  setRightName(obj).then(() => {
    ElNotification({
      title: '成功',
      message: '修改菜单名称成功',
      type: 'success'
    })
    popoverHide(menuTree)
    window.localStorage.removeItem('emsRouter')
    window.location.reload()
    init()
  })
}
// 以下树函数
const filterNode = (value: any, data: any) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}
const nodeClick = (node: any) => {
  popoverHide(menuTree)
  node.show = true
  editDeptName.value = ''
  popoverNode = {
    id: null,
    label: ''
  }
}
// popover相关
let popoverNode: MenuDataProps = reactive({
  id: null,
  label: ''
})
const popoverType = ref('index')
const mouseenter = (node: MenuDataProps) => {
  node['show'] = true
}
const mouseleave = (node: MenuDataProps) => {
  if (popoverNode.id !== null && popoverNode.id === node.id) {
    node['show'] = true
  } else {
    node['show'] = false
  }
}
const popoverShow = (data: MenuDataProps) => {
  popoverNode = data
  popoverNode['show'] = true
}
const popoverHide = (treeData: MenuDataProps[]) => {
  popoverType.value = 'index'
  for (const item of treeData) {
    item['show'] = false
    if (item.children) {
      popoverHide(item.children)
    }
  }
}
</script>
<style lang="less">
.departmentPopover {
  padding: 0px !important;
  .popoverUl {
    margin: 0;
    padding: 0px;
    .popoverItem {
      list-style-type: none !important;
      padding: 0 15px;
      cursor: pointer;
      line-height: 40px;
    }
    .popoverItem:hover {
      background-color: #f0f7ff;
    }
  }
  :deep(.el-dialog__header) {
    padding: 20px 20px 10px 20px;
  }
  .editName {
    padding: 10px;
    width: 200px;

    :deep(.el-input__inner) {
      height: 35px;
      font-size: 14px;
    }
    .popoverBtn {
      margin-top: 10px;
      padding: 8px 25px;
    }
  }
}
</style>
<style lang="less" scoped>
.menu-tree {
  height: 100%;
  overflow: hidden;
  &:hover {
    overflow-y: overlay;
  }
  :deep(.el-dialog__title) {
    font-size: 17px;
  }
  :deep(.el-dialog__body) {
    padding: 10px 20px 20px;
  }
  :deep(.el-tree) {
    border-right: none;
    .el-tree-node__expand-icon {
      font-size: 18px;
      position: relative;
      left: 5px;
    }
    .tree-spt {
      padding-left: 15px;
    }
    .el-tree-node .is-current {
      background-color: #f5f7fa;
    }
    .el-tree-node__expand-icon {
      float: right;
      margin-right: 1.5625rem !important;
    }
    .el-tree-node__content {
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 16px;
    }
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background: #ecf5ff;
    }
  }
  :deep(.el-input-group__append) {
    padding: 0px 10px;
  }
  .iconTreeUnfold {
    padding-left: 10px;
    font-size: 21px;
    padding-top: 0.4rem;
    outline: 0 !important;
  }
}
</style>
