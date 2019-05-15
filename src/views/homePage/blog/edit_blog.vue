<template>
    <div>
      <div class="panel panel-info">
        <div class="panel-heading">
          编辑日志
        </div>
        <div class="panel-body">
          <div :span="24">
            <el-form label-width="80px" >
              <el-form-item label="日志标题">
                <el-input v-model="blog_title"></el-input>
              </el-form-item>

              <el-form-item label="日志类型">
                <el-select v-model="dataClass.classA" placeholder="请选择一级分类">
                  <el-option v-for="(c1, index) in blog_url_1"
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
  import {addBlog, editBlog, getClass} from "../../../api";

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
          idxA:0,
          blogOldDate:""
        }
      },
      created(){
        //拿到分类
        getClass({userid: localStorage.getItem("loginUser"),typeid:1})
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
        //编辑日志
        editBlog({blogid:this.$route.query.blogid})
          .then(res=>{
            console.log(res);
            //blog的日期   用来保存 并传递给后台
            this.blogOldDate=res.object.blogdate;

            this.blog_title=res.object.title;
            this.content=res.object.content;

            let idx=res.object.classid;
            this.idxA=res.object.parentid;
            //如果option中存在value属性，优先获取value值的id，如果不存在，则获取option的文本内容
            // this.value = this.options[0].classid;
            // this.dataClass.classA=1;
            console.log(this.idxA);
            this.dataClass.classA=this.idxA;
            this.sendClassId(this.idxA);
            // this.dataClass.classA=idx;
            // this.sendClassId(idx);
            // this.reload();
            this.dataClass.classB = idx;
            // this.reload();
            console.log(this.dataClass.classB);
          })
          .catch(error=>{
            console.log(error);
          })
      },
      methods:{
        sendClassId(classid){
          console.log("一级分类被点击"+classid);
          this.dataClass.classB="";
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
        send_blog(){
          console.log("提交按钮已触发");
          let data={
            blogid:this.$route.query.blogid,
            userid: localStorage.getItem("loginUser"),
            classid:this.dataClass.classB,
            title:this.blog_title,
            content:this.content};
          addBlog(data)
            .then(res=>{
              console.log("编辑接口触发");
              console.log(res);
              if(res.status===200){
                this.$notify({
                  title: '编辑日志',
                  message: '编辑日志成功',
                  type: 'success'
                });
                //点击编辑返回上一个页面
                this.$router.push(`/${this.$route.params.id}/home_page/all_blog_list`);
              }
              else {
                this.$notify.error({
                  title: '编辑日志',
                  message: '编辑日志发生错误，请检查'
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
        }
      }
    }
</script>

<style scoped>

</style>
