<template>
  <div class="loginWrap">
    <div class="logo">
      <img src="../assets/images/blackpink.png" alt="">
    </div>
    <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item prop="email">
        <label style="float: left" >Email</label>
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label style="float: left" >Mật khẩu</label>
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="forgotPass">
      <el-button @click="forgotPass()">Quên mật khẩu?</el-button>
    </div>
    <button class="btn-login" @click="handleogin('ruleForm')">
      ĐĂNG NHẬP
    </button>
    <div class="register">
      <el-button @click="register()">Đăng kí</el-button>
    </div>
  </div>
</template>

<script>
import api from '../api'
import {mapState, mapMutations} from 'vuex'
export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        email: '',
        password: '',
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
      },
      label: 'top',
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser', 'updateToken']),
    forgotPass() {
      this.$router.push('forgot-password')
    },
    handleogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          }
          api.login(data).then((response) => {
            this.$message({
              message: 'Đăng nhập thành công!',
              type: 'success'
            });
            this.updateLoginStatus({isAuthenticated: true})
            localStorage.setItem('access_token', response.data.access_token)
            this.updateToken(response.data.access_token)
            if (this.$router.currentRoute.name !== 'Home') {
              this.$router.push({ name: 'Home' })
            }
          }).catch(() => {
            this.$message({message: 'Email hoặc mật khẩu không chính xác', type: 'error'});
          })
        } else {
          this.$message({
            message: 'Đăng nhập thất bại!',
            type: 'error'
          });
          return false;
        }
      });
    },
    register() {
      this.$router.push('/path/register')
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
    margin-bottom: 15px;
    img {
      width: 200px;
    }
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