<template>
  <div class="hello">
    <div class="container">
      <div class="header">
        <div class="logo" @click="goToHome()">
          <img src="../assets/images/blackpink.png" alt="">
        </div>
        <div class="avatar" @click="openSetting()">
          <el-avatar>
            <img src="../assets/images/mandoo.jpg" alt="">
          </el-avatar>
        </div>
        <div class="user-setting" ref="usersetting">
          <div class="user-top">
            Tài khoản
            <hr>
          </div>
          <div class="user-info">
            <el-avatar>
              <img src="../assets/images/mandoo.jpg" alt="">
            </el-avatar>
            <div class="name-mail">
              <div class="name">Nguyễn Quang Thành</div>
              <br>
              <span class="email">thanhnq@zent.vn</span>
            </div>
          </div>
          <hr>
          <div class="setting" @click="openProfile()">
            Cài đặt tài khoản
          </div>
          <div class="logout" @click="handlelogout()">
            Đăng xuất
          </div>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "AdminLayout",
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser']),
    openSetting() {
      if (this.$refs.usersetting.style.visibility == 'visible')
        this.$refs.usersetting.style.visibility = 'hidden'
      else this.$refs.usersetting.style.visibility = 'visible'
    },
    openProfile() {
      this.$router.push('profile')
    },
    goToHome() {
      this.$router.push('home')
    },
    handlelogout() {
      localStorage.removeItem('access_token')
      this.updateLoginStatus(false)
      this.updateAuthUser({})
      if (this.$router.currentRoute.name !== 'Login') {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background-image: url("../assets/images/bg-trello-2.jpg");
    background-size: cover;
    .header {
      width: 100%;
      height: 40px;
      padding: 4px;
      box-sizing: border-box;
      background: rgba(220 203 211 / 47%);
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        width: 90px;
        opacity: 0.5;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .logo:hover {
        opacity: 1;
      }
      .avatar {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 5px;
        cursor: pointer;
        .el-avatar {
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
      }
      .user-setting {
        position: absolute;
        top: 45px;
        right: 5px;
        background: #ffffff;
        visibility: hidden;
        width: 290px;
        height: auto;
        padding: 10px;
        border-radius: 3px;
        font-size: 13px;
        .user-info {
          justify-content: left;
          display: flex;
          padding: 4px 0;
          height: 40px;
          .name-mail {
            padding: 2px 2px 2px 7px;
            text-align: left;
            height: 50px;
            position: relative;
            .name {
              margin-top: 1px;
              font-size: 14px;
            }
            span {
              position: absolute;
              top: 25px;
              opacity: 0.5;
            }
          }
        }
        .setting, .logout {
          justify-content: left;
          display: flex;
          padding: 4px;
          cursor: pointer;
        }
        .setting:hover {
          background-color: #d4d7da;
        }
        .logout:hover {
          background-color: #d4d7da;
        }
      }
    }
  }
</style>