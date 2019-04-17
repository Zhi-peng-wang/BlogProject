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
              <!--<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="blog_content">-->
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor>
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
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data(){
      return{
        blog_title: '',
        options:[],
        value: '',
        content:"",
        editorOption:{}
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
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
      },
      send_blog(){
        console.log("提交按钮已触发");
        let data={userid:this.$route.params.id,classid:this.value,title:this.blog_title,content:this.content}
        addBlog(data)
          .then(res=>{
            console.log("提交成功");
            console.log(res);
            this.value="";
            this.blog_title="";
            this.content=""
          })
          .catch(error=>{
            console.log("提交失败");
          })
      },
      reset_blog(){
        this.value="";
        this.blog_title="";
        this.content=""
      }
    }
  }
</script>

<style scoped>
</style>
