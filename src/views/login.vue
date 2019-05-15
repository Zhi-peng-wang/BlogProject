<template>

  <div :style ="note" class="note">
    <div style="height: 1000px">
      <div class="denglu">
        <div class="head">
          <img height="80px" src="../assets/h.png" width="80px">
        </div>
        <div class="content">
          <br>
          <el-input clearable placeholder="请输入用户名" v-model="username"></el-input><br><br>
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input><br>

          <el-button @click="dologin" type="submit">登录</el-button><br>

          <div class="other">
            <!--<span id="qqLoginBtn" style="float: left;size: 13px"></span>-->
            <div>
              <router-link to="/register" style="float: right;margin:50px 10px 0 0;font-size: 14px;color:#888888">免费注册账号</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // QC.Login({
  //   btnId:"qqLoginBtn"
  // });
  import {login} from "../api";
  export default {
    data(){
      return{
        username:"admin123",
        password:"admin",
        note: {
          backgroundImage: "url(" + require("../assets/7.jpg") + ")",
          backgroundRepeat: "no-repeat",
        },
      }
    },
    methods:{
      dologin(){

        let data={'username':this.username,'password':this.password};
        login(data)
          .then(res=>{
            console.log(res);
            //sessionStorage
            // sessionStorage.setItem("loginUser", res.object.userid);
            // console.log("打印sessionStorage里面的userid:"+sessionStorage.getItem("loginUser"));
            // this.$store.state.loginUser=sessionStorage.getItem("loginUser");
            // console.log("打印vuex里面的userid:"+this.$store.state.loginUser);
            //localStorage
            localStorage.setItem("loginUser",res.object.userid);
            sessionStorage.setItem("token",res.object.token);
            console.log("打印sessionStorage里面的userid:"+localStorage.getItem("loginUser"));
            this.$store.state.loginUser=localStorage.getItem("loginUser");
            console.log("打印vuex里面的userid:"+this.$store.state.loginUser);

            const id=res.object.userid;
            if (res.status===200){
              this.$message({
                message: '登录成功!',
                type: 'success',
                showClose:true
              });
              this.$router.push(`/${id}/home`)
            }
          }).catch(error=>{
            this.$message({
              message: '登录失败，请检查用户名及密码!',
              type: 'error',
              showClose:true
            });
          console.log("error"+error);
        })
      }
    }
  }

</script>

<style scoped>
  .note{
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
  .content{
    margin-bottom: 800px;
    background:rgba(226,235,237,.5);
    border-radius: 5%;
    border:1px solid #cceff5;
    width: 320px;
    height: 290px;
    margin: 0 auto;
    padding: 15px;
  }
  .denglu{
    height: 500px;
    text-align:center;
    margin-top: 100px;
  }
  .head{
    margin:0 auto;
    margin-bottom: 20px;
    border: 1px solid #2aabd2;
    width:82px;
    height:82px;
    border-radius: 50%;
  }

  .other{
    width: 285px;
    height: 50px;
    /*background: yellow;*/

  }
  input{
    /*width: 220px;*/
    /*height: 35px;*/
    margin: 0px 8px;
    border: 1px solid #cceff5;
    border-radius: 5px;
    text-indent: 10px;
    margin: 10px auto;
    font-family: '黑体';
    font-size: 14px;
    background:rgba(226,235,237,.5);
  }
  button{
    font-size: 14px;
    background: linear-gradient(to top right, #e8f5f8,#a7e0ec, #5dd4ed);
    width: 285px;
    /*height: 35px;*/
    /*margin: 0px 8px;*/
    /*border-radius: 5px; !*圆角矩形*!*/
    /*text-indent: 10px; */
    margin: 20px auto;
    border: 1px solid #cceff5;
  }
</style>
