<template>

  <div :style ="note" class="note">

    <div class="denglu">
      <div class="head">
        <img height="80px" src="../assets/h.png" width="80px">
      </div>

      <div class="content">
        <!--      <label>用户名:</label>-->
        <!--<input type="text" v-model="username" placeholder="请输入用户名">-->
        <br>
        <el-input placeholder="请输入用户名" v-model="username" clearable></el-input><br><br>
        <!--      <label>密码:</label>-->
        <!--<input type="password" v-model="password" placeholder="请输入密码"><br>-->
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input><br>

        <button @click="dologin" type="submit">登录</button><br>

        <router-link to="/register">注册账号</router-link>

      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {login} from "../api";
  export default {
    data(){
      return{
        username:"admin",
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
            const id=res.object.userid;
            // const id=res.object.userid;
            // console.log(id);
            if (true){
              this.$router.push(`/${id}/blog`)
            }
            // console.log(response);
          }).catch(error=>{
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
  }
  .denglu{
    height: 500px;
    text-align:center;
    margin-top: 200px;
  }
  .head{
    margin:0 auto;
    margin-bottom: 20px;
    border: 1px solid #2aabd2;
    width:82px;
    height:82px;
    border-radius: 50%;
  }
  .content{
    /*background-color:rgba(0,0,255,0.5);*/
    background:rgba(226,235,237,.1);
    border-radius: 5%;
    border:1px solid #cceff5;
    width: 320px;
    height: 200px;
    margin: 0 auto;
    padding: 15px;
  }
  input{
    width: 220px;
    height: 35px;
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
    width: 240px;
    height: 35px;
    margin: 0px 8px;
    border-radius: 5px; /*圆角矩形*/
    text-indent: 10px; /*里面隐形的字体首行缩进*/
    margin: 20px auto;
    border: 1px solid #cceff5;
  }
</style>
