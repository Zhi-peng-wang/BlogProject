<template>
  <div>
    <div class="container">
      <div class="liulan">
        <div class="row">
          <ul class="col-md-3" v-for="(t,index) in album" :key="index">
            <li>
              <router-link :to="{path:`/${$route.params.id}`+'/album/photo_list',query:{classid:t.classid}}">
                <div class="fj_img">
                  <div>
                    <img :src="t.url">
                  </div>
                </div>
                <div class="fj_title">
                  <h4>{{t.classname}}
                    (<el-badge :value="t.num" class="item" type="primary" style="margin-top: 8px">
                    </el-badge>张)
                  </h4>
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
  import {getPhotoClass} from "../../api";
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
            url:item.url,
            num:item.num
          }));
          this.album = albums;
          console.log(this.album);
        }).catch(error=>{
        console.log("请求photo相册数据失败");
      })
    },
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
