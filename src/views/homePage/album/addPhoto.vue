<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        添加图片
      </div>
      <div class="panel-body">
        <div :span="24">
          <el-form label-width="80px">
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
            <!--图片上传-->
            <el-upload
              action=""
              accept="image/*"
              multiple
              class="avatar-uploader"
              list-type="picture-card"
              :limit="limitImage"
              :http-request="addAttachment">
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-button @click="addUpload">上传图片</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>重置</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addPhoto, getClass} from "../../../api";

  export default {
    data() {
      return {
        albumTitle: '',
        dataClass: {
          classA: "",
          classB: ""
        },
        album_url_1: [],
        album_url_2: [],
        album_url_2_2: [],
        imageUrl:"",
        limitImage:6
      }
    },
    mounted() {
      //拿到分类
      getClass({userid: localStorage.getItem("loginUser"), typeid: 2})
        .then(res => {
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
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      // 自定义上传方法
      addAttachment(file) {
      // 用于显示图片
        this.imageUrl = URL.createObjectURL(file.file);
      //保存一份文件信息，用于上传
        this.fileData = file.file;
      },
      // 上传数据
      addUpload() {
        var formData = new FormData();
        formData.append("file", this.fileData);
        formData.append("userid", localStorage.getItem("loginUser"));
        formData.append("title", "hello898989");
        formData.append("classid", 15);
        formData.append("pv", 15);
        console.log("上传图片的点击事件已触发");
        console.log(this.fileData);
        // 上传方法接口
        addPhoto(formData)
          .then(res => {
          console.log('上传图片接口-数据成功。', res)
          })
          .catch(err=>{
            console.log(err);
          })
      },
      sendClassId(classid) {
        console.log("一级分类被点击" + classid);
        this.album_url_2_2 = [];
        this.album_url_2.find(item => {
          for (let i = 0; i < this.album_url_2.length; i++) {
            if (classid === item.parentid) {
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
