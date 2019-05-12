<template>
  <div>
    <div class="container">
      <!--导航-->
      <navBar></navBar>
      <!--<h1>这是留言页面</h1>-->
      <div class="row">
        <el-card shadow="always">
          <p style="text-align: center;margin: 0;font-size: 26px;font-family: 幼圆;font-weight: 900">
            欢迎你来到我的空间！
          </p>
        </el-card>
      </div>


      <!--留言输入框-->
      <div class="el-row">
        <label style="margin-top: 15px">发表您的留言：</label>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="发表您的留言"
          v-model="leaveMsg"
          style="margin-top: 15px">
        </el-input>
        <el-button type="primary" size="mini"
                   @click="confirmAddMsg()"
                   style="margin-top: 15px;float: right">
          发表留言
        </el-button>
      </div>

      <!--留言展示区域-->
      <div style="height: 30px"></div>
      <div class="row" style="margin: 30px 0px">
        <el-card shadow="hover">
          <p style="text-align: center;margin: 0;font-size: 26px;font-family: 幼圆;font-weight: 900">
            欢迎你来到我的空间！
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from "../nav/navBar.vue"
  import {addBbs, getBbs} from "../../api";
  export default {
    components:{
      navBar
    },
    data(){
      return{
        leaveMsg:"",
      }
    },
    created(){
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "4");
    },
    mounted() {
      this.getBbsMethods()
    },
    methods:{
      //得到留言及回复留言的相关内容
      getBbsMethods(){
        let data={
          touserid: this.$route.params.id
        };
        getBbs(data)
          .then(res=>{
            console.log("留言的相关内容");
            console.log(res);
          })
          .catch(err=>{
            console.log(err);
          })
      },
      //确认的弹框
      confirmAddMsg(){
        console.log("留言的按钮被点击");
        this.$confirm('确认发表该留言吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            //添加留言的方法
            this.addBbs();
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消',
              showClose: true
            });
          }
        });
      },
      //添加留言的接口
      addBbs(){
        console.log("接口的方法");
        let data={
          userid:localStorage.getItem("loginUser"),
          bbscontent:this.leaveMsg,
          touserid:this.$route.params.id,
          parentid:0,
          typeid:0,
          status:0
        };
        addBbs(data)
          .then(res=>{
            console.log(res);
            if(res.status===200){
              this.$message({
                type: 'success',
                message: '留言成功!',
                showClose: true
              });
            }else {
              this.$message({
                type: 'error',
                message: '服务器正忙，请稍后再试',
                showClose: true
              });
            }
          })
          .catch(err=>{
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>

</style>
