<template>
  <div>
    <div class="container">
      <!--导航条-->
      <navBar></navBar>
      <!--欢迎语句-->
      <div class="row">
        <el-card shadow="always">
          <p style="text-align: center;margin: 0;font-size: 26px;font-family: 幼圆;font-weight: 900">
            欢迎你来到我的空间！
          </p>
        </el-card>
      </div>
      <!--留言的输入框-->
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
                   @click="addBbsMsg()"
                   style="margin-top: 15px;float: right">
          发表留言
        </el-button>
        <emotion :height="300" @emotion="handleEmotion" v-if="!isShow"></emotion>
      </div>
      <!--与上方产生间隔-->
      <div style="height: 30px"></div>
      <!--留言及留言的回复的显示区域-->
      <div class="row" style="margin: 30px 0px" v-for="(m,index) in msg" :key="index">
        <!--留言的卡片-->
        <el-card shadow="hover"
                 style="margin-bottom: 30px">
          <div class="row" style="height: 80px">
            <div class="col-md-2">
              <img :src="m.userimg" alt="留言头像" style="margin-left: 50px" width="80px" height="80px">
            </div>
            <div class="col-md-9">

              <!--留言数据-->
              <div class="row">
                <h4>{{m.nickname}}</h4>
              </div>
              <div class="row">
                <p v-html="m.bbscontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{m.bbscontent}}</p>
              </div>
              <div class="row">
                <p style="float: left;color: #C0C0C0">
                  {{m.bbsdate.slice(0,10)}}-{{m.bbsdate.slice(11,16)}}
                </p>
                <el-popover
                  placement="top-start"
                  width="400"
                  trigger="click">
                  <p>回复：{{m.nickname}}</p>
                  <!--回复输入框-->
                  <div>
                    <div>
                      <!--文本输入框-->
                      <textarea class="text" rows="3" style="width: 370px" v-model="msgTextarea"></textarea>
                      <img @click="showToggle()" class="face" src="../../assets/face.png">
                    </div>
                    <el-button @click="replay(m.bbsid,m.userid)" size="mini"
                               style="margin: 5px 20px 0 0;float: right"
                               type="primary">
                      回复{{m.nickname}}
                    </el-button>
                    <!-- 表情选择框-->
                    <Emotion :height="200" @emotion="handleEmotionReplay" v-if="isShow"></Emotion>
                  </div>
                  <img src="../../assets/hui.png"
                       slot="reference"
                       style="margin-left: 20px;width: 15px;height: 15px">
                </el-popover>

                <img src="../../assets/shanchu.png"
                     @click="deleteMsg(m.bbsid)"
                     v-if="bigPower||m.fromuserid===loginuser"
                     style="margin-left: 5px;width: 15px;height: 15px">
              </div>

              <!--对留言回复的数据-->
              <div class="row" v-for="(r,index) in replayMsg" :key="index">
                <div v-if="r.parentid===m.bbsid">
                  <div class="row">
                    <div class="col-md-2" style="width:116px;height: 90px">
                      <div style="margin: 0 auto">
                        <img :src="r.userimg" alt="留言头像" width="80px" height="80px">
                      </div>
                    </div>
                    <div class="col-md-9">
                      <div class="row">
                        <h4>{{r.nickname}} 回复：{{m.nickname}}</h4>
                      </div>
                      <div class="row">
                        <p v-html="r.bbscontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{r.bbscontent}}</p>
                      </div>
                      <div class="row">
                        <p style="float: left;color: #C0C0C0">
                          {{r.bbsdate.slice(0,10)}}-{{r.bbsdate.slice(11,16)}}
                        </p>
                        <el-popover
                          placement="top-start"
                          width="400"
                          trigger="click">
                          <p>回复：{{r.nickname}}</p>
                          <!--回复输入框-->
                          <div>
                            <div>
                              <!--文本输入框-->
                              <textarea class="text" rows="3" style="width: 370px" v-model="msgTextarea2"></textarea>
                              <img @click="showToggle()" class="face" src="../../assets/face.png">
                            </div>
                            <el-button @click="replay2(m.bbsid,r.userid)" size="mini"
                                       style="margin: 5px 20px 0 0;float: right"
                                       type="primary">
                              回复{{r.nickname}}
                            </el-button>
                            <!-- 表情选择框-->
                            <Emotion :height="200" @emotion="handleEmotionReplay2" v-if="isShow"></Emotion>
                          </div>
                          <img src="../../assets/hui.png"
                               slot="reference"
                               style="margin-left: 20px;width: 15px;height: 15px">
                        </el-popover>
                        <img src="../../assets/shanchu.png"
                             @click="deleteMsg2(r.bbsid)"
                             v-if="bigPower||r.fromuserid===loginuser"
                             style="margin-left: 5px;width: 15px;height: 15px">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!--分页展示-->
      <div class="block" style="text-align: center">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="page_size"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
  import navBar from "../nav/navBar"
  import {addBbs, deleteBbs, getBbs} from "../../api";
  import Emotion from '@/components/Emotion/index'

  export default {
    inject: ['reload'],
    components: {
      navBar, Emotion
    },
    data() {
      return {
        leaveMsg: "",      //留言框里面的内容
        isShow: true,   //点击表情的按钮是否展示
        msg: [],         //留言的数组
        replayMsg: [],     //回复留言的相关数据
        bbsIds: [],         //每条评论的bbsid数组
        msgTextarea: "",     //评论下的回复
        msgTextarea2: "",
        loginuser: "",           //localstorange里面的数据
        leaveMsgOwner: "",        //文章得到所有者的权限问题
        bigPower: false,         //文章所有者的权限问题
        page_size:0,           //一页多少条
        page_number:0,          //当前页码数
        total:0,
      }
    },
    created() {
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "4");
    },
    mounted() {
      this.loginuser = localStorage.getItem("loginUser");
      //  调用得到留言相关内容的方法
      this.getBbsMethods();
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        //重新调用相关方法得到相应页上的内容
        this.getBbsMethods()
      },
      //删除的方法
      deleteMsg(id) {
        let data = {
          bbsid: id
        };
        deleteBbs(data)
          .then(res => {
            console.log("删除操作执行成功");
            console.log(res);
          })
          .catch(err => {
            console.log("删除操作执行失败");
            console.log(err);
          })
      },
      //删除的方法
      deleteMsg2(id) {
        let data = {
          bbsid: id
        };
        deleteBbs(data)
          .then(res => {
            console.log("删除操作执行成功");
            console.log(res);
          })
          .catch(err => {
            console.log("删除操作执行失败");
            console.log(err);
          })
      },
      //回复的方法
      replay(bbsid, userid) {
        let data = {
          fromuserid: localStorage.getItem("loginUser"),
          userid: this.$route.params.id,
          bbscontent: this.msgTextarea,
          touserid: userid,
          parentid: bbsid,
          typeid: 1,
          status: 0,
        };
        console.log(data);
        addBbs(data)
          .then(res => {
            console.log(res);
            this.reload()
          })
          .catch(err => {
            console.log(err);
          })
      },
      replay2(bbsid, userid) {
        let data = {
          fromuserid: localStorage.getItem("loginUser"),
          userid: this.$route.params.id,
          bbscontent: this.msgTextarea2,
          touserid: userid,
          parentid: bbsid,
          typeid: 1,
          status: 0,
        };
        console.log(data);
        addBbs(data)
          .then(res => {
            console.log(res);
            this.reload()
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 留言的回复将匹配结果替换表情图片
      handleEmotionReplay(i) {
        this.msgTextarea += i
      },
      // 留言的回复将匹配结果替换表情图片
      handleEmotionReplay2(i) {
        this.msgTextarea2 += i
      },
      //添加留言的方法
      addBbsMsg() {
        let data = {
          fromuserid: localStorage.getItem("loginUser"),
          userid: this.$route.params.id,
          bbscontent: this.leaveMsg,
          touserid: this.$route.params.id,
          parentid: 0,
          typeid: 0,
          status: 0
        };
        addBbs(data)
          .then(res => {
            console.log("成功添加留言");
            console.log(res);
            this.$notify({
              title: '留言成功',
              message: '感谢您的留言！',
              type: 'success'
            });
            this.reload();
          })
          .catch(err => {
            console.log("添加留言失败");
            console.log(err);
          })
      },
      //得到留言相关内容
      getBbsMethods() {
        let data = {
          userid: this.$route.params.id,
          pagenum: this.page_number
        };
        getBbs(data)
          .then(res => {
            console.log("得到留言及留言的回复的内容");
            console.log(res);
            const result = res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            this.msg=[];

            //留言版的版主的所有者id(最大权限问题)
            this.leaveMsgOwner = this.$route.params.id;
            console.log("留言板版主所有者的id");
            console.log(this.leaveMsgOwner);
            //判断是否有删除的权限（最大的权限问题）
            if (this.leaveMsgOwner === localStorage.getItem("loginUser")) {
              this.bigPower = true
            }

            console.log(result);
            result.find(item => {
              for (let i = 0; i < res.object.content.length; i++) {
                if (item.parentid === "0") {
                  if (!~this.msg.indexOf(item)) {
                    this.msg.push(item);
                    console.log("此处打印只包含留言的相关内容");
                  }
                }
              }
            });
            console.log(this.msg);
            //拿到留言的bbsid数组值
            const ids = result.map(item => ({
              bbsid: item.bbsid
            }));
            this.bbsIds = ids;
            //  提取留言的回复内容
            result.find(item => {
              for (let i = 0; i < res.object.content.length; i++) {
                if (item.parentid === this.bbsIds[i].bbsid) {
                  if (!~this.replayMsg.indexOf(item)) {
                    this.replayMsg.push(item)
                  }
                }
              }
            });
            console.log(this.replayMsg);
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 表情框点击显示
      showToggle() {
        this.isShow = !this.isShow
      },
      // 将匹配结果替换表情图片
      handleEmotion(i) {
        this.leaveMsg += i
      },
      // 将匹配结果替换表情图片
      emotion(res) {
        let word = res.replace(/\#|\;/gi, '')
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word)
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
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
</style>
