<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="`/${$route.params.id}`+'/home_page/albumAll'">相册</el-breadcrumb-item>
          <el-breadcrumb-item>相册下图片</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--<h1>这是图片列表页面</h1>-->
      <div class="panel-body">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-button type="danger"  style="margin-left: 655px" @click="deletePhoto()" :disabled="checkedAlbums.length===0">
          删除
        </el-button>
        <div class="row">
          <el-checkbox-group v-model="checkedAlbums" @change="handlecheckedAlbumsChange">
            <div style="margin-left: 70px;">
              <el-checkbox  v-for="(p,index) in photo_list" :label="p" :key="index">
                <!--此处判断语句最好使用v-show 因为v-if在编辑器内报错 但是不影响结果-->
                <div class="col-md-3 big">
                  <div class="fj_img">
                    <img :src="p.thumbnail" width="150px" height="150px">
                  </div>
                  <div class="fj_date">
                    <p>{{p.photodate.slice(0,10)}}-{{p.photodate.slice(11,16)}}</p>
                  </div>
                  <div class="fj_title">
                    <h4>{{p.title}}</h4>
                  </div>
                </div>
              </el-checkbox>
            </div>

          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {deleteAllPhoto, getClassPhoto} from "../../../api";

  export default {
    inject: ['reload'],
    data() {
      return {
        photo_classid:"",
        photo_list:[],
        classId:0,
        checkAll: false,
        checkedAlbums: [],
        isIndeterminate: true,
      };
    },
    mounted() {
      this.classId=this.$route.query.classid;
      getClassPhoto({classid:this.classId})
        .then(res=>{
          console.log("请求相册数据成功");
          console.log(res);
          this.photo_list=res.object;
        }).catch(error=>{
        console.log("请求相册数据失败");
      })
    },
    methods:{
      //确认弹框删除图片
      deletePhoto(){
        this.$confirm('此操作将永久选中的图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            this.deletePhotoList();
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消删除',
              showClose:true
            });
          }
        });
      },
      //调用删除接口
      deletePhotoList(){
        console.log("删除图片的接口已经触发");
        console.log(this.checkedAlbums);
        const result =this.checkedAlbums.map(item=>({
          photoid:item.photoid
        }));
        console.log(result);
        deleteAllPhoto(result)
          .then(res=>{
            console.log(res);
            let res_status =res.status;
            if(res_status===200){
              //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
              this.reload();
              this.$message({
                type: 'success',
                message: '删除成功!',
                showClose:true
              });
            }else {
              console.log("删除失败");
            }
          })
          .catch(err=>{
            console.log(err);
          })
      },
      go(){
        this.$router.go(-1)
      },
      handleCheckAllChange(val) {
        this.checkedAlbums = val ? this.photo_list : [];
        this.isIndeterminate = false;
      },
      handlecheckedAlbumsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.photo_list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.photo_list.length;
      },
    }
  }
</script>

<style scoped>
  .big{
    width: 180px;
    list-style: none;
    border: 1px solid #d4d4d4;
    /*padding: 15px 15px 0px 15px;*/
  }
  .fj_img img{
    margin: 0 auto;
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
