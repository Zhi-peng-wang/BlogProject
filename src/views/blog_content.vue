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
        <div class="row" v-for="(c,index) in blogComment" :key="index" style="margin-bottom: 30px">
          <div>
            <div class="col-md-2" style="padding: 0">
              <div style="width: 80px;height: 80px;margin: 0 auto">
                <img :src="c.userimg"
                     alt="图片" width="60px" height="60px" style="margin: 10px">
              </div>
            </div>
            <div class="col-md-10" style="padding: 0">
              <div style="height: 80px" class="father">
                <div style="line-height: 40px;margin: 0;font-size: 18px">
                  {{c.fromuser}}：{{c.content}}
                </div>
                <div style="line-height: 40px;margin: 0;font-size: 12px">
                  {{c.commentdate.slice(0,10)}}
                  <div @click="replay(c.nickname,c.fromuser,c.commentid)"
                       type="primary"
                       plain size="mini"
                       style="margin-left: 15px"
                       class="child">
                    <img src="../assets/hui.png" style="width: 15px;height: 15px">
                  </div>
                  <div plain size="mini" class="child"
                       style="margin-left:5px"
                       @click="deleteCom(c.commentid)">
                    <img src="../assets/shanchu.png" style="width: 15px;height: 15px">
                  </div>
                </div>

              </div>


              <!--回复相关内容-->
              <div class="row" v-for="(r,index) in replayComment">
                <div v-if="r.parentid===c.commentid">
                  <div class="col-md-2" style="padding: 0">
                    <div style="width: 80px;height: 80px;margin: 0 auto">
                      <img :src="c.userimg"
                           alt="图片" width="60px" height="60px" style="margin: 10px">
                    </div>
                  </div>
                  <div class="father">
                    <div class="col-md-10" style="padding: 0">
                      <div style="height: 80px">
                        <p style="line-height: 40px;margin: 0;font-size: 16px">
                          {{r.nickname}} 回复：{{c.fromuser}}：{{r.content}}
                        </p>
                        <div style="line-height: 40px;margin: 0;font-size: 12px">
                          {{r.commentdate.slice(0,10)}}
                          <div @click="replay(r.nickname,r.fromuser,c.commentid)"
                               type="primary"
                               plain size="mini"
                               style="margin-left: 15px"
                               class="child">
                            <img src="../assets/hui.png" style="width: 15px;height: 15px">
                          </div>
                          <div plain size="mini" class="child"
                               style="margin-left: 5px"
                               @click="deleteCom(r.commentid)">
                            <img src="../assets/shanchu.png" style="width: 15px;height: 15px">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--没有文章评论时候展示的-->
        <div class="el-row" v-if="blogComment.length===0">
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
        <!--评论输入框-->
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
  import {addComment, addGuest, getBlog, deleteComment} from "../api";
  export default {
    inject: ['reload'],
    data() {
      return {
        blogContent: [],    //日志的详情内容
        loading: false,
        blogComment: [],
        replayComment: [],
        //该篇日志的作者
        blogUser: "",
        commentIds: [],
        replayIds: [],
        commentContent: "",
        replayContent: "",      //回复的内容
        fromuserid: "",          //回复评论者的id
        commentId: "",           //回复那篇的评论commentid
        commentPersonid: "",       //回复的人的id
        seen: true,
        current: 0
      }
    },
    mounted() {
      //添加访客
      let dataGuest = {
        userid: this.$route.params.id,
        fromuserid: localStorage.getItem("loginUser"),
        typeid: this.$route.query.blogid
      };
      addGuest(dataGuest)
        .then(res => {
          console.log("成功访客信息");
          console.log(res);
        })
        .catch(err => {
          console.log("失败访客信息");
          console.log(err);
        });

      this.blogUser = this.$route.params.id * 1;
      this.loading = true;
      this.getBlogComment()
    },
    methods: {
      //删除评论以及评论下的回复
      deleteCom(id) {
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            let data = {
              commentid: id
            };
            deleteComment(data)
              .then(res => {
                console.log("删除接口 成功返回");
                console.log(res);
                this.getBlogComment()
              })
              .catch(err => {
                console.log("删除接口 失败返回");
                console.log(err);
              });

            this.$message({
              type: 'success',
              message: '评论删除成功!',
              showClose: true
            });
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消删除评论',
              showClose: true
            });
          }
        });
      },
      //得到评论和回复的数组
      getBlogComment() {
        let data = {
          blogid: this.$route.query.blogid,
        };
        getBlog(data)
          .then(res => {
            console.log("blog_list组件请求日志的详情内容成功");
            console.log(res);
            this.loading = false;
            this.blogComment = [];      //此处将评论数组清空
            this.replayComment = [];    //此处将回复的数组清空
            //这是文章的内容
            this.blogContent = res.object;
            //获取本篇日志下的评论
            res.obj.find(item => {
              for (let i = 0; i < res.obj.length; i++) {
                if (item.parentid === 0) {
                  if (!~this.blogComment.indexOf(item)) {
                    this.blogComment.push(item);
                  }
                }
              }
            });
            console.log("打印评论");
            console.log(this.blogComment);
            const commentIds = res.obj.map(item => ({
              commentid: item.commentid
            }));
            this.commentIds = commentIds;
            console.log(this.commentIds);
            //回复评论的数组
            res.obj.find(item => {
              for (let i = 0; i < res.obj.length; i++) {
                if (item.parentid === this.commentIds[i].commentid) {
                  if (!~this.replayComment.indexOf(item)) {
                    this.replayComment.push(item)
                  }
                }
              }
            });
            console.log(this.replayComment);
          }).catch(error => {
          console.log(error);
          // this.$router.push(`/wrong`)
        });
      },
      //添加评论
      addComment() {
        console.log("添加评论按钮触发");
        let data = {
          content: this.commentContent,        //评论内容
          fromuser: localStorage.getItem("loginUser"),   //来自谁的评论
          touser: this.$route.params.id,       //给谁的评论
          status: "0",       //是否已读
          typeid: "0",       //判断是否是评论还是回复
          parentid: "0",      //评论还是回复
          uuid: this.$route.query.blogid       //日志id或者相册id
        };
        console.log(data);
        addComment(data)
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              console.log("评论成功打印");
              this.getBlogComment();
              this.commentContent = "";
              this.$notify({
                title: '评论成功',
                message: '感谢您的评论！',
                type: 'success'
              });
            }
          })
          .catch(err => {
            console.log("评论错误打印");
            console.log(err);
          })
      },
      //回复的弹框
      replay(nickname, fromuserid, commentId) {
        // this.commentUser=nickname;      //回复的第二个人的名字
        this.fromuserid = fromuserid;
        this.commentId = commentId;
        this.$prompt('请输入对  @' + nickname + fromuserid + '  回复', '回复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.replayContent = value;
          console.log(this.replayContent);
          this.$message({
            type: 'success',
            message: '回复内容是: ' + value,
          });
          this.reComment();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
        console.log(nickname, fromuserid, commentId);
      },
      //回复的操作
      reComment() {
        console.log("回复的内容");
        let data = {
          content: this.replayContent,        //回复的内容
          fromuser: localStorage.getItem("loginUser"),   //来自谁的回复
          touser: this.fromuserid,       //回复评论者的id
          status: "0",       //是否已读
          typeid: "1",       //判断是否是评论还是回复
          parentid: this.commentId,      //评论还是回复
          uuid: this.$route.query.blogid       //日志id或者相册id
        };
        console.log(data);
        addComment(data)
          .then(res => {
            if (res.status === 200) {
              console.log("点击回复的内容");
              console.log(res);
              this.getBlogComment();
              this.replayContent = "";
              this.$notify({
                title: '回复成功',
                message: '您的回复很快就能被看到啦！',
                type: 'success'
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>
<style>
  .father .child {
    display: none;
  }

  .father:hover .child {
    display: inline;
  }
</style>
