<template>
  <div>
    <div class="container">
      <div class="nav_bar" style="width:90%;margin:0 auto">
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
              {{loginUser}}
            </router-link>
          </el-menu-item>
        </el-menu>
        <br>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {getPhotoClass} from "../api";
  export default {
    data() {
      return {
        activeIndex: "2",
        album: [],
        loading:false,
        loginUser:""
      };
    },
    mounted() {
      let id = this.$route.params.id;
      this.loginUser=localStorage.getItem("loginUser");
      this.loading=true;
      getPhotoClass({userid:id,typeid:2})
        .then(res=>{
          console.log("请求photo相册数据成功");
          console.log(res);
          const result = res.object;
          this.loading=false;
          const albums = result.map(item => ({
            classid:item.classid,
            photo:item.photo,
            title:item.title
          }));
          this.album = albums;
          console.log(this.album);
        }).catch(error=>{
        console.log("获取photo相册数据失败");
      })
    }
  };
</script>
<style scoped>
  /*li {*/
  /*  list-style: none;*/
  /*}*/
  .fj_img div{
    text-align: center;
  }
  .fj_title {
    border-bottom: 1px solid black;
  }
  .fj_title h4 {
    text-align: center;
    margin: 15px 0;
    font-weight: 600;
    opacity: 0.7;
  }
  .fj_content p {
    margin: 15px;
    font-size: 15px;
    opacity: 0.7;
  }
  /*a {*/
  /*  text-decoration: none;*/
  /*}*/
  .router-link-active {
    text-decoration: none;
  }
</style>
