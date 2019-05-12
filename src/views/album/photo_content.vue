<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="panel panel-info">
            <div class="panel-heading">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="`/${$route.params.id}`+'/album/photo_class'">返回上一级</el-breadcrumb-item>
                <el-breadcrumb-item>相册下图片</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="panel-body">
              <img :src="imgUrl" alt="" width="715px" height="600px">
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel panel-danger">
            <div class="panel-heading">
              评论
            </div>
            <!--该相片的内容-->
            <div class="panel-body">
              <p>
                这里应该有一个头像和名字加上回复的内容:{{photoContent}}<br>
                暂时后台没有给，先预留位置
              </p>
            </div>

            <!--评论的展示-->
            <div class="panel-body">
              <div class="row" v-for="(c,index) in photoComment" :key="index">
                <div>
                  <div class="col-md-3" style="padding: 0">
                    <div style="width: 80px;height: 80px;margin: 0 auto">
                      <img :src="c.userimg"
                           alt="图片" width="60px" height="60px" style="margin: 10px">
                    </div>
                  </div>
                  <div class="col-md-9" style="padding: 0">
                    <div style="height: 60px" class="father">
                      <div style="line-height: 20px;margin-top: 10px;padding-top:10px;font-size: 12px">
                        <p class="content" >
                          {{c.fromuser}}：{{c.content}}
                          <img src="../../assets/hui.png"
                               @click="replay(c.nickname,c.fromuser,c.commentid)"
                               style="width: 15px;height: 15px">
                          <img src="../../assets/shanchu.png"
                               @click="deleteCom(c.commentid)"
                               style="width: 15px;height: 15px">
                        </p>
                      </div>


                    </div>
                    <!--回复的展示-->
                    <div class="row" v-for="(r,index) in replayPhotoComment">
                      <div v-if="r.parentid===c.commentid">
                        <div class="col-md-2" style="padding: 0">
                          <div style="width: 80px;height: 80px;margin: 0 auto">
                            <img :src="c.userimg"
                                 alt="图片" width="60px" height="60px" style="margin: 10px">
                          </div>
                        </div>
                        <div class="father">
                          <div class="col-md-10" style="padding: 0">
                            <div style="height: 60px;line-height: 20px;margin:15px 0px 0px 20px;font-size: 12px">
                              <p class="content">
                                {{r.nickname}} 回复：{{c.fromuser}}：{{r.content}}
                                <img src="../../assets/hui.png"
                                     @click="replay(r.nickname,r.fromuser,c.commentid)"
                                     style="width: 15px;height: 15px">
                                <img src="../../assets/shanchu.png"
                                     @click="deleteCom(r.commentid)"
                                     style="width: 15px;height: 15px">
                              </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--没有图片评论时候展示的-->
              <div class="el-row" v-if="photoComment.length===0">
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
                           @click="addPhotoComment()"
                           style="margin-top: 15px;float: right">
                  发表评论
                </el-button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addComment, deleteComment, getPhoto} from "../../api";

    export default {
      data(){
        return{
          //图片的路径
          imgUrl:"",
        //  评论的内容
          commentContent:"",
        //  评论和回复的数组
          commentRe:[],
          loading: false,
          //相片的评论
          photoComment: [],
          //相片评论的回复
          replayPhotoComment: [],
          commentIds: [],
          replayContent: "",      //回复的内容
          fromuserid: "",          //回复评论者的id
          commentId: "",           //回复那篇的评论commentid
          photoContent:""
        }
      },
      mounted(){
        this.getPhotoInfo()
      },
      methods:{
        //回复的弹框
        replay(nickname, fromuserid, commentId) {
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
            uuid: this.$route.query.photoid       //日志id或者相册id
          };
          console.log(data);
          addComment(data)
            .then(res => {
              if (res.status === 200) {
                console.log("点击回复的内容");
                console.log(res);
                this.getPhotoInfo();
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
        },
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
                  this.getPhotoInfo()
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
        //添加评论
        addPhotoComment(){
          console.log("图片的评论按钮已点击");
          let data = {
            content: this.commentContent,        //评论内容
            fromuser: localStorage.getItem("loginUser"),   //来自谁的评论
            touser: this.$route.params.id,       //给谁的评论
            status: "0",       //是否已读
            typeid: "0",       //判断是否是评论还是回复
            parentid: "0",      //评论还是回复
            uuid: this.$route.query.photoid      //日志id或者相册id
          };
          console.log(data);
          addComment(data)
            .then(res => {
              if (res.status === 200) {
                console.log(res);
                console.log("评论成功打印");
                this.$notify({
                  title: '评论成功',
                  message: '感谢您的评论！',
                  type: 'success'
                });
                this.getPhotoInfo()
              }
            })
            .catch(err => {
              console.log("评论错误打印");
              console.log(err);
            })
        },
      //  得到相册数据包含评论和回复
        getPhotoInfo(){
          getPhoto({photoid:this.$route.query.photoid})
            .then(res=>{
              console.log(res);
              //得到相片的路径
              this.imgUrl=res.object.photo;
              //得到该相片的相关内容
              this.photoContent=res.object.title;
              this.commaRE=res.obj;
              this.loading = false;
              this.photoComment = [];      //此处将评论数组清空
              this.replayPhotoComment = [];    //此处将回复的数组清空

              //获取该相片下的评论
              res.obj.find(item => {
                for (let i = 0; i < res.obj.length; i++) {
                  if (item.parentid === 0) {
                    if (!~this.photoComment.indexOf(item)) {
                      this.photoComment.push(item);
                    }
                  }
                }
              });
              console.log("打印评论");
              console.log(this.photoComment);

              //此处是用来判断回复是属于那个评论的
              const commentIds = res.obj.map(item => ({
                commentid: item.commentid
              }));
              this.commentIds = commentIds;
              console.log(this.commentIds);
              //回复评论的数组
              res.obj.find(item => {
                for (let i = 0; i < res.obj.length; i++) {
                  if (item.parentid === this.commentIds[i].commentid) {
                    if (!~this.replayPhotoComment.indexOf(item)) {
                      this.replayPhotoComment.push(item)
                    }
                  }
                }
              });
              console.log("打印回复");
              console.log(this.replayComment);
            })
            .catch(err=>{
              console.log(err);
            })
        }
      }
    }
</script>

<style scoped>
  .father .child {
    display: none;
  }
  .father:hover .child {
    display: inline;
  }
  .content{
    width: 200px;
    word-wrap:break-word;
    word-break:break-all;
  }

</style>
