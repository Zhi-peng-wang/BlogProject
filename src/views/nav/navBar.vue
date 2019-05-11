<template>
  <div class="container">
    <div class="nav_bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item>
          <img :src="imageUrl" width="50px" height="50px">
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
</template>

<script>
    import {getUser} from "../../api";

    export default {
        data(){
          return{
            //头像路径
            imageUrl:"",
            activeIndex: "",
            loginUser:""
          }
        },
        mounted() {
          this.activeIndex=this.$store.state.activeIndex;
          this.loginUser=localStorage.getItem("loginUser");
          getUser({userid:this.$route.params.id})
            .then(res=>{
              console.log(res);
              this.imageUrl=res.object.userimg;
            })
            .catch(err=>{
              console.log(err);
            })
        }
    }
</script>

<style scoped>

</style>
