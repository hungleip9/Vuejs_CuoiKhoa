<template>
  <div class="div">
    <div class="mainWrap">
      <div class="header">LẤY LẠI MẬT KHẨU</div>
      <div class="description">
      </div>
      <div class="inputWrap" style="margin-bottom: 24px">
        <el-input placeholder="Email" v-model="email" type="email" @input="onChangeEmail($event)"></el-input>
        <p>Nhập email cần lấy lại mật khẩu</p>
        <div v-if="emailError" class="error"><i class="el-icon-warning"></i> Email không được bỏ trống</div>
      </div>
      <button class="btn-submit" @click="submit()">GỬI EMAIL</button>
      <el-button @click="back()"><i class="el-icon-back"></i> Trở về trang đăng nhập</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: '',
      emailError: false
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    submit() {
      if (this.email.length == '') {
        this.emailError = true
      }
      if (!this.emailError) {
        this.$message({
          message: 'Gửi email thành công!',
          type: 'success'
        });
      }
    },
    onChangeEmail(email) {
      this.email = email
      this.emailError = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mainWrap {
  width: 444px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .description {
    text-align: left;
    margin-bottom: 10px;
    line-height: 25px;
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
  .btn-submit {
    cursor: pointer;
    width: 100%;
    height: 50px;
    background-image: linear-gradient(to bottom right, #648455, #5a9e98);
    color: #ffffff;
    border: 0;
    border-radius: 4px;
    margin-bottom: 50px;
  }
  .el-button {
    border: 0;
    color: #0080dd;
    padding: 10px;
    font-size: 14px;
    i {
      font-weight: bold;
    }
  }
}
</style>