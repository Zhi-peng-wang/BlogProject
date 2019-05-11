<template>
  <div>
    <div class="container">
      <div class="nav_bar" style="width:90%;margin:0 auto">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item>
            <img src="../../../assets/tx.jpg">
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

    <div class="container">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2019/5/6" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/timg.jpg"/>
              </div>
              <div class="right">
                <h5>查看了小王八的日志</h5><br/>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;"那一年，他离开女儿国。她在城头似哭似笑，当着百官的面，对着他的背影大喊“唐玄奘，下辈子娶我可好?”。
                  夕阳下，白衣骑白马。风沙漫天看不见他的表情。僧人不语，只余风声喧嚣。。。
                  这一年。他圆寂。千佛诵经，万众朝宗。。他走时候却只笑着留下一句莫名奇妙的“好!”......"</p>
              </div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2019/5/5" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/timg.jpg"/>
              </div>
              <div class="right">
                <h5>查看了小王八的相册</h5><br/>
                <img src="../../../assets/xwb.jpg" style="height: 150px;width: 200px;margin-bottom: 10px"/></div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2019/5/4" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/timg.jpg"/>
              </div>
              <div class="right">
                <h5>访问了了小王八的主页</h5><br/>
              </div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

    </div>
   </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:false,
        activeIndex:"",
        loginUser:"",
      }
    },
    mounted(){
      this.loginUser=localStorage.getItem("loginUser")
    }
  }

</script>

<style scoped>
  .left{
    float: left;
    margin-bottom: 30px;
    margin-right: 20px;
  }
  .right{

  }
  p{
    float: left;
  }
</style>
