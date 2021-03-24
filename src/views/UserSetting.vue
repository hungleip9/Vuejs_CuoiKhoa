<template>
  <div class="profileWrap">
    <div class="page-header"></div>
    <div class="main-content">
      <div class="user-profile">
        <div class="loginWrap">
          <div class="profile-title">{{this.ruleForm.email}}</div>
          <div class="avatar">
            <label for="avatar" @mouseover="hoverAvatar" @mouseleave="hoverLeaveAvatar">
              <div class="avatarHover" ref="avatarHover">
                <i class="el-icon-picture-outline"></i>
              </div>
              <img v-if="avatarUrl" :src="avatarUrl" alt="" >
              <img v-else src="../assets/images/default-avatar2.png" alt="">
            </label>
            <input ref="userAvatar" type="file" accept="image/*" id="avatar" @change="handleChangeAvatar">
            <div v-if="avatarUrl" class="delete-avatar" @click="deleteAvatar">Xóa ảnh</div>
          </div>
          <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="name">
              <label style="float: left" ><span style="color: #f54b5e">*</span> Tên người dùng</label>
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
          <div class="forgotPass">
            <el-button @click="changePass">Đổi mật khẩu</el-button>
          </div>
          <button class="btn-login" @click="updateProfile('ruleForm')">
            CẬP NHẬT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { mapState, } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      ruleForm: {
        email: '',
        name: '',
      },
      rules: {
        name: [
          { required: true, message: 'Tên người dùng không được bỏ trống!', trigger: 'change' },
          { min: 1, message: 'Mật khẩu không được ít hơn 6 kí tự', trigger: 'blur' },
        ],
      },
      label: 'top',
      user: [],
      uploadAvatar: '',
      avatarUrl: '',
      baseUrl: 'http://vuecourse.zent.edu.vn/storage/users/'
    }
  },
  computed: {
    ...mapState('auth', ['authUser']),
  },
  methods: {
    changePass() {
      this.$router.push('password')
    },
    updateProfile(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const frmData = new FormData()
          frmData.append('name', this.ruleForm.name)
          if (this.uploadAvatar) {
            frmData.append('avatar', this.uploadAvatar)
          }
          api.updateUser(frmData).then((response) => {
            this.$message({
              message: 'Cập nhật thành công!',
              type: 'success'
            });
            this.$router.replace('/path/home');
            console.log(response)
            api.getAuthUser().then((response) => {
              if (response) {
                this.user = response.data
                this.ruleForm.email = response.data.email
                this.ruleForm.name = response.data.name
                this.avatarUrl = this.baseUrl + response.data.avatar
              }
            })
          }).catch(() => {
            console.log('sai')
          })
        }
      });
    },
    hoverAvatar() {
      this.$refs.avatarHover.style.display = 'flex'
    },
    hoverLeaveAvatar() {
      this.$refs.avatarHover.style.display = 'none'
    },
    handleChangeAvatar(e) {
      if (e.target.files.length) {
        this.uploadAvatar = e.target.files[0]
        this.avatarUrl = URL.createObjectURL(e.target.files[0])
        console.log(this.uploadAvatar)
      }
    },
    deleteAvatar() {
      this.uploadAvatar = ''
      this.avatarUrl = ''
    }
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.user = response.data
        this.ruleForm.email = response.data.email
        this.ruleForm.name = response.data.name
        this.avatarUrl = this.baseUrl + response.data.avatar
        console.log(response.data)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.profileWrap {
  height: 95vh;
  .page-header {
    height: 50px;
    .page-title {
      margin: 7px;
      padding: 7px;
      float: left;
      background: rgba(220 203 211 / 47%);
      color: #ffffff;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .main-content {
    margin: 0 7px;
    .user-profile {
      width: 500px;
      height: auto;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 10px;
      .loginWrap {
        position: relative;
        width: 500px;
        padding: 24px;
        background-color: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
        .profile-title {
          margin-bottom: 20px;
        }
        #avatar {
          display: none;
        }
        .avatarHover {
          background: rgb(144 154 154 / 47%);
          position: absolute;
          left: 151px;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          display: none;
          cursor: pointer;
        }
        .avatar {
          margin-bottom: 80px;
          img, .avatarHover {
            width: 200px;
            height: 200px;
            border-radius: 50%;
          }
          .delete-avatar {
            margin-top: 10px;
            color: #0080dd;
            cursor: pointer;
          }
        }
        .inputWrap {
          width: 100%;
          height: auto;
          overflow: hidden;
          .el-input {
            height: 50px !important;
          }
        }
        .forgotPass {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .el-button {
            border: 0;
            color: #0080dd;
            padding: 7px;
          }
        }
        .btn-login {
          width: 100%;
          height: 50px;
          background-image: linear-gradient(to bottom right, #648455, #5a9e98);
          color: #ffffff;
          border: 0;
          border-radius: 4px;
          margin-top: 24px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
