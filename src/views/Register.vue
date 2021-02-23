<template>
  <div class="login">
    <el-card>
      <el-image
        style="width: 51% !important; margin-bottom: 24px"
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        fill>

      </el-image>
      <el-input
            style="padding: 10px 0;"
            placeholder="Name"
            v-model="name">
        </el-input>
        <el-input
            style="padding: 10px 0;"
            placeholder="Email"
            v-model="email">
        </el-input>
        <el-input
            type="password"
            style="padding: 10px 0;"
            placeholder="Mật khẩu"
            v-model="pw">
        </el-input>
        <el-input
            type="password"
            style="padding: 10px 0;"
            placeholder="Nhập lại mật khẩu"
            v-model="rpw">
        </el-input>
        <br><br>
        <el-button type="primary" :plain="true" @click="signup" :target="target" style="color:white">ĐĂNG KÝ</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            name: '',
            email: '',
            pw: '',
            rpw: '',
            target:'_blank'
        }
    },
    methods: {
        signup() {
            if (this.name != '' && this.email != '' && this.pw != '' && this.rpw != '' && this.pw == this.rpw) {
                if ( this.name.length <6 ) {
                    this.$message.error('Tên không được nhỏ hơn 6 ký tự.');
                    this.$router.replace({ name: "Register" });
                }

                else if ( this.email.length <6 ) {
                    this.$message.error('Email không được nhỏ hơn 6 ký tự.');
                    this.$router.replace({ name: "Register" });
                }
                
                else if ( this.pw.length <6 ) {
                    this.$message.error('PassWord không được nhỏ hơn 6 ký tự.');
                    this.$router.replace({ name: "Register" });
                }

                else {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "Main" });
                } 
            }
            else if(this.name == ''){
            this.$message.error('Tên không được trống.');
            this.$router.replace({ name: "Register" });
            }
            else if(this.email == ''){
              this.$message.error('Email không được trống.');
              this.$router.replace({ name: "Register" });
            }
            else if(this.pw == ''){
            this.$message.error('Mật khẩu không được trống.');
            this.$router.replace({ name: "Register" });
            }
            else if(this.rpw == ''){
            this.$message.error('Mật khẩu xác thực không được trống.');
            this.$router.replace({ name: "Register" });
            }
            else if(this.rpw != this.pw){
            this.$message.error('Mật khẩu xác thực trùng nhau.');
            this.$router.replace({ name: "Register" });
            }
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
    height: 700px;
    .el-card {
        width: 29%;
        box-shadow: rgba(19 17 17) 0 0 10px;
    }
}
.el-button {
    width: 100%;
    background-color: #0080dd;
    font-size: 14px;
    line-height: 18px;
}
</style>
