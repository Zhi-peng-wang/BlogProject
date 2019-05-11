<template>
  <div>
    <!--导航条-->
    <navBar></navBar>

    <!--个人信息-->
    <div class="container">
      <div class="row">
        <!--个人信息的分级目录-->
        <div class="col-md-3">
          <div class="panel panel-info">
            <div class="panel-heading">
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
                  <router-link :to="`/${$route.params.id}`+'/home_page/blogCategory'">日志类别</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/albumAll'">相册列表</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/albumCategory'">相册类别</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/myComment'">评论我的</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/myParticipate'">我参与的</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/add_blog'">添加日志</router-link>
                </button>
                <button type="button" class="list-group-item">
                  <router-link :to="`/${$route.params.id}`+'/home_page/addPhoto'">添加图片</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--个人信息的展示区域-->
        <div class="col-md-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from "../nav/navBar"
  export default {
    components:{
      navBar
    },
    data(){
      return{
        activeIndex: '5',
        loginUser:""
      }
    },
    created(){
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "5");
    },
    mounted(){
      sessionStorage.setItem("sorderA", "");
      sessionStorage.setItem("sAclassName","");
      sessionStorage.setItem("sAclassId", "");
      this.loginUser=localStorage.getItem("loginUser");
    }
  }
</script>

<style scoped>
  /*a {*/
  /*  color: black;*/
  /*  display: block;*/
  /*}*/
  /*li {*/
  /*  list-style: none;*/
  /*}*/
</style>
