<template>
  <div class="profileWrap">
    <div class="page-header">
      <div class="page-title">
        Thay đổi mật khẩu
      </div>
    </div>
    <div class="main-content">
      <div class="user-profile">
        <div class="loginWrap">
          <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="password">
              <label style="float: left" ><span style="color: #f54b5e">*</span> Mật khẩu mới</label>
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <label style="float: left" ><span style="color: #f54b5e">*</span> Xác nhận mật khẩu</label>
              <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
          </el-form>
          <div class="forgotPass">
            <el-button @click="profile()">Quay lại</el-button>
          </div>
          <button class="btn-login" @click="changePassword('ruleForm')">
            ĐỔI MẬT KHẨU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: 'PasswordSetting',
  data() {
    var confirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Yêu cầu xác nhận mật khẩu'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('Mật khẩu không chính xác!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPass: '',
      },
      rules: {
        password: [
          { required: true, message: 'Mật khẩu không được bỏ trống!', trigger: 'change' },
          { min: 6, message: 'Mật khẩu không được ít hơn 6 kí tự', trigger: 'blur' },
        ],
        checkPass: [
          { validator: confirm, trigger: 'blur' }
        ],
      },
      label: 'top',
    }
  },
  methods: {
    profile() {
      this.$router.push('/path/home')
    },
    changePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            password: this.ruleForm.password,
            password_confirmation: this.ruleForm.checkPass
          }
          api.changePassword(data).then(() => {
            this.$message({
              message: 'Cập nhật thành công!',
              type: 'success'
            });
            this.$router.push('/path/home')
          }).catch(() => {
            this.$message({
              message: 'Cập nhật thất bại!',
              type: 'error'
            });
          })
        }
      });
    },
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.user = response.data
        this.ruleForm.email = response.data.email
        this.ruleForm.name = response.data.name
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.profileWrap {
  height: 95vh;
  .page-header {
    height: auto;
    overflow: hidden;
    .page-title {
      margin: 7px;
      padding: 7px;
      float: left;
      background-color: $colorGray;
      color: #5e6c84;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .main-content {
    margin: 0 7px;
    .user-profile {
      width: 444px;
      height: auto;
      margin: 0 auto;
      background: #ffffff;
      .loginWrap {
        width: 444px;
        padding: 24px;
        background-color: #ffffff;
        border-radius: 10px;
        box-sizing: border-box;
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
          background-color: $colorBlue;
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
