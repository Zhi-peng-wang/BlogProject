<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        添加图片
      </div>
      <div class="panel-body">
        <div :span="24">
          <el-form label-width="80px" >
            <el-form-item label="相片标题">
              <el-input v-model="albumTitle" placeholder="请输入相片标题"></el-input>
            </el-form-item>

            <el-form-item label="相册分类">
              <el-select v-model="dataClass.classA" placeholder="请选择一级分类">
                <el-option v-for="(c1,index) in album_url_1"
                           :value="c1.classid"
                           :label="c1.classname"
                           :key="index"
                           @click.native="sendClassId(c1.classid)"
                ></el-option>
              </el-select>

              <el-select v-model="dataClass.classB" placeholder="请选择二级分类">
                <el-option v-for="(c2,index) in album_url_2_2"
                           :value="c2.classid" :label="c2.classname" :key="index"></el-option>
              </el-select>
            </el-form-item>

            <!--upload-->
            <el-form-item label="上传图片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/photos"
                list-type="picture-card"
                multiple
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" >提交</el-button>
              <el-button >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {getClass} from "../../../api";

    export default {
        data(){
          return{
            albumTitle:'',
            dataClass:{
              classA:"",
              classB:""
            },
            album_url_1:[],
            album_url_2:[],
            album_url_2_2:[],
            dialogImageUrl: '',
            dialogVisible: false
          }
        },
      mounted(){
        //拿到分类
        getClass({userid:localStorage.getItem("loginUser"),typeid:2})
          .then(res=>{
            console.log(res);
            const result = res.object;
            //一级标题的相关内容
            result.map(item => {
              if (item.depth == 1) {
                return this.album_url_1.push(item)
              }
            });
            console.log(this.album_url_1);
            // 二级标题的相关内容
            result.map(item => {
              if (item.depth === 2) {
                return this.album_url_2.push(item)
              }
            });
            console.log(this.album_url_2);
          })
          .catch(err=>{
            console.log(err);
          });
      },
      methods:{
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          console.log(file);
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        sendClassId(classid){
          console.log("一级分类被点击"+classid);
          this.album_url_2_2=[];
          this.album_url_2.find(item=>{
            for (let i=0;i<this.album_url_2.length;i++){
              if(classid===item.parentid){
                if (!~this.album_url_2_2.indexOf(item)) {
                  this.album_url_2_2.push(item)
                }
              }
            }
          });
          console.log(this.album_url_2_2);
        },
      }
    }
</script>

<style scoped>

</style>
