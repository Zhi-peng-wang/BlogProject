<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        EditorBlog
      </div>
      <div class="panel-body">
        <div :span="24">
          <el-form label-width="80px" >
            <el-form-item label="日志标题">
              <el-input v-model="blog_title"></el-input>
            </el-form-item>
            <el-form-item label="日志类型">
              <el-select v-model="value">
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
  import {addBlog, editBlog, getMyBlogTwoClass} from "../../../api";
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data(){
      return{
        blog_title: '',
        options:[],
        select_option:[],
        value: '',
        content:"",
        editorOption:{}
      }
    },
    created() {
      //为了得到日志分类的相关内容
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
        });
      //编辑日志
      editBlog({blogid:this.$route.query.blogid})
        .then(res=>{
          console.log(res);
          this.blog_title=res.object.title;
          this.content=res.object.content;
          let id=res.object.classid;
          console.log(id);
          console.log(this.options);
          const result=this.options;
          const blogClass=result.find(item=>item.classid===id);
          console.log(blogClass);
          // this.select_option=[{classid:blogClass.classid,classname:blogClass.classname}]
        })
        .catch(error=>{
          console.log(error);
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
        let data={blogid:this.$route.query.blogid,userid:this.$route.params.id,classid:this.value,title:this.blog_title,content:this.content}
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
