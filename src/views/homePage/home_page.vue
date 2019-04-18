<template>
  <div>
    <h1>主页页面:{{this.$route.params.id}}</h1>
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
          <el-menu-item index="1" style="margin-left:30%">主页</el-menu-item>
          <el-menu-item index="2">
            <router-link :to="`/${$route.params.id}`+'/album/photo_class'">相册</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="`/${$route.params.id}`+'/blog'">日志</router-link>
          </el-menu-item>
          <el-menu-item index="4">留言</el-menu-item>
          <el-menu-item index="5">访客</el-menu-item>
          <el-menu-item index="6">评论</el-menu-item>
          <el-menu-item index="7">
            <router-link :to="`/${$route.params.id}`+'/home_page'">个人中心</router-link>
          </el-menu-item>
        </el-menu>
        <br>
      </div>
    </div>
    `
    <!--个人信息-->
    <div class="container">
      <div class="row">
        <!--个人信息的分级目录-->
        <div class="col-md-4">
          <div class="panel panel-info">
            <div class="panel-heading">`
              <span>个人信息</span>
            </div>
            <div class="panel-body" style="padding: 15px 5px">
              <div class="list-group">
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/person_data'">个人资料</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/all_blog_list'">日志列表</router-link>
                </button>
                <button type="button" class="list-group-item">
                  日志类别
                </button>
                <button type="button" class="list-group-item">
                  相册列表
                </button>
                <button type="button" class="list-group-item">
                  相册类别
                </button>
                <button type="button" class="list-group-item">
                  评论我的
                </button>
                <button type="button" class="list-group-item">
                  我参与的
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/add_blog'">添加日志</router-link>
                </button>
                <button type="button" class="list-group-item">
                  添加图片
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--个人信息的展示区域-->
        <div class="col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        activeIndex: '7',
      }
    }
  }
</script>

<style scoped>
  a {
    color: black;
    display: block;
  }
  li {
    list-style: none;
  }
</style>
