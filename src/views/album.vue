<template>
  <div>
    <div class="container">
      <!--导航-->
      <navBar></navBar>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {getPhotoClass} from "../api";
  import navBar from "./nav/navBar"
  export default {
    components:{
      navBar
    },
    data() {
      return {
        album: [],
        loading:false,
      };
    },
    created(){
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "2");
    },
    mounted() {

      let id = this.$route.params.id;
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
