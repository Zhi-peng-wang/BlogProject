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
              <el-select v-model="value" placeholder="请选择">
                <el-option  clearable
                            v-for="item in options"
                            :key="item.classid"
                            :label="item.classname"
                            :value="item.classid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日志内容">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="blog_content">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="send_blog">提交</el-button>
              <el-button @click="reset_blog">重置</el-button>
            </el-form-item>
          </el-form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {addBlog, getMyBlogTwoClass} from "../../../api";
  export default {
    data(){
      return{
        blog_title: '',
        blog_content: '',
        options:[],
        value: ''
      }
    },
    created() {
      const id = this.$route.params.id;
      getMyBlogTwoClass({userid:id,typeid:1,depth:2})
        .then(res=>{
          console.log("请求数据成功");
          console.log(res.object);
          const option=res.object.map(item=>({
            classid:item.classid,
            classname:item.classname
          }));
          this.options=option;
          console.log(this.options);
        })
        .catch(error=>{
          console.log("请求数据失败");
        })
    },
    methods:{
      send_blog(){
        console.log("提交按钮已触发");
        let data={userid:this.$route.params.id,classid:this.value,title:this.blog_title,content:this.blog_content}
        addBlog(data)
          .then(res=>{
            console.log("提交成功");
            console.log(res);
            this.value="";
            this.blog_title="";
            this.blog_content=""
          })
          .catch(error=>{
            console.log("提交失败");
          })
      },
      reset_blog(){
        this.value="";
        this.blog_title="";
        this.blog_content=""
      }
    }
  }
</script>

<style scoped>
</style>
