<template>
  <div :style="note" class="note">
    <div class="container">
      <div class="container">
        <div class="nav_bar">
          <!-- <img src="holder.js/100px60" /> -->
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item>
              <img src="../assets/tx.jpg">
            </el-menu-item>
            <el-menu-item>
              <h3>{{this.$route.params.id}}</h3>
            </el-menu-item>
            <el-menu-item index="1" style="margin-left:42%">
              <router-link :to="`/${$route.params.id}`+'/home'">主页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="`/${$route.params.id}`+'/album/photo_class'">相册</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="`/${$route.params.id}`+'/blog'">日志</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link :to="`/${$route.params.id}`+'/leaveMessage'">留言</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link :to="`/${$route.params.id}`+'/home_page'">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{loginUser}}<i class="el-icon-arrow-down el-icon--right" style="margin:-3px 0px 0px -3px"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link :to="`/${$route.params.id}`+'/home_page'">个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link :to="`/${$route.params.id}`+'/editPassword'">修改密码</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </router-link>
            </el-menu-item>
          </el-menu>
          <br>
        </div>
      </div>

      <el-row :gutter="20" style="margin-left: 10px"  v-loading="loading">
        <el-col :span="8">
          <div class="fenlei">
            <div class="middle-box">
              <div class="middle-inner" style="border-right:1px solid #cee3e9;">
                <p><span class="suc-tip">照片</span><br/></p>
                <p><span class="suc-tip">{{photonum}}</span></p>
              </div>
              <div class="middle-inner" style="border-right:1px solid #cee3e9;">
                <p><span class="suc-tip">日志</span><br/></p>
                <p><span class="suc-tip">{{blognum}}</span></p>
              </div>
              <div class="middle-inner">
                <p><span class="suc-tip">留言</span><br/></p>
                <p><span class="suc-tip">66</span></p>
              </div>
            </div>
          </div>
          <!--      第一个框-->
          <div class="geren">
            <div class="col-md-4" style="height: 40px;width:358px;background: #f5f5f5;">
              <p style=" font-weight: bold;">个人档</p>
            </div>

            <div>
              <div style="margin: 50px auto  0 ;height: 40px;width: 300px;border-bottom: 1px solid #f5f5f5">
                <img src="../assets/account-circle-line.png" style="width: 25px;height: 25px;float: left">
                <a style="margin:5px 0 0 15px;font-size: 13px;color: black;float: left">
                  {{nickname}}
                </a>
              </div>

              <div style="margin: 10px auto;height: 40px;width: 300px;border-bottom: 1px solid #f5f5f5">
                <img src="../assets/bill-line.png" style="width: 25px;height: 25px;float: left">
                <a style="margin:5px 0 0 15px;font-size: 13px;color: black;float: left">
                  {{sex}}
                </a>
              </div>
              <div style="margin: 10px auto;height: 40px;width: 300px;">
                <img src="../assets/water-flash-line.png" style="width: 25px;height: 25px;float: left">
                <a style="margin:5px 0 0 15px;font-size: 13px;color: black;float: left">
                  {{email}}
                </a>
              </div>

            </div>
          </div>
          <!--      第二个框-->
          <div class="panel panel-warning">
            <div class="panel-heading">
              <b>最近访客</b>
            </div>
            <div class="panel-body" style="padding-bottom: 0;">
              <div style="height: 330px">
                <!--访客人员的信息-->
                <div class="row">
                  <div class="col-md-4" style="padding: 0;"
                       v-for="(v,index) in visitorInfo.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                       :key="index">
                    <el-tooltip  placement="top">
                      <div slot="content" style="width: 60px;text-align: center">{{v.nickname}}</div>
                      <div>   <!--这是最外面的盒子-->
                        <div style="margin: 5px auto;width:88px; height:88px;background: skyblue;">  <!--这是包裹图片的盒子-->
                          <!--<img src="" alt="访客头像" width="66px" height="57px">-->
                        </div>
                        <div>   <!--这是访客访问的日期的盒子-->
                          <p class="vistorDate">{{v.guestdate.slice(0,10)}}</p>
                        </div>
                      </div>
                    </el-tooltip>

                  </div>
                </div>
              </div>
              <!--访客的分页-->
              <div>
                <el-pagination style="text-align: right;margin-top: 15px"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-size="PageSize"
                               layout="prev,next"
                               :total="totalCount">
                </el-pagination>
              </div>
            </div>
            <!--浏览量-->
            <div class="panel-body" style="padding: 0 0 15px 0">
              <div class="row">
                <div class="col-md-6">
                  <p class="browseNum">今日浏览</p>
                  <p class="browseNum"><b>30</b></p>
                </div>
                <div class="col-md-6">
                  <p class="browseNum">总浏览量</p>
                  <p class="browseNum"><b>6666</b></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!--右边部分-->
        <el-col :span="16">
          <div class="txt"
               v-for="(t,index) in home" :key="index">
            <div class="title"> {{t.title}}</div>
            <div class="content" v-html="t.content"> {{t.content}}</div>
            <div class="fixed">
              <img src="../assets/alarm-fill.png" class="blogIcon">
              <span class="blogDP">
             {{t.blogdate.slice(0,10)}}-{{t.blogdate.slice(11,16)}}
            </span>
              <img src="../assets/eye-line.png" class="blogIcon">
              <p class="blogDP">浏览（{{t.pv}}）</p>
              <img src="../assets/pl.png" class="blogIcon">
              <p class="blogDP">评论（99+）</p>
              <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_content',query:{blogid:t.blogid}}"
                           class="blogDP"
                           style="font-size: 14px;margin:0 0 10px 300px">
                <el-button  size="mini">阅读全文</el-button>
              </router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {addGuest, getGuest, getNewBlog, getUser} from "../api";

  export default {
    inject: ['reload'],
    data() {
      return {
        activeIndex: "1",
        home: [],
        sex: "",
        email: "",
        photonum: "",
        blognum: "",
        nickname: "",
        blogs: [],
        loading:false,
        loginUser:"",
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:30,
        // 默认每页显示的条数（可修改）
        PageSize:9,
        //访客信息
        visitorInfo:[],
        note: {
          backgroundImage: "url(" + require("../assets/zhuye.jpg") + ")",
          backgroundRepeat: "no-repeat",
        },
      };
    },
    created(){
      //添加访客
      let dataGuest={
        userid:this.$route.params.id,
        fromuserid:localStorage.getItem("loginUser"),
        typeid:"index"
      };
      addGuest(dataGuest)
        .then(res=>{
          console.log("成功访客信息");
          console.log(res);
        })
        .catch(err=>{
          console.log("失败访客信息");
          console.log(err);
        });
    },
    mounted() {
      //得到访客信息
      let getGuestData={
        userid:this.$route.params.id,
        typeid:"index",
        topnum:30
      };
      getGuest(getGuestData)
        .then(res=>{
          console.log("拿到访客信息");
          console.log(res);
          const result = res.object;
          console.log(result);
          const visitorInfos=result.map(item=>({
            fromuserid: item.fromuserid,
            guestdate:item.guestdate,
            nickname:item.nickname,
            userimg:item.img
          }));
          this.visitorInfo=visitorInfos;
          console.log(this.visitorInfo);
        })
        .catch(err=>{
          console.log("没有拿到访客信息");
          console.log(err);
        });
      this.loading=true;
      this.loginUser=localStorage.getItem("loginUser");
      let id = this.$route.params.id;
      getUser({userid: id})
        .then(res => {
          console.log("获取个人信息数据成功");
          console.log(res);
          const result = res.object;
          this.loading=false;
          this.nickname = result.nickname;
          this.sex = result.sex;
          this.sign = result.sign;
          this.email = result.email;
          this.photonum = result.photonum;
          this.blognum = result.blognum;
        });
      getNewBlog({userid: id})
        .then(res => {
          console.log("获取个人信息数据成功11");
          console.log(res);
          const result = res.object;
          this.loading=false;
          const blogs = result.map(item => ({
            title: item.title,
            content: item.content,
            blogdate: item.blogdate,
            blogid:item.blogid
          }));
          this.home = blogs;
          console.log(this.home);
        })
        .catch(error => {
          console.log("取得个人信息数据失败");
        });
      this.loading=true;
    },
    methods:{
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
    }
  };
