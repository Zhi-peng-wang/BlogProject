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
              <h3>王小明</h3>
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
              <router-link :to="`/${$route.params.id}`+'/home_page'">个人中心</router-link>
            </el-menu-item>
          </el-menu>
          <br>
        </div>
      </div>

      <el-row :gutter="20" style="margin-left: 10px"  v-loading="loading">
        <el-col :span="8">
          <div class="fenlei"
               style="border: 1px solid #cee3e9;height: 90px;margin: 20px 0 0 20px;background:rgba(226,235,237,.6);">
            <div class="middle-box">
              <div class="middle-inner" style="border-right:1px solid #cee3e9;">
                <p><span class="suc-tip">照片</span><br/></p>
                <p><span class="suc-tip">6</span></p>
              </div>
              <div class="middle-inner" style="border-right:1px solid #cee3e9;">
                <p><span class="suc-tip">日志</span><br/></p>
                <p><span class="suc-tip">21</span></p>
              </div>
              <div class="middle-inner">
                <p><span class="suc-tip">留言</span><br/></p>
                <p><span class="suc-tip">66</span></p>
              </div>
            </div>
          </div>
          <!--      第一个框-->
          <div class="geren">
            <div class="col-md-4" style="height: 40px;width:338px;background: #f5f5f5;">
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
          <div class="fangke">
            <div class="col-md-4" style="height: 40px;width:338px;background: #f5f5f5;margin-bottom: 800px">
              <p style=" font-weight: bold;">最近访客</p>
            </div>
          </div>
        </el-col>

        <!--        右边部分-->
        <el-col :span="16">
          <div class="txt"
               v-for="(t,index) in home" :key="index">

            <div class="title"> {{t.title}}</div>
            <div class="content" v-html="t.content"> {{t.content}}</div>
            <div class="fixed">
              <img src="../assets/alarm-fill.png" style="width: 15px;height: 15px;float: left">
              <span style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">
             {{t.blogdate.slice(0,10)}}-{{t.blogdate.slice(11,16)}}
            </span>
              <img src="../assets/eye-line.png" style="width: 15px;height: 15px;float: left;margin:0 0 10px 20px">
              <p style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">浏览（99+）</p>
              <img src="../assets/pl.png" style="width: 15px;height: 15px;float: left;margin:0 0 10px 20px">
              <p style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">评论（99+）</p>
            </div>
          </div>

        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>
  import {getNewBlog, getUser} from "../api";

  export default {
    inject: ['reload'],
    data() {
      return {
        activeIndex: "1",
        home: [],
        sex: "",
        email: "",
        nickname: "",
        blogs: [],
        loading:false,
        note: {
          backgroundImage: "url(" + require("../assets/zhuye.jpg") + ")",
          backgroundRepeat: "no-repeat",
        },
      };
    },

    mounted() {
      this.loading=true;
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
          this.pv = result.pv;
          this.email = result.email;
          this.personal = result.personals;
          console.log(this.personal);
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
          }));
          this.home = blogs;
          console.log(this.home);
        })
        .catch(error => {
          console.log("取得个人信息数据失败");
        });
      this.loading=true;
      // this.reload();
    },


  };
</script>

<style scoped>
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
    margin: 20px 0 0 20px
  }

  p {
    color: black;

    margin: 10px 0 0 10px;
  }

  .fangke {
    /*background: #ffffff;*/
    background: rgba(226, 235, 237, .6);
    height: 300px;
    border: 1px solid #cee3e9;
    margin: 20px 0 0 20px
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
