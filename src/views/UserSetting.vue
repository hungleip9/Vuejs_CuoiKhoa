<template>
  <div class="profileWrap">
    <div class="page-header">
      <div class="page-title">
        Thông tin tài khoản
      </div>
    </div>
    <div class="main-content">
      <div class="user-profile">
        <el-row>
          <el-col :span="12">a</el-col>
          <el-col :span="12">
            <div class="loginWrap">
              <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item prop="email">
                  <label style="float: left" ><span style="color: #f54b5e">*</span> Email</label>
                  <el-input v-model="ruleForm.email" disabled></el-input>
                </el-form-item>
                <el-form-item prop="name">
                  <label style="float: left" ><span style="color: #f54b5e">*</span> Tên người dùng</label>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-form>
              <div class="forgotPass">
                <el-button @click="forgotPass()">Đổi mật khẩu</el-button>
              </div>
              <button class="btn-login" @click="register('ruleForm')">
                CẬP NHẬT
              </button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: 'Home',
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
        email: '',
        password: '',
        checkPass: '',
        name: '',
      },
      rules: {
        email: [
          { required: true, message: 'Email không được bỏ trống!', trigger: 'change' },
          { type: 'email', message: 'Email không hợp lệ!', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Mật khẩu không được bỏ trống!', trigger: 'change' },
          { min: 6, message: 'Mật khẩu không được ít hơn 6 kí tự', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'Tên người dùng không được bỏ trống!', trigger: 'change' },
          { min: 1, message: 'Mật khẩu không được ít hơn 6 kí tự', trigger: 'blur' },
        ],
        checkPass: [
          { validator: confirm, trigger: 'blur' }
        ],
      },
      label: 'top',
      user: [],
    }
  },
  methods: {
    forgotPass() {
      this.$router.push('forgot-password')
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            name: this.ruleForm.name
          }
          api.updateUser(data).then(() => {
            this.$message({
              message: 'Cập nhật thành công!',
              type: 'success'
            });
            api.getAuthUser().then((response) => {
              if (response) {
                this.user = response.data
                this.ruleForm.email = response.data.email
                this.ruleForm.name = response.data.name
              }
            })
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
.profileWrap {
  height: 95vh;
  .page-header {
    height: auto;
    overflow: hidden;
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
      width: 900px;
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
          background-color: #f4a7bb;
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
