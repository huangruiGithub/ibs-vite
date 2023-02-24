<template>
  <div class="departmentTree">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      style="padding-bottom: 10px"
    />
    <el-tree
      ref="tree"
      :data="departmentTree"
      default-expand-all
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div
          v-if="props.edit"
          style="width: 100%; position: relative; bottom: 3px"
          @mouseenter="mouseenter(data)"
          @mouseleave="mouseleave(data)"
        >
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          <div class="treeLabel">{{ data.label }}</div>
          <el-popover
            id="popoverDiv"
            :visible="data.popoverShow"
            popper-class="departmentPopover"
            placement="right"
            :width="200"
          >
            <div>
              <Close
                class="popoverCloseIcon"
                @click="data.popoverShow = false"
              />
            </div>
            <ul v-show="popoverType === 'index'" class="popoverUl">
              <li class="popoverItem" @click="popoverType = 'editName'">
                修改名称
              </li>
              <li
                v-show="data.areaName !== '' && !data.company"
                class="popoverItem"
                style="cursor: not-allowed; background-color: #efefef"
              >
                已设置地区:{{ data.areaName }}
              </li>
              <li
                v-show="data.isTop && data.areaName === ''"
                class="popoverItem"
                @click="popoverType = 'editArea'"
              >
                设置地区
              </li>
              <li class="popoverItem" @click="clickAddDept">
                {{ data.company ? '添加部门' : '添加子部门' }}
              </li>
              <li
                v-show="!data.company"
                class="popoverItem"
                style="color: red"
                @click="clickDeleteDept"
              >
                删除
              </li>
            </ul>
            <div v-show="popoverType === 'editName'" class="editName">
              <el-input v-model="editDeptName" placeholder="请输入部门名称" />
              <el-button plain class="popoverBtn" @click="popoverType = 'index'"
                >取 消</el-button
              >
              <el-button
                type="primary"
                class="popoverBtn"
                @click="submitSetName(data)"
                >确 定</el-button
              >
            </div>
            <div v-show="popoverType === 'editArea'" class="editName">
              <el-cascader
                v-model="areaChoose"
                :options="areaOptions"
                placeholder="请选择地区"
                :props="cascaderProps"
              />
              <el-button plain class="popoverBtn" @click="popoverType = 'index'"
                >取 消</el-button
              >
              <el-button
                type="primary"
                class="popoverBtn"
                @click="submitSetArea(data)"
                >确 定</el-button
              >
            </div>
            <template #reference>
              <div style="display: inline-block">
                <svg-icon
                  v-show="data.show"
                  icon-class="treeUnfold"
                  class="iconTreeUnfold"
                  @click="iconClick(data)"
                />
              </div>
            </template>
          </el-popover>
        </div>
        <div v-if="!edit">
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          <span style="padding-left: 15px">{{ node.label }}</span>
        </div>
      </template>
    </el-tree>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="400px"
      :before-close="handleClose"
    >
      <div class="formLabel">部门名称：</div>
      <el-input
        v-model="addDeptName"
        :placeholder="
          dialogTitle === '添加部门' ? '请输入部门名称' : '请输入子部门名称'
        "
        style="width: 250px"
      />
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddDept()">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  updateCompanyName,
  addDepartmentNode,
  setDepartmentName,
  deleteDepartmentNode,
  getDepartmentNodeTree,
  getAreaCode,
  setDepartmentArea
} from '@/api/system-management'
import { ref, reactive, watch } from 'vue'
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { Close, OfficeBuilding } from '@element-plus/icons-vue'
import { arrAssign, objAssign } from '@/utils/index'
const emit = defineEmits(['nodeClick', 'getTreeData'])
const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  }
})
const tree = ref()
const cascaderProps = {
  expandTrigger: 'click'
}
const filterText = ref('')
watch(filterText, (val) => {
  tree.value.filter(val)
})
const defaultProps = {
  children: 'children',
  label: 'label'
}
interface DepartmentDataProps {
  children?: DepartmentDataProps[]
  id: number | null
  label?: string
  company?: boolean
  expand?: boolean
  show?: boolean
  isTop?: boolean
  popoverShow?: boolean
}
let departmentTree: DepartmentDataProps[] = reactive([])
const init = () => {
  getDepartmentNodeTree().then((res: any) => {
    emit('getTreeData', res.data)
    departmentTree.length = 0
    setTreeData(res.data)
    departmentTree.push(res.data)
  })
}
const setTreeData = (data: any) => {
  data['show'] = false
  data['popoverShow'] = false
  for (const item of data.children) {
    setTreeData(item)
  }
}
init()
//设置地区
const areaOptions: any[] = reactive([])
const areaChoose = ref<string[]>([])
getAreaCode().then((res: any) => {
  arrAssign(areaOptions, res.data)
})
const submitSetArea = (data: DepartmentDataProps) => {
  if (areaChoose.value.length === 0) {
    ElMessage({
      type: 'info',
      message: '选择地区必填!'
    })
    return
  }
  const obj = {
    departmentId: data.id,
    areaCode: areaChoose.value[areaChoose.value.length - 1]
  }
  console.log(areaChoose.value)
  ElMessageBox.confirm(
    '是否确认选择该地区，该地区信息作为获取当地气温数据的参数，确定后不可修改?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      setDepartmentArea(obj).then(() => {
        ElNotification({
          title: '成功',
          message: '设置部门地区成功',
          type: 'success'
        })
        popoverHide()
        init()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消设置'
      })
    })
}
//编辑名称
const setParentId = ref(0)
const editDeptName = ref('')
const submitSetName = (data: DepartmentDataProps) => {
  findPearntId(departmentTree, data.id)
  if (popoverNode.company) {
    const obj = {
      companyName: editDeptName.value,
      companyId: data.id,
      parentId: setParentId.value
    }
    updateCompanyName(obj).then(() => {
      ElNotification({
        title: '成功',
        message: '修改公司名称成功',
        type: 'success'
      })
      popoverHide()
      init()
    })
  } else {
    const obj = {
      departmentName: editDeptName.value,
      departmentId: data.id,
      parentId: setParentId.value
    }
    setDepartmentName(obj).then(() => {
      ElNotification({
        title: '成功',
        message: '修改部门名称成功',
        type: 'success'
      })
      popoverHide()
      init()
    })
  }
}
const findPearntId = (treeData: any[], id: number | null) => {
  for (const item of treeData) {
    if (item.id === id) {
      setParentId.value = item.id
    }
    for (const children of item.children) {
      if (children.id === id) {
        setParentId.value = item.id
      } else {
        findPearntId(children.children, id)
      }
    }
  }
}
//新增删除部门
const dialogVisible = ref(false)
const dialogTitle = ref('')
let addNode: DepartmentDataProps = reactive({
  id: null,
  label: ''
})
const addDeptName = ref('')
const clickAddDept = () => {
  if (popoverNode.company) {
    dialogTitle.value = '添加部门'
  } else {
    dialogTitle.value = '添加子部门'
  }
  dialogVisible.value = true
  addNode = popoverNode
}
const clickDeleteDept = () => {
  ElMessageBox.confirm(
    '此操作将永久删除该"' + popoverNode.label + '"与其子部门, 是否确定要删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      popoverNode.id &&
        deleteDepartmentNode(popoverNode.id).then(() => {
          ElNotification({
            title: '成功',
            message: '删除部门成功',
            type: 'success'
          })
          popoverHide()
          init()
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
const dialogAddDept = () => {
  const obj = {
    name: addDeptName.value,
    parentId: addNode.company ? null : addNode.id
  }
  addDepartmentNode(obj).then(() => {
    ElNotification({
      title: '成功',
      message: '添加子部门成功',
      type: 'success'
    })
    dialogVisible.value = false
    init()
  })
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认取消' + dialogTitle.value + '？').then(() => {
    done()
  })
}
// 以下树函数
const filterNode = (value: any, data: any) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

// popover相关
let popoverNode: DepartmentDataProps = reactive({
  id: null,
  label: '',
  company: false,
  show: false
})
const popoverType = ref('index')
const nodeClick = (node: any) => {
  editDeptName.value = ''
  addDeptName.value = ''
  emit('nodeClick', node)
}
const mouseenter = (node: DepartmentDataProps) => {
  node['show'] = true
}
const mouseleave = (node: DepartmentDataProps) => {
  if (popoverNode.id !== null && popoverNode.id === node.id) {
    node['show'] = true
  } else {
    node['show'] = false
  }
}
const popoverShow = (data: DepartmentDataProps) => {
  const flag = data.popoverShow
  setTreeData(departmentTree[0])
  data.popoverShow = !flag
  data.show = !flag
  popoverNode.company = false
  objAssign(popoverNode, data)
}
const popoverHide = () => {
  setTreeData(departmentTree[0])
  popoverNode.id = null
  popoverType.value = 'index'
}
const iconClick = (data: DepartmentDataProps) => {
  if (data.popoverShow) {
    popoverHide()
  } else {
    popoverShow(data)
  }
}
</script>
<style lang="less">
.popoverCloseIcon {
  height: 15px;
  width: 15px;
  margin: 3px;
  margin-left: 175px;
  // right: 0px;
  // position: absolute;
  cursor: pointer;
}
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
.departmentTree {
  display: flex;
  flex-direction: column;
  height: 100%;
  .treeBox {
    flex: 1;
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
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      background: #ecf5ff;
    }
  }
  .treeLabel {
    display: inline-block;
    position: relative;
    top: 12px;
    padding-left: 15px;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  :deep(.el-input-group__append) {
    padding: 0px 10px;
  }
  .iconTreeUnfold {
    padding-left: 10px;
    font-size: 21px;
    padding-top: 0.4rem;
    position: relative;
    bottom: 2px;
    outline: 0 !important;
  }
}
.formLabel {
  display: inline-block;
  margin-bottom: 20px;
}
</style>
