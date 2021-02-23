<template>
  <div class="login">
      
    <el-card>
      <el-span>
          <el-image
        style="width: 51% !important; padding-bottom: 24px"
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        fill>

      </el-image>
    </el-span>
      <h1>Đăng nhập vào Trello</h1>
        <el-input
            style="padding: 10px 0;"
            placeholder="Nhập email"
            v-model="email">
        </el-input>
        <el-input
            type="password"
            style="padding: 10px 0;"
            placeholder="Nhập mật khẩu"
            v-model="pw">
        </el-input>
        <div style="text-align: right; margin-top: 8px; margin-bottom: 24px">
          <el-link type="primary" style="padding-right:10px; color:#0080dd" @click="signup">Đăng Ký</el-link>
        </div>
        <el-button type="success" :plain="true" @click="login" style="color:white">ĐĂNG NHẬP</el-button>
    </el-card>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
    name: "login",
    components:{
      ...mapState([
              'count',
            ])
    },
    data() {
        return {
            email: '',
            pw: '',
        }
    },
    methods: {
        login() {
            if (this.email != '' && this.pw != '') {
                if (this.email.length < 6) {
                    this.$message.error('Email không đúng định dạng.');
                }
                if (this.pw.length < 6) {
                    this.$message.error('Mật khẩu không đúng.');
                }
                else {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "Main" });
                }  
            }
            else if(this.email == ''){
              this.$message.error('Email không được trống.');
              this.$router.replace({ name: "Login" });
            }
          else if(this.pw == ''){
            this.$message.error('Mật khẩu không được trống.');
            this.$router.replace({ name: "Login" });
          }
        },
      signup(){
        this.$router.replace({ name: "Register" });
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 700px;
    .el-card {
        width: 29%;
        box-shadow: rgba(19 17 17) 0 0 10px;
    }
}
.el-button {
    width: 100%;
    background-color: #5AAC44;
    font-size: 14px;
    line-height: 18px;
}
h1 {
    text-align: center;
    color: #5E6C84;
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 28px;
    margin-top: 10px;
    margin-bottom: 25px;
}
</style>
