<template>
  <div>
    <div class="container">
      <div class="liulan">
        <div class="row">
          <ul class="col-md-3" v-for="(t,index) in album" :key="index">
            <li>
              <router-link :to="`/${$route.params.id}`+'/album/photo_list'"  @click.native="send_classid(t.classid)">
                <div class="fj_img">
                  <div>
                    <img :src="t.url">
                  </div>
                </div>
                <div class="fj_title">
                  <h4>{{t.classname}}</h4>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPhotoClass,getClassPhoto} from "../../api";
  import event from "../../event.js"
  export default {
    data() {
      return {
        activeIndex: "2",
        album: []
      };
    },
    mounted() {
      let id = this.$route.params.id;
      getPhotoClass({userid:id})
        .then(res=>{
          console.log("请求photo相册数据成功");
          console.log(res);
          const result = res.object;
          const albums = result.map(item => ({
            classid:item.classid,
            classname:item.classname,
            url:item.url
          }));
          this.album = albums;
          console.log(this.album);
        }).catch(error=>{
        console.log("请求photo相册数据失败");
      })
    },
    methods:{
      send_classid(classid){
        console.log("事件被触发classid："+classid);
        // let class_id=this.$route.params.classid;
        // this.$router.push(`/${$route.params.id}/album/photo_list/${classid}`);
        event.$emit("photo_list",classid)
      }
    }
  };
</script>

<style scoped>
  li {
    list-style: none;
    border: 1px solid #d4d4d4;
    padding: 15px 15px 0px 15px;
  }
  .fj_img div{
    text-align: center;
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
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
