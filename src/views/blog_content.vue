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
      <div class="container">
        <!--评论者的信息-->
        <div class="row">
          <div v-for="(item,index) in blogComment" :key="index">
            <!--评论日志的人-->
            <div>
              <div class="panel panel-info" v-show="item.touser===blogUser">
                <div class="panel-heading">
                  <div class="row">
                    <div class="col-md-2">
                      <div style="width: 50px;height: 50px">
                        <img src="#" alt="头像">
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div style="display: inline-block">{{item.nickname}}
                        {{item.touser}}
                        {{item.fromuser}}
                        {{item.commentdate}}</div>
                      <div style="display: inline-block;float: right">
                        <button class="btn btn-sm btn-warning">删除</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel-body">
                  <div class="well well-lg" v-show="item.touser===blogUser">
                    {{item.nickname}}:<br>
                    <div style="margin-left: 30px">
                      {{item.content}}
                    </div>
                  </div>
                  <div v-for="(r,index) in replayComment" :key="index">
                    <div v-show="r.touser===item.fromuser">
                      <div class="well well-lg">
                        {{r.nickname}}:@{{item.nickname}}<br>
                        <div style="margin-left: 30px">
                          {{r.content}}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--回复模块-->
                  <div style="margin-top: 30px">
                    <div class="form-group">
                      <label class="col-sm-2 control-label text-right" style="line-height: 30px">回复：</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="请输入">
                      </div>
                      <div>
                        <button class="btn btn-info">发表</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--添加评论-->
        <div style="margin: 30px 0px">
          <div class="panel panel-success">
            <div class="panel-heading">
              <div style="opacity: 0.5;display: inline-block">来说俩句吧！</div>
              <div style="display: inline-block;color: red;float: right">共有{{}}条评论</div>
            </div>
            <div class="panel-body">
              <div style="margin: 15px 0px">
                <textarea class="form-control" rows="3"></textarea>
              </div>
              <div>
                <button class="btn btn-info" style="display: inline-block;float: right">提交</button>
              </div>
            </div>
          </div>

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
        blogUser:""
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
          this.blogComment=res.obj;
          //回复评论的数组
          this.replayComment=res.obj;
          console.log(this.blogComment);
        }).catch(error=> {
        console.log(error)
      })
    }
  }
</script>
<style>
</style>
