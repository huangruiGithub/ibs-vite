<template>
  <div style="height: 100px">
    1233
    {{ title }}
    <router-view></router-view>
  </div>
  <!-- <div :class="classObj" class="app-wrapper">
    <topbar />
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div> -->
</template>
<script setup lang="ts">
const title = 'layout'
</script>

<!-- <script>
import { Sidebar, AppMain, TagsView, Topbar, TabsBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Socket from '@/utils/webSocket.js'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    TagsView,
    AppMain,
    Topbar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      messageWebsocket: null
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  destroyed() {},
  mounted() {},
  methods: {
    getMessageTitle(type) {
      switch (type) {
        case 1:
          return '设备预约申请'
        case 2:
          return '预约时间被修改'
        case 3:
          return '预约被拒绝'
        case 4:
          return '预约被批准'
        case 5:
          return '设备报警'
        case 6:
          return '值班操作'
        case 8:
          return '设备状态改变'
        default:
          return '特殊类型'
      }
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script> -->

<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';

// .app-wrapper {
//   @include clearfix;
//   position: relative;
//   // height: 100%;
//   height: $contentHeight;
//   width: 100%;
//   &.mobile.openSidebar {
//     position: fixed;
//     top: 0;
//   }
// }
// .drawer-bg {
//   background: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - #{$sideBarWidth});
//   transition: width 0.28s;
// }

// .hideSidebar .fixed-header {
//   width: calc(100% - 54px);
// }

// .mobile .fixed-header {
//   width: 100%;
// }
</style>
