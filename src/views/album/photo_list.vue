<template>
  <div class="container">
    <h1>photo_list页面{{this.$route.query.photoid}}</h1>
    <div class="row">
      <!-- 此处判断语句最好使用v-show 因为v-if在编辑器内报错 但是不影响结果 -->
      <ul class="col-md-4" v-for="(p,index) in photo_list" :key="index">
        <li>
          <router-link :to="`/${$route.params.id}`+'/album/photo_content'">
            <div class="fj_img">
              <img :src="p.thumbnail">
            </div>
            <div class="fj_date">
              <p>{{p.photodate.slice(0,10)}}</p>
            </div>
            <div class="fj_title">
              <h4>{{p.title}}</h4>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getClassPhoto} from "../../api";
  export default {
    data(){
      return{
        photo_classid:"",
        photo_list:[],
        photoID:0
      }
    },
    mounted() {
      this.photoID=this.$route.query.photoid;
      getClassPhoto({classid:this.photoID})
        .then(res=>{
          console.log("请求相册数据成功");
          console.log(res);
          this.photo_list=res.object;
        }).catch(error=>{
        console.log("请求相册数据失败");
      })
    },
  }
</script>

<style scoped>
  li {
    list-style: none;
    width: 330px;
    height: 300px;
    border: 1px solid #d4d4d4;
    padding: 15px 15px 0px 15px;
  }
  .fj_img{
    width: 230px;
    height: 197px;
  }
  .fj_img img{
    margin: 0px 30px;
  }
  .fj_title h4 {
    text-align: center;
    margin: 15px 0;
    font-weight: 600;
    opacity: 0.7;
  }
  .fj_date p {
    margin: 15px;
    font-size: 15px;
    text-align: right;
    opacity: 0.7;
  }
</style>
