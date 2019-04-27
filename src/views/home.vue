<template>
  <div :style="note" class="note">
    <div class="container">
      <div class="container">
        <div class="nav_bar" style="width:95%;margin:0 auto">
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

      <div class="container">
        <div class="col-md-4">
          <div class="fenlei"
               style="border: 1px solid #cee3e9;height: 90px;margin: 20px 0 0 20px;background:rgba(226,235,237,.6);">
            <div style="border-right: 1px solid #cee3e9;height: 60px;margin-top: 15px" class="col-md-4">
              <h3 style="margin: auto;margin-left: 15px">{{photonum}}</h3>
              <router-link to="/album" style="margin-left: 5px;color: black">照片</router-link>
            </div>
            <div style="border-right: 1px solid #cee3e9;height:60px;margin-top: 15px" class="col-md-4">
              <h3 style="margin: auto;margin-left: 15px">{{blognum}}</h3>
              <router-link to="/blog" style="margin-left: 15px;color: black">日志</router-link>
            </div>
            <div style="height: 60px;margin-top: 15px" class="col-md-4">
              <h3 style="margin: auto;margin-left: 15px">15</h3>
              <router-link to="/liuyan" style="margin-left: 15px;color: black">留言</router-link>
            </div>
          </div>

          <!--第一个框-->
          <div class="geren">
            <div class="col-md-4" style="height: 40px;width:327px;background: #f5f5f5;">
              <p style=" font-weight: bold;">个人档</p>
            </div>
            <div>
              <div style="margin: 50px auto  0 ;height: 40px;width: 300px;border-bottom: 1px solid #f5f5f5">
                <img src="../assets/account-circle-line.png" style="width: 25px;height: 25px">
                <a style="margin-left: 15px;font-size: 13px;color: black">
                  {{nickname}}
                </a>
              </div>
              <div style="margin: 10px auto;height: 40px;width: 300px;border-bottom: 1px solid #f5f5f5">
                <img src="../assets/bill-line.png" style="width: 25px;height: 25px">
                <a style="margin-left: 15px;font-size: 13px;color: black">
                  {{sex}}
                </a>
              </div>
              <div style="margin: 10px auto;height: 40px;width: 300px;">
                <img src="../assets/water-flash-line.png" style="width: 25px;height: 25px">
                <a style="margin-left: 15px;font-size: 13px;color: black">
                  {{email}}
                </a>
              </div>
            </div>
          </div>

          <!--      第二个框-->
          <div class="fangke">
            <div class="col-md-4" style="height: 40px;width:327px;background: #f5f5f5;margin-bottom: 800px">
              <p style=" font-weight: bold;">最近访客</p>
            </div>
          </div>
        </div>

        <div class="col-md-7"
             style="border: 1px solid #cee3e9;margin: 20px 0 0 50px; background:rgba(226,235,237,.8);height: 200px"
             v-for="(t,index) in home" :key="index">
          <div class="title"> {{t.title}}</div>
          <div class="content" v-html="t.content"> {{t.content}}</div>
          <div>
            <img src="../assets/alarm-fill.png" style="width: 15px;height: 15px;float: left">
            <p style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">
              {{t.blogdate.slice(0,10)}}-{{t.blogdate.slice(11,16)}}</p>
            <img src="../assets/eye-line.png" style="width: 15px;height: 15px;float: left;margin:0 0 10px 20px">
            <p style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">
              浏览（{{t.pv}}）</p>
            <img src="../assets/pl.png" style="width: 15px;height: 15px;float: left;margin:0 0 10px 20px">
            <p style="color: #2e6da4;font-size: 11px;margin: 2px 0 0 5px;float: left;margin:0 0 10px 5px">评论（99+）</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getNewBlog, getUser} from "../api";

  export default {
    data() {
      return {
        activeIndex: "1",
        home: [],
        sex: "",
        email: "",
        photonum: "",
        blognum: "",
        nickname: "",
        note: {
          backgroundImage: "url(" + require("../assets/zhuye.jpg") + ")",
          backgroundRepeat: "no-repeat",
        },
      };
    },
    mounted() {
      let id = this.$route.params.id;
      getUser({userid: id})
        .then(res => {
          console.log("获取个人信息数据成功");
          console.log(res);
          const result = res.object;

          this.nickname = result.nickname;
          this.sex = result.sex;
          this.sign = result.sign;
          this.pv = result.pv;
          this.email = result.email;
          this.personal = result.personals;
          this.photonum = result.photonum;
          this.blognum = result.blognum;
          console.log(this.personal);
        });
      getNewBlog({userid: id})
        .then(res => {
          console.log("获取个人信息数据成功11");
          console.log(res);
          const result = res.object;
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
        })


    }
  };
</script>

<style scoped>
  .geren {
    /*background: #ffffff;*/
    background: rgba(226, 235, 237, .8);
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
    background: rgba(226, 235, 237, .8);
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
