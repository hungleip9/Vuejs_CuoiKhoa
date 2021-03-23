<template>
  <div class="loginWrap">
    <div class="logo">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="">
    </div>
    <div class="title">Đăng kí tài khoản</div>
    <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item prop="email">
        <label style="float: left" ><span style="color: #f54b5e">*</span> Email</label>
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label style="float: left" ><span style="color: #f54b5e">*</span> Mật khẩu</label>
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <label style="float: left" ><span style="color: #f54b5e">*</span> Xác nhận mật khẩu</label>
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <button class="btn-login" @click="handleRegister('ruleForm')">
      ĐĂNG KÝ
    </button>
    <div class="register">
      <el-button @click="login()">ĐĂNG NHẬP</el-button>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: "LoginForm",
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
        checkPass: [
          { validator: confirm, trigger: 'blur' }
        ],
      },
      label: 'top',
    }
  },
  methods: {
    forgotPass() {
      this.$router.push('forgot-password')
    },
    handleRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            password: this.ruleForm.password
          }
          api.register(data).then(() => {
            this.$message({
              message: 'Chào mừng bận đén với BLACKPINK!',
              type: "success",
              center: true
            })
            if (this.$router.currentRoute.name !== 'Home') {
              this.$router.push({ name: 'Home' })
            }
          })
        }
      });
    },
    login() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.loginWrap {
  width: 444px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .logo {
    width: 100%;
    img {
      width: 200px;
    }
  }
  .title {
    width: 100%;
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
    color: #328146;
  }
  .inputWrap {
    width: 100%;
    height: auto;
    overflow: hidden;
    .el-input {
      height: 50px !important;
    }
    .error {
      font-size: 12px;
      color: #f54b5e;
      float: left;
    }
  }
  .register {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>