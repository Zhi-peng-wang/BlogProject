<template>
  <div>
    <div class="container">
      <!--导航-->
      <navBar></navBar>
      <!--<h1>这是留言页面</h1>-->
      <div class="row">
        <el-card shadow="always">
          <p style="text-align: center;margin: 0;font-size: 26px;font-family: 幼圆;font-weight: 900">
            欢迎你来到我的空间！
          </p>
        </el-card>
      </div>


      <!--留言输入框-->
      <div class="el-row">
        <label style="margin-top: 15px">发表您的留言：</label>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="发表您的留言"
          v-model="leaveMsg"
          style="margin-top: 15px">
        </el-input>
        <img @click="showToggle()" class="face" src="../../assets/face.png">

        <el-button type="primary" size="mini"
                   @click="addBbs()"
                   style="margin-top: 15px;float: right">
          发表留言
        </el-button>
        <emotion :height="300" @emotion="handleEmotion" v-if="!isShow"></emotion>
      </div>
      <!--留言输入框-->

      <!--留言展示区域-->
      <div style="height: 30px"></div>
      <div class="row" style="margin: 30px 0px" v-for="(m,index) in msg" :key="index">
        <el-card shadow="hover"
                 style="margin-bottom: 30px">
          <div class="row" style="height: 80px">
            <div class="col-md-2">
              <img :src="m.userimg" alt="留言头像" width="80px" height="80px">
            </div>
            <div class="col-md-9">
              <div class="row">
                <h4>{{m.nickname}}</h4>
              </div>
              <div class="row">
                <p v-html="m.bbscontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{m.bbscontent}}</p>
              </div>
              <div class="row">
                <p style="float: left;color: #C0C0C0">{{m.bbsdate.slice(0,10)}}</p>
                <p style="float: left;margin-left: 20px;color: #3366CC" @click="showReplay()">回复</p>
                <p style="float: left;margin-left: 15px;color: #3366CC">删除</p>
              </div>
            </div>
          </div>

          <!--              留言的评论-->
          <div v-if="!Show">
            <!--              回复的输入框-->
            <textarea class="text" rows="5" v-model="replayContent"></textarea>
            <!--              留言的回复-->
            <img @click="showFace()" class="face" src="../../assets/face.png">
            <button
              size="mini"
              type="primary"
              @click="replay(m.nickname,m.fromuser,m.bbsid)"
              style="margin:4px 40px 10px 0;float: left">
              发表
            </button>
            <emotion :height="300" @emotion="handleEmotion" v-if="!faceShow"></emotion>
          </div>
          <!--              留言的评论-->
          <!--回复的展示-->
          <div class="row" v-for="(r,index) in replayComment">
            <div v-if="r.parentid===m.bbsid">
              <div class="col-md-2" style="padding: 0">
                <div style="width: 80px;margin: 0 auto;padding-bottom:3px;">
                  <img :src="r.userimg"
                       alt="图片" width="60px" height="60px" style="margin: 10px">
                </div>
              </div>
              <div style="padding: 0">
                <div class="col-md-10" style="padding-bottom:3px;">
                  <div style="line-height: 20px;margin:15px 0px 0px 20px;font-size: 12px">
                    <p class="content">
                      {{r.nickname}} 回复：{{m.fromuser}}：
                      <span v-html="r.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                              {{r.content}}
                            </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--回复的展示-->
        </el-card>
      </div>
      <!--留言展示区域-->

    </div>
  </div>
</template>

<script>
  import navBar from "../nav/navBar.vue"
  import {addBbs, getBbs} from "../../api";
  import Emotion from '@/components/Emotion/index'

  export default {
    components: {
      navBar, Emotion
    },
    data() {
      return {
        leaveMsg: "",
        msg: [],       //留言的数组
        isShow: true,
        Show: true,
        faceShow: true,
        replayContent: "",      //回复的内容
        commentIds: [],
        commentId: "",           //回复那篇的评论commentid
        replayComment: [],//该篇日志的作者
        content: '',
        comment: '',
      }
    },
    created() {
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "4");
    },
    mounted() {
      this.getBbsMethods()
    },
    methods: {
      //得到留言及回复留言的相关内容
      getBbsMethods() {
        let data = {
          touserid: this.$route.params.id
        };
        getBbs(data)
          .then(res => {
            console.log("留言的相关内容");
            console.log(res);
            //获取留言
            this.msg = res.object;
            // this.msg ="";    //此处将回复的数组清空
            this.replayComment = [];    //此处将回复的数组清空
            console.log(this.msg);

            const commentIds = res.obj.map(item => ({
              bbsid: item.bbsid
            }));
            this.commentIds = commentIds;
            console.log(this.commentIds);
            //回复评论的数组
            res.obj.find(item => {
              for (let i = 0; i < res.obj.length; i++) {
                if (item.parentid === this.commentIds[i].bbsid) {
                  if (!~this.replayComment.indexOf(item)) {
                    this.replayComment.push(item)
                  }
                }
              }
            });
            console.log(this.replayComment);
          }).catch(err => {
          console.log(err);
        })
      },
      //确认的弹框
      confirmAddMsg() {
        console.log("留言的按钮被点击");
        this.$confirm('确认发表该留言吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            //添加留言的方法
            this.addBbs();
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消',
              showClose: true
            });
          }
        });

      },
      //添加留言的接口
      addBbs() {
        console.log("接口的方法");
        let data = {
          userid: localStorage.getItem("loginUser"),
          bbscontent: this.leaveMsg,
          touserid: this.$route.params.id,//给谁的评论
          parentid: 0,
          typeid: 0,
          status: 0
        };
        console.log(data);
        addBbs(data)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              // this.getBlogComment();
              this.leaveMsg = "";
              this.$message({
                type: 'success',
                message: '留言成功!',
                showClose: true
              });
            } else {
              this.$message({
                type: 'error',
                message: '服务器正忙，请稍后再试',
                showClose: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.isShow = !this.isShow
      },

      //回复的操作
      reComment() {
        console.log("回复的内容");
        let data = {
          userid: localStorage.getItem("loginUser"),
          bbscontent: this.replayContent,
          touserid: this.$route.params.id,//给谁的评论
          parentid: this.commentId,
          typeid: 1,
          status: 0
        };
        console.log(data);
        addBbs(data)
          .then(res => {
            console.log("点击回复的内容");
            console.log(res);
            // 重点
            this.getBbsMethods();
            this.replayContent = "";
            this.$notify({
              title: '回复成功',
              message: '您的回复很快就能被看到啦！',
              type: 'success'
            });
            // if (res.status === 200) {
            //
            // } else {
            //   this.$notify({
            //     title: '回复失败',
            //     message: '出错了！！！',
            //     type: 'error'
            //   });
            // }
          })
          .catch(err => {
            console.log(err);
          })
        // console.log(nickname, fromuserid, commentId);
      },
      //回复的弹框 new
      replay(nickname, fromuserid, commentId) {
        this.isShow = !this.isShow;
        this.fromuserid = fromuserid;
        this.commentId = commentId;
        this.reComment();
      },
      // 将匹配结果替换表情图片
      handleEmotion(i) {
        this.replayContent += i
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
        this.isShow = !this.isShow
      },
      showReplay() {
        this.Show = !this.Show
      },
      showFace() {
        this.faceShow = !this.faceShow
      },
    }
  }
</script>

<style scoped>
  .face {
    float: left;
    width: 17px;
    height: 17px;
    margin: 10px 20px 0 20px
  }

  .text {
    display: block;
    /*margin: 0 auto;*/
    margin-bottom: 10px;
    width: 800px;
    resize: none;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 8px;
  }
</style>
