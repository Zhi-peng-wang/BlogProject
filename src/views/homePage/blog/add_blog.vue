<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        添加日志
      </div>
      <div class="panel-body">
        <div :span="24">
          <el-form label-width="80px" >
            <el-form-item label="日志标题">
              <el-input v-model="blog_title"></el-input>
            </el-form-item>

            <el-form-item label="日志类型">
              <el-select v-model="dataClass.classA" placeholder="请选择一级分类">
                <el-option v-for="(c1,index) in blog_url_1"
                           :value="c1.classid"
                           :label="c1.classname"
                           :key="index"
                           @click.native="sendClassId(c1.classid)"
                ></el-option>
              </el-select>

              <el-select v-model="dataClass.classB" placeholder="请选择二级分类">
                <el-option v-for="(c2,index) in blog_url_2_2"
                           :value="c2.classid" :label="c2.classname" :key="index"></el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="日志内容">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="confirmAddBlog">提交</el-button>
              <el-button @click="reset_blog">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addBlog,getClass} from "../../../api";
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data(){
      return{
        blog_title:"",
        options:[],
        select_option:[],
        value: '',
        content:"",
        editorOption:{},
        dataClass:{
          classA:"",
          classB:""
        },
        blog_url_1:[],
        blog_url_2:[],
        blog_url_2_2:[],
        jumpRouter:true,      //是否容许跳转路由
      }
    },
    created() {
      //拿到分类
      getClass({userid:localStorage.getItem("loginUser"),typeid:1})
        .then(res=>{
          console.log(res);
          const result = res.object;
          //一级标题的相关内容
          result.map(item => {
            if (item.depth == 1) {
              return this.blog_url_1.push(item)
            }
          });
          console.log(this.blog_url_1);
          // 二级标题的相关内容
          result.map(item => {
            if (item.depth === 2) {
              return this.blog_url_2.push(item)
            }
          });
          console.log(this.blog_url_2);
        })
        .catch(err=>{
          console.log(err);
        });
    },
    methods:{
      sendClassId(classid){
        console.log("一级分类被点击"+classid);
        this.blog_url_2_2=[];
        this.blog_url_2.find(item=>{
          for (let i=0;i<this.blog_url_2.length;i++){
            if(classid===item.parentid){
              if (!~this.blog_url_2_2.indexOf(item)) {
                this.blog_url_2_2.push(item)
              }
            }
          }
        });
        console.log(this.blog_url_2_2);
      },
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
      },
      confirmAddBlog(){
        this.$confirm('确认提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            this.send_blog();
          }
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '取消添加',
              showClose:true
            });
          }
        });
      },

      send_blog(){
        console.log("提交函数已触发");
        let data={
          blogid:this.$route.query.blogid,
          userid:this.$route.params.id,
          classid:this.dataClass.classB,
          title:this.blog_title,
          content:this.content
        };
        addBlog(data)
          .then(res=>{
            console.log("执行提交接口");
            console.log(res);
            if (res.status===500){
              this.jumpRouter=false
            }
            if(res.status===200){
                this.jumpRouter=true;
                this.$notify({
                  title: '添加日志',
                  message: '添加日志成功',
                  type: 'success'
                });
              // 写一个函数，用来检测是否继续添加，还是返回日志列表界面
              this.isAdd()
            } else {
              this.$notify.error({
                title: '添加日志',
                message: '所填写内容不能为空！',
                type: 'error'
              });
            }
          })
          .catch(error=>{
            console.log("提交失败");
          })
      },
      reset_blog(){
        this.value="";
        this.blog_title="";
        this.content="";
        this.dataClass.classA="";
        this.dataClass.classB="";
      },
      isAdd(){
        this.$confirm('添加成功，选择下一步操作', '提示', {
          confirmButtonText: '返回日志列表',
          cancelButtonText: '继续添加',
          type: 'success',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            this.$message({
              type: 'success',
              message: '返回日志列表',
              showClose:true
            });
            //跳转
            this.$router.push(`/${this.$route.params.id}/home_page/all_blog_list`);
          }
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'success',
              message: '继续添加',
              showClose:true
            });
            this.reset_blog()
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>
