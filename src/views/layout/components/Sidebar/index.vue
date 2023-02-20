<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          @setActiveMenu="setActiveMenu"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      activeMenu: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    // activeMenu() {
    //   const route = this.$route
    //   const { meta, path } = route
    //   // if set path, the sidebar will highlight the path you set
    //   console.log(meta)
    //   if (meta.activeMenu) {
    //     return meta.activeMenu
    //   }
    //   return path
    // },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      // console.log(!this.sidebar.opened)
      // console.log(!this.sidebar.opened)
      return !this.sidebar.opened
    }
  },
  watch: {
    $route: {
      handler(route) {
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        this.activeMenu = meta.activeMenu ? meta.activeMenu : path
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    console.log(localStorage.getItem('single_token'), this.$store.state.user.single_token)
    // console.log(this.$router.options.routes)
    // document.addEventListener('visibilitychange', function (e) {
    //   let state = document.visibilityState
    //   if (state == 'hidden') {
    //     console.log(document.visibilityState, '用户离开了')
    //   }
    //   if (state == 'visible') {
    //     console.log(document.visibilityState, '回来了')
    //   }
    // })
  },
  methods: {
    setActiveMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      this.activeMenu = ''
      setTimeout(() => {
        this.activeMenu = meta.activeMenu ? meta.activeMenu : path
      })
    }
  }
}
</script>
