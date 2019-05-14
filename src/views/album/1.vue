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

            <div class="panel-body">
              <!--评论的展示-->
              <div class="row" v-for="(c,index) in photoComment" :key="index">
                <div>
                  <div class="col-md-3" style="padding: 0">
                    <div style="width: 80px;margin: 0 auto;padding-bottom:3px;">
                      <img :src="c.userimg"
                           alt="图片" width="60px" height="60px" style="margin: 10px">
                    </div>
                  </div>
                  <div class="col-md-9" style="padding: 0">
                    <div style="padding-bottom:3px;" class="father">
                      <div style="font-size: 12px">
                        <p class="content">
                          {{c.nickname}}：</p>
                        <p v-html="c.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                          {{c.content}}
                        </p>
                        <div style="margin: 0;font-size: 12px">
                          <el-popover
                            placement="top-start"
                            width="400"
                            trigger="hover">
                            <p>回复：{{c.nickname}}</p>
                            <!--回复输入框-->
                            <div>
                              <div>
                                <!--文本输入框-->
                                <textarea class="text" rows="3" style="width: 370px" v-model="replayContent"></textarea>
                                <img @click="showToggle()" class="face" src="../../assets/face.png">
                              </div>
                              <el-button @click="replay(c.nickname,c.fromuser,c.commentid)" size="mini"
                                         style="margin: 5px 20px 0 0;float: right"
                                         type="primary">
                                回复{{c.nickname}}
                              </el-button>
                              <!-- 表情选择框-->
                              <Emotion :height="200" @emotion="handleEmotionReplay" v-if="isShow"></Emotion>
                            </div>

                            <div class="child"
                                 plain size="mini"
                                 style="margin-left: 15px"
                                 slot="reference"
                                 type="primary">
                              <img src="../../assets/hui.png" style="width: 15px;height: 15px">
                            </div>
                          </el-popover>

                          <div @click="deleteCom(c.commentid)" class="child" plain
                               size="mini"
                               style="margin-left:5px">
                            <img src="../../assets/shanchu.png" style="width: 15px;height: 15px">
                          </div>
                        </div>

                      </div>


                    </div>
                    <!--回复相关内容-->
                    <div class="row" v-for="(r,index) in replayPhotoComment">
                      <div v-if="r.parentid===c.commentid">
                        <div class="col-md-2" style="padding: 0">
                          <div style="padding-bottom: 30px;">
                            <img :src="r.userimg"
                                 alt="图片" height="60px" style="margin: 10px" width="60px">
                          </div>
                        </div>
                        <div class="father">
                          <div class="col-md-10" style="padding-bottom: 10px;">
                            <div style="height: 80px">
                              <p style="line-height: 20px;margin: 10px 20px;font-size: 12px">
                                {{r.nickname}} 回复：{{r.touser}}：
                                <span v-html="r.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                                  {{r.content}}
                                </span>
                              </p>
                              <div style="line-height: 20px;margin: 0px 20px;font-size: 12px">
                                <el-popover
                                  placement="top-start"
                                  width="400"
                                  trigger="hover">
                                  <p>回复：{{r.nickname}}</p>
                                  <!--回复输入框-->
                                  <div>
                                    <div>
                                      <!--文本输入框-->
                                      <textarea class="text" rows="3" style="width: 370px" v-model="replayContent"></textarea>
                                      <img @click="showToggle()" class="face" src="../../assets/face.png">
                                    </div>
                                    <el-button @click="replay(r.nickname,r.fromuser,c.commentid)" size="mini"
                                               style="margin: 5px 20px 0 0;float: right"
                                               type="primary">
                                      回复{{r.nickname}}
                                    </el-button>
                                    <!-- 表情选择框-->
                                    <Emotion :height="200" @emotion="handleEmotionReplay" v-if="isShow"></Emotion>
                                  </div>

                                  <div class="child"
                                       plain size="mini"
                                       style="margin-left: 15px"
                                       slot="reference"
                                       type="primary">
                                    <img src="../../assets/hui.png" style="width: 15px;height: 15px">
                                  </div>
                                </el-popover>



                                <div @click="deleteCom(r.commentid)" class="child" plain
                                     size="mini"
                                     style="margin-left: 5px">
                                  <img src="../../assets/shanchu.png" style="width: 15px;height: 15px">
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
              <div>
                <!--            文本输入框-->
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="commentContent"
                  style="margin-top: 15px">
                </el-input>

                <img src="../../assets/face.png" @click="showToggle()" class="fa">
              </div>
              <el-button @click="addPhotoComment()" size="mini"
                         style="margin: 0px 20px 0 0;float: right"
                         type="primary">
                发表评论
              </el-button>
              <!--            表情选择框-->
              <emotion :height="280"
                       @emotion="handleEmotion"
                       v-show="isShow"
                       style="margin: 30px 0 20px 0"></emotion>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {addComment, deleteComment, getPhoto} from "../../api";
  import Emotion from '@/components/Emotion/index'

  export default {
    data() {
      return {
        //图片的路径
        imgUrl: "",
        //  评论的内容
        commentContent: "",
        //  评论和回复的数组
        commentRe: [],
        loading: false,
        //相片的评论
        photoComment: [],
        //相片评论的回复
        replayPhotoComment: [],
        commentIds: [],
        replayContent: "",      //回复的内容
        fromuserid: "",          //回复评论者的id
        commentId: "",           //回复那篇的评论commentid
        photoContent: "",
        seen: true,
        current: 0,
        content: '',
        comment: '',
        isShow: false,
      }
    },
    mounted() {
      this.getPhotoInfo()
    },
    methods: {
      //回复的弹框 new
      replay(nickname, fromuserid, commentId) {
        this.isShow=!this.isShow;
        this.fromuserid = fromuserid;
        this.commentId = commentId;
        this.reComment();
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
      addPhotoComment() {
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
              this.commentContent="";
              console.log(res);
              console.log("评论成功打印");
              this.$notify({
                title: '评论成功',
                message: '感谢您的评论！',
                type: 'success'
              });
              this.getPhotoInfo();
            }
          })
          .catch(err => {
            console.log("评论错误打印");
            console.log(err);
          })
      },
      //  得到相册数据包含评论和回复
      getPhotoInfo() {
        getPhoto({photoid: this.$route.query.photoid})
          .then(res => {
            this.isShow = !this.isShow;
            console.log(res);
            //得到相片的路径
            this.imgUrl = res.object.photo;
            //得到该相片的相关内容
            this.photoContent = res.object.title;
            this.commaRE = res.obj;
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
          .catch(err => {
            console.log(err);
          })
      },
      // 评论的回复将匹配结果替换表情图片
      handleEmotionReplay(i) {
        this.replayContent += i
      },
      // 将匹配结果替换表情图片
      handleEmotion(i) {
        this.commentContent += i
      },
      // 将匹配结果替换表情图片
      emotion(res) {
        let word = res.replace(/\#|\;/gi, '')
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word)
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
      },
      // 表情框点击显示
      showToggle() {
        this.isShow = !this.isShow;
      },
    },
    components: {
      Emotion
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

  .content {
    width: 200px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .text {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 600px;
    resize: none;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 8px;
  }

  .text-place {
    height: 80px;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 8px;
    background: #ddd5d5;
  }

  .text-place p {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .fa {
    width: 17px;
    height: 17px;
    margin: 20px 0 0 20px
  }
  .face {
    width: 17px;
    height: 17px;
    margin-left: 20px
  }
</style>