</script>

<style scoped>
  .vistorDate{
    margin: 0 auto;
    text-align: center;
    opacity: 0.7;
    font-size: 12px;
  }
  .browseNum{
    text-align: center;
    opacity: 0.7;
  }
  .fenlei{
    border: 1px solid #cee3e9;
    height: 90px;
    margin: 20px 0 0 0px;
    background:rgba(226,235,237,.6);
  }
  .blogDP{
    color: #2e6da4;
    font-size: 11px;
    float: left;
    margin:10px 0 10px 5px
  }
  .blogIcon{
    width: 15px;
    height: 15px;
    float: left;
    margin:10px 0 10px 10px
  }
  a{
    display: block;
  }
  .middle-box {
    display: table; /*重点*/
    /*height: 50px;*/
    margin-top: 8px;
  }

  .middle-inner {
    font-size: 18px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 150px;
    height: 50px;
  }

  .txt {
    border: 1px solid #cee3e9;
    margin: 20px 0 0 20px;
    background: rgba(226, 235, 237, .6);
    height: 180px;
    position: relative

  }

  .fixed {
    position: absolute;
    bottom: 0px;
    padding: 0px;
    margin: 0 0 0 10px;

  }

  .geren {
    /*background: #ffffff;*/
    background: rgba(226, 235, 237, .6);
    height: 194px;
    /*border-radius: 5px;*/
    border: 1px solid #cee3e9;
    margin: 20px 0 20px 0px
  }

  p {
    color: black;

    margin: 10px 0 0 10px;
  }

  .title {
    font-weight: bold;
    font-size: 15px;
    margin: 10px 0 0 5px;
  }

  .content {

    color: #8c8c8c;
    margin: 20px 0 70px 5px;
  }

  .note {
    /*position: fixed;*/
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
</style>
