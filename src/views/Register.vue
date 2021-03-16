<template>
  <div class="loginWrap">
    <div class="logo">
      <img src="../assets/images/blackpink.png" alt="">
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
      <el-form-item prop="gender">
        <label style="float: left" >Giớ tính</label>
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="Nam"></el-radio>
          <el-radio label="Nữ"></el-radio>
          <el-radio label="Khác"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <button class="btn-login" @click="register('ruleForm')">
      ĐĂNG KÍ
    </button>
    <div class="register">
      <el-button @click="login()">Đăng nhập</el-button>
    </div>
  </div>
</template>

<script>
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
        gender: '',
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
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: 'Đăng kí thành công!',
            type: 'success',
          });
          console.log(this.ruleForm)
          this.$router.push('/home')
        } else {
          this.$message({
            message: 'Đăng kí thất bại!',
            type: 'error'
          });
          return false;
        }
      });
    },
    login() {
      this.$router.push('/path/login')
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
    background-color: #f4a7bb;
    color: #ffffff;
    border: 0;
    border-radius: 4px;
    margin-top: 24px;
    outline: none;
    cursor: pointer;
  }
}
</style>