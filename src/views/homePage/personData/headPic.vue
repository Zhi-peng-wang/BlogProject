<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        我的头像
      </div>
      <div style="margin: 30px">
        <el-form>
          <el-form-item label="头像:">
            <el-upload
              class="avatar-uploader"
              name="file"
              :show-file-list="false"
              action="/api/uploadUserImg"
              :data="userInfo"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="imgUploadError">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <!--<img v-if="imageUrl" src="http://192.168.43.238:8090/userImg/ba314cb6f7b546809692c392a5a47e2e.jpg" class="avatar">-->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <!--<img :src="imageUrl" alt="">-->
      </div>

    </div>
  </div>
</template>

<script>
  import {getUser} from "../../../api";

  export default {
    data() {
      return {
        imageUrl: '',
        userInfo:{
          userid:""
        },
      }
    },
    mounted(){
      this.userInfo.userid=localStorage.getItem("loginUser");
      const id = localStorage.getItem("loginUser");
      getUser({userid:id})
        .then(res=>{
          console.log("头像那边成功打印消息");
          console.log(res);
          this.imageUrl=res.object.userimg;
          console.log("imageUrl:"+this.imageUrl);
        })
        .catch(err=>{
          console.log("头像那边失败打印消息");
          console.log(err);
        });

    },
    methods: {

      beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        console.log(file);
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {//图片上传成功
        console.log(res);
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      imgUploadError(err, file, fileList){//图片上传失败调用
        console.log(err)
        this.$message.error('上传图片失败!');
      },
    }
  }
</script>

<style>
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
