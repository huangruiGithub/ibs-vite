<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <img src="../../assets/home_images/logo.png" class="imgCSS" />
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="title">
      <span class="division">|</span>
      高档数控机床综合业务系统
    </div>
    <div class="right-menu">
      <div class="btnDiv">
        <img src="../../assets/home_images/person_info.png" class="imgCSS" />
        <div class="TopbarText" @click="editPassword">{{ $store.state.user.name }}</div>
      </div>
      <div class="btnDiv" @click="clickLogout()">
        <img src="../../assets/home_images/logout.png" class="imgCSS" style="position: relative; bottom: 3px" />
        <div class="TopbarText">退出</div>
      </div>
    </div>
    <editPassword v-if="showEditPassword" ref="editPassword" @closeEditPassword="closeEditPassword" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import editPassword from '@/components/dialogChoose/editPassword'

import { logout } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    editPassword
  },
  data() {
    return {
      showEditPassword: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    editPassword() {
      this.showEditPassword = true
      this.$nextTick(() => {
        this.$refs.editPassword.is()
      })
    },
    closeEditPassword() {
      this.showEditPassword = false
    },
    clickLogout() {
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
          setTimeout(() => {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }, 50)
          this.$message({
            type: 'success',
            message: '退出登录成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #0062ff;
  padding: 18px 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .imgCSS {
    padding-left: 20px;
  }
  .title {
    display: inline-block;
    padding-left: 20px;
    position: relative;
    bottom: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    .division {
      margin-right: 14px;
      position: relative;
      bottom: 1px;
    }
  }
  .TopbarText {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    bottom: 5px;
    color: #ffffff;
  }
  div :hover {
    // font-size: 20px;
  }
  .btnDiv {
    display: inline-block;
    cursor: pointer;
    position: relative;
    bottom: 8px;
  }
  .hamburger-container {
    margin-top: 3px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 55px;
    margin-right: 24px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
