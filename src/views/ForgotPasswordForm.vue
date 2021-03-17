<template>
  <div class="div">
    <div class="mainWrap">
      <div class="header">LẤY LẠI MẬT KHẨU</div>
      <div class="description">
      </div>
      <div class="inputWrap" style="margin-bottom: 24px">
        <el-input placeholder="Mật khẩu" v-model="newpassword" type="password"></el-input>
        <el-input placeholder="Nhập lại mật khẩu" v-model="repassword" type="password"></el-input>
        <p>Nhập email cần lấy lại mật khẩu</p>
      </div>
      <button type="submit" class="btn-submit" @click="submit()">Cập nhật mật khẩu</button>
      <el-button @click="back()"><i class="el-icon-back"></i> Trở về trang chủ</el-button>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: "Register",
  data() {
    return {
      newpassword: '',
      repassword:'',
    }
  },
  methods: {
    back() {
      this.$router.push('/path/home')
    },
    submit() {
       if(this.newpassword !== this.repassword){
        this.$message({
          message: 'Mật khẩu nhập lại không trùng!',
          type: 'error'
        });
      } else {
        let data = {
        password: this.newpassword,
        password_confirmation: this.repassword
        }
          api.changePassWord(data).then(() => {
          this.$message({
            message: 'Thay đổi mật khẩu thành công!',
            type: 'success',
            data: data
          });
        })
      }
    },
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