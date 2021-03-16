<template>
  <div class="hello">
    <div class="container">
      <div class="header">
        <div class="logo" @click="goToHome()">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="">
        </div>
        <div class="avatar" @click="openSetting()">
          <el-avatar>
            <img src="https://lh3.googleusercontent.com/-5fAshoFGq7M/W9NftV8GiKI/AAAAAAAACI4/VJ60JbnPmnkwZ4sEcXTKDdN2ZUBO1OUPQCEwYBhgLKtQDAL1OcqxI_mvzWIoyAusUEkm31QGcE8Oe1RdBSL2Z-5t-snh4qTqTv_opU4LzVsQU-njwndsOmNlVyIsRulMIFK3xUHUWJlkDobuY6UT0LeAt0F32pvynWd09l6LF1Rz6tF6dlMrTgQbNwqjwS9ZZxancdYJHWLX6Gy-2MN5KNsk0cO2cQe1sV1wUgkpKMh2qQE7zpRlll2SUXROlcNXpA1LunW3rRVxvYVlWh3EvHtiovDqmJR3PRmubWw29BWyCA2_AXuzk7IMZamCT8YV_bneTsj54Vsn4rjQajtyF75KL5XgSv_RPfbtZHS09Ed5gqS1TEiOhsXyfKEXKXoLcNFNS1WwGauWTKA1AMIk3BTV8axtAsZq2AQKYwO58Y4vLFAypHHbkTAPbctF-5YdMhEwN9GphKLppx0zo17V0f-MAuotxBPbxn0osczz-6lmSOyaygieZbTzcov6AGdfR_q6CYF0HtfAHt_u0ezTHYSUjtnpZRhNnHMuAhU2qwrUFv3aYuBBE72Y3IZRweyWeLI__D8w54bI0tJ5Vk1kIaw4A-Jo5oXhLLCyRVieEsrRlCSgfp5RpWFYF4ldm2PlfUyq_8-ERPfH5gCXElmeGLo36K1-oMOvNvYIG/w140-h140-p/97ac7c16-6fdb-4d44-abc8-d37d219bd229" alt="">
          </el-avatar>
        </div>
        <div class="user-setting" ref="usersetting">
          <div class="user-top">
            
          </div>
          <div class="user-info">
            <el-avatar>
              <img src="https://lh3.googleusercontent.com/-5fAshoFGq7M/W9NftV8GiKI/AAAAAAAACI4/VJ60JbnPmnkwZ4sEcXTKDdN2ZUBO1OUPQCEwYBhgLKtQDAL1OcqxI_mvzWIoyAusUEkm31QGcE8Oe1RdBSL2Z-5t-snh4qTqTv_opU4LzVsQU-njwndsOmNlVyIsRulMIFK3xUHUWJlkDobuY6UT0LeAt0F32pvynWd09l6LF1Rz6tF6dlMrTgQbNwqjwS9ZZxancdYJHWLX6Gy-2MN5KNsk0cO2cQe1sV1wUgkpKMh2qQE7zpRlll2SUXROlcNXpA1LunW3rRVxvYVlWh3EvHtiovDqmJR3PRmubWw29BWyCA2_AXuzk7IMZamCT8YV_bneTsj54Vsn4rjQajtyF75KL5XgSv_RPfbtZHS09Ed5gqS1TEiOhsXyfKEXKXoLcNFNS1WwGauWTKA1AMIk3BTV8axtAsZq2AQKYwO58Y4vLFAypHHbkTAPbctF-5YdMhEwN9GphKLppx0zo17V0f-MAuotxBPbxn0osczz-6lmSOyaygieZbTzcov6AGdfR_q6CYF0HtfAHt_u0ezTHYSUjtnpZRhNnHMuAhU2qwrUFv3aYuBBE72Y3IZRweyWeLI__D8w54bI0tJ5Vk1kIaw4A-Jo5oXhLLCyRVieEsrRlCSgfp5RpWFYF4ldm2PlfUyq_8-ERPfH5gCXElmeGLo36K1-oMOvNvYIG/w140-h140-p/97ac7c16-6fdb-4d44-abc8-d37d219bd229" alt="">
            </el-avatar>
            <div class="name-mail">
              <div class="name">Lê Quang Hùng</div>
              <br>
              <span class="email">hungleip9@gmail.com</span>
            </div>
          </div>
          
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
      this.$router.push('/path/profile')
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
    background-image: url("https://wallpaperaccess.com/full/4584352.jpg");
    background-size: cover;
    .header {
      width: 100%;
      height: 55px;
      padding: 4px;
      box-sizing: border-box;
      background-image: linear-gradient(to bottom right, #648455, #5a9e98);
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        width: 90px;
        opacity: 0.5;
        cursor: pointer;
        img {
          width: 80px;
          height: 60px;
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
          width: 50px;
          height: 50px;
          line-height: 32px;
          position: absolute;
          top: -9px;
          right: 10px;
          border: 1px solid white;
          box-shadow: 0 0 15px black;
        }
      }
      .user-setting {
        position: absolute;
        top: 55px;
        right: 2px;
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