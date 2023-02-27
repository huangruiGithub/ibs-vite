<template>
  <div class="orgChart">
    <div id="orgTree" ref="orgTree" style="height: 100%">
      <vue3-tree-org
        :data="props.orgChartData"
        :horizontal="true"
        :collapsable="true"
        :label-style="{ width: '100%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas'
const props = defineProps({
  orgChartData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 点击生成图片
const generatorImage = () => {
  console.log(props.orgChartData)
  const mainCanvas = document.getElementById('orgTree')
  html2canvas(mainCanvas as HTMLElement).then((canvas: any) => {
    // this.$refs.addImage.append(canvas);//在下面添加canvas节点
    const link = document.createElement('a')
    link.href = canvas.toDataURL() // 下载链接
    link.setAttribute('download', '架构图.png')
    link.style.display = 'none' // a标签隐藏
    document.body.appendChild(link)
    link.click()
  })
}
const toggleExpand = (data: any, val: boolean) => {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      item['expand'] = val
      if (item.children) {
        toggleExpand(item.children, val)
      }
    })
  } else {
    data['expand'] = val
    if (data.children) {
      toggleExpand(data.children, val)
    }
  }
}
defineExpose({ toggleExpand, generatorImage })
</script>

<style lang="less" scoped>
.orgChart {
  height: 100%;
  :deep(.org-tree-node-label) {
    .org-tree-node-label-inner {
      box-shadow: none;
      border: 1px solid #dddddd;
    }
    background-color: #fff;
    white-space: nowrap;
  }
  .bg-white {
    background-color: red;
    box-shadow: none;
  }
}
:deep(.tree-org-node__content) .tree-org-node__text {
  padding: 10px 15px;
  white-space: nowrap;
}
</style>
