<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        相册列表
      </div>
      <!--<h1>这是图片列表页面</h1>-->
      <div class="panel-body">
        <div class="row">
          <ul class="col-md-3" v-for="(t,index) in album" :key="index" v-loading="loading">
            <li>
              <div @click="confirmDeletePhotoClass(t.classid)" style="cursor: pointer">
                <img src="../../../assets/delete.png" alt="down" class="down" >
              </div>
              <router-link :to="{path:`/${$route.params.id}`+'/home_page/albumList',query:{classid:t.classid}}">
                <div class="fj_img">
                  <div style="width: 150px;height: 100px;background: skyblue">
                    <!--<img :src="t.url" height="100px">-->
                  </div>
                </div>
                <div class="fj_title">
                  <h4>{{t.classname}}
                    ({{t.num}}张)
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
  import {deleteClass, getPhotoClass} from "../../../api";
    export default {
      inject: ['reload'],
      data() {
        return {
          activeIndex: "2",
          album: [],
          loading:false,
        };
      },
      mounted() {
        let id = this.$route.params.id;
        this.loading=true;
        getPhotoClass({userid:id})
          .then(res=>{
            console.log("请求photo相册数据成功");
            console.log(res);
            const result = res.object;
            this.loading=false;
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
      methods:{
        confirmDeletePhotoClass(id){
          this.$confirm('确认删除该分类吗？分类下有图片不可删除！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then((action) => {
            if (action === 'confirm') {     //确认的回调
              this.deletePhotoClass(id)
            }
          }).catch((err) => {
            if (err === 'cancel') {
              this.$message({
                type: 'info',
                message: '取消删除',
                showClose:true
              });
            }
          });
        },
        deletePhotoClass(id){
          console.log("删除分类的点击事件已触发");
          deleteClass({classid:id})
            .then(res=>{
              console.log("删除相册的分类的接口已经启动");
              console.log(res);
              if (res.status==200){
                this.$message({
                  showClose: true,
                  message: '删除成功！',
                  type: 'success'
                });
                this.reload();
              }
              if (res.status==400){
                this.$message({
                  showClose: true,
                  message: '分类下存在图片，请先删除图片！',
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            });
        }
      }
    }
</script>

<style scoped>
  .down{
    width: 20px;
    height: 20px;
    opacity: 0.7;
    float: right;
    margin: -8px 0px 0 0;
  }
  li {
    list-style: none;
    border: 1px solid #d4d4d4;
    padding-top: 10px;
  }
  .fj_img div{
    margin: 0 auto;
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
</style>
