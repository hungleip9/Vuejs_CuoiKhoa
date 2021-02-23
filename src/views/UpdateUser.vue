<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <!-- <img src="" class="logo"> -->
                 <h3>Chỉnh sửa thông tin</h3>
             </div>
             <el-row>
                <el-col :span="12">
                    <div class="right">
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="text" placeholder="Nhập Tên" class="sui-input" >
                            <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                            </div>
                        </div>
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="text" placeholder="Nhập Email" class="sui-input"  >
                            <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                            </div>
                        </div>
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="password" placeholder="Nhập mật khẩu" class="sui-input"  >
                            <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                            </div>
                        </div>
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="password" placeholder="Nhập lại mật khẩu" class="sui-input"  >
                            <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                            </div>
                        </div>
                        <button class="submitButton" @click="submit()">          
                            <span>Lưu</span>             
                        </button>
                        <div class="backLogin" style="margin-top:25px">
                            <div class="previous">
                                <router-link to="/login" style="text-decoration:none">
                                <span style="color:#0080dd;"> <i class="el-icon-back"></i> Trở về trang đăng nhập</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="left">
                        <p>Ảnh đại diện</p>
                        <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px solid black"></i>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
             
         </div>
     </main>
 </div>
</template>

<script> 

export default {
   
  data() {
      return {
       imageUrl: '',
       dialogImageUrl: '',
        dialogVisible: false
      }
  },
  methods: {
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    // handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isJPG && isLt2M;
    }
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loginWrap {
  height: 100vh;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  .form{
    //   border: 1px solid black;
      height: 428px;
      background-color: white;
      width: 688px;
      padding: 24px;
      border-radius: 10px;
      .logoWrap{
          display: flex;
            align-items: center;
            // justify-content: center;
            margin-bottom: 24px;
            .logo{
                 width: 200px;
            }
      }
  }
}
.right {
    // border: 1px solid black;
}
.left {
    // border: 1px solid blue;
    text-align: center;
    margin-top: -22px;
}
.formInputWrap{
    margin-bottom: 24px;
    .sui-input {
      border: 1px solid blue;
         border-radius: 4px;
            height: 14px;
            width: 92%;
            font-size: 14px;
            line-height: 18px;
            color: #253036;
            padding: 12px;
            border: 1px solid #d8e0ea;
            outline: unset;
         }           
          
}
.submitButton{
    width: 100%;
    height: 37px;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    background: #5aac44;;
    border-radius: 4px;
    text-transform: none;
    letter-spacing: 0.02857em;
    cursor: pointer;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
