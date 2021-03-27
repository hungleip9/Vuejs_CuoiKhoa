<template>
  <div class="hello">
    <div class="container">
      <div class="header">
        <div class="logo" @click="goToHome()">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="">
        </div>
        <div class="avatar" @click="openSetting()">
          <el-avatar>
            <img v-if="avatarUrl" :src="avatarUrl" alt="" style="width:38px">
            <img v-else src="../assets/images/default-avatar2.png" alt="">
          </el-avatar>
        </div>
        <div class="user-setting" ref="usersetting">
          <div class="user-top">
            Tài khoản
            <hr>
          </div>
          <div class="user-info" @click="openProfile()">
            <el-avatar>
              <img v-if="avatarUrl" :src="avatarUrl" alt="" style="width:38px">
              <img v-else src="../assets/images/default-avatar2.png" alt="">
            </el-avatar>
            <div class="name-mail">
              <div class="name">{{user.name}}</div>
              <br>
              <span class="email">{{user.email}}</span>
            </div>
          </div>
          <hr>
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
import api from "@/api";

export default {
  data () {
    return {
      user: [],
      baseUrl: 'http://vuecourse.zent.edu.vn/storage/users/',
      avatarUrl: ''
    }
  },
  name: "AdminLayout",
  computed: {
    ...mapState('auth', ['isAuthenticated', 'authUser']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser']),
    openSetting() {
      if (this.$refs.usersetting.style.visibility == 'visible')
        this.$refs.usersetting.style.visibility = 'hidden'
      else this.$refs.usersetting.style.visibility = 'visible'
    },
    openProfile() {
      this.$router.replace('/profile');
      if (this.$refs.usersetting.style.visibility == 'visible')
        this.$refs.usersetting.style.visibility = 'hidden'
      else this.$refs.usersetting.style.visibility = 'visible'
    },
    goToHome() {
      this.$router.push('/path/home')
    },
    handlelogout() {
      localStorage.removeItem('access_token')
      this.updateLoginStatus(false)
      this.updateAuthUser({})
      if (this.$router.currentRoute.name !== 'Login') {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.user = response.data
        if (response.data.avatar) {
          this.avatarUrl = this.baseUrl + response.data.avatar
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
  .container {
    height: 100vh;
    background-image: url("https://advsolutions.vn/wp-content/uploads/2020/01/background-powerpoint-don-gian-20-2.jpg");
    background-size: cover;
    .header {
      width: 100%;
      height: 40px;
      padding: 4px;
      box-sizing: border-box;
      background: rgb(201 212 212 / 47%);
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
        z-index: 50;
        .user-info {
          justify-content: left;
          display: flex;
          padding: 4px 0;
          height: 40px;
          cursor: pointer;
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
        .user-info:hover {
          background-color: #d4d7da;
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