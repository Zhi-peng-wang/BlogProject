<template>
  <div>
    <div class="container">
      <!--导航-->
      <div class="nav_bar" style="width:90%;margin:0 auto">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item>
            <img src="../../assets/tx.jpg">
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
      <h1>这是留言页面</h1>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        activeIndex: '4',
      }
    }
  }
</script>

<style scoped>

</style>
