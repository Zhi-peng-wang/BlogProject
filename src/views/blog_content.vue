<template>
  <div>
    <div class="jumbotron" v-loading="loading">
      <h2>{{this.blogContent.title}}内容:</h2><br>
        <div v-html="this.blogContent.content">
          {{this.blogContent.content}}
        </div>
      <hr>
      <div style="margin-bottom: 15px;border-bottom: 2px solid black">
        <b>文章评论：</b>
      </div>
      <!--该篇日志的评论-->
      <div class="container" style="padding: 0">
        <div class="row" v-for="(c,index) in blogComment" :key="index"  style="margin-bottom: 30px">
          <div>
            <div class="col-md-2" style="padding: 0">
              <div style="width: 80px;height: 80px;margin: 0 auto">
                <!--<img src="holder.js/100px50" alt="图片">-->
                <p style="line-height: 80px;margin: 0;text-align: center">头像</p>
              </div>
            </div>
            <div class="col-md-10" style="padding: 0">
              <div style="height: 80px">
                <p style="line-height: 40px;margin: 0;font-size: 18px">
                  {{c.nickname}}：{{c.content}}
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle
                             style="float: right;margin: 24px 30px"></el-button>
                </p>
                <p style="line-height: 40px;margin: 0;font-size: 12px">
                  {{c.commentdate.slice(0,10)}}
                  <el-button @click="replay(c.nickname)" type="primary" plain size="mini" style="margin-left: 15px">
                    回复
                  </el-button>
                </p>
              </div>


              <!--回复相关内容-->
              <div class="row" v-for="(r,index) in replayComment">
                <div v-if="r.parentid===c.commentid">
                  <div class="col-md-2" style="padding: 0">
                    <div style="width: 80px;height: 80px;margin: 0 auto">
                      <!--<img src="holder.js/100px50" alt="图片">-->
                      <p style="line-height: 80px;margin: 0;text-align: center">头像</p>
                    </div>
                  </div>
                  <div class="col-md-10" style="padding: 0">
                    <div style="height: 80px">
                      <p style="line-height: 40px;margin: 0;font-size: 16px">
                        {{r.nickname}} 回复：{{c.nickname}}：{{r.content}}
                      </p>
                      <p style="line-height: 40px;margin: 0;font-size: 12px">
                        {{r.commentdate.slice(0,10)}}
                        <el-button @click="replay(r.nickname)" type="primary" plain size="mini" style="margin-left: 15px">
                          回复
                        </el-button>
                      </p>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>

        <!--没有文章评论时候展示的-->
        <div  class="el-row" v-if="blogComment.length===0">
          <div>
            <el-col :span="24">
              <el-card shadow="hover">
                <p style="text-align: center;margin: 0">
                  暂无评论，快来评论吧！
                </p>
              </el-card>
            </el-col>
          </div>

        </div>

        <div class="el-row">
          <label style="margin-top: 15px">发表评论：</label>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="commentContent"
          style="margin-top: 15px">
          </el-input>
          <el-button type="primary" size="mini"
                     @click="addComment()"
                     style="margin-top: 15px;float: right">
            发表评论
          </el-button>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  import {getBlog} from "../api";
  export default {
    data() {
      return {
        //日志的详情内容
        blogContent: [],
        loading:false,
        blogComment:[],
        replayComment:[],
        //该篇日志的作者
        blogUser:"",
        commentIds:[],
        commentContent:"",

      }
    },
    mounted(){
      this.blogUser=this.$route.params.id*1;
      this.loading=true;
      getBlog({blogid:this.$route.query.blogid})
        .then(res=>{
          console.log("blog_list组件请求日志的详情内容成功");
          console.log(res);
          this.loading=false;
          //这是文章的内容
          this.blogContent=res.object;
          //这是该篇文章的评论内容
          // this.blogComment=res.obj;
          //获取本篇日志下的评论
          res.obj.find(item=>{
            for(let i=0;i<res.obj.length;i++){
              if (item.parentid===0){
                if (!~this.blogComment.indexOf(item)) {
                  this.blogComment.push(item);
                }
              }
            }
          });
          console.log(this.blogComment);
          const commentIds=res.obj.map(item=>({
            commentid:item.commentid
          }));
          this.commentIds=commentIds;
          console.log(this.commentIds);

          //回复评论的数组
          // this.replayComment=res.obj;
          res.obj.find(item=>{
            for(let i=0;i<res.obj.length;i++){
              if (item.parentid===this.commentIds[i].commentid){
                if (!~this.replayComment.indexOf(item)) {
                  this.replayComment.push(item)
                }
              }
            }
          });
          console.log(this.replayComment);
        }).catch(error=> {
        console.log(error)
      });
    },
    methods:{
      addComment(){
        console.log("asada");
      },
      replay(info){
        this.$prompt('请输入对  @'+info+'  回复', '回复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '回复内容是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>
<style>
</style>
