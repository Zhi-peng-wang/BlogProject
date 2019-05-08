<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        我参与的
      </div>
      <h1>这是我参与的页面</h1>
      <div class="pic">
        <el-upload
          action="http://192.168.43.238:8090/uploadUserImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :data="resData"
          ref="upload"
          :on-success="onSuccess"
          name="imgUrl"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>

      <div class="btn">
        <input type="button" value="提交" @click="submit2">
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file:'',
        dialogImageUrl: '',
        dialogVisible: false,
        imgUrl:'',
        userId: '',
        uid:'',

        // 上传图片时附带的额外参数userId
        resData:{
          userId: window.localStorage["userId"]
        },
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      // 点击保存按钮上传图片
      submit2:function(res){
        this.$refs.upload.submit();
      },

      // 图片上传成功后，后台返回图片的路径
      onSuccess:function(res){
        // console.log(res);
        if(res.status==200){
          this.imgUrl=res.data.imgUrl;
        }
      },
    }
  }
</script>

<style scoped>
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
