<template>
  <div class="container">
    注册页面
    <div>
      <label>用户名:</label>
      <input type="text" v-model="username"><br>
      <label>第一次密码:</label>
      <input type="text" v-model="password"><br>
      <label>第二次密码:</label>
      <input type="text" v-model="Tpassword"><br>
      <label>性别：</label>
      <input type="text" v-model="sex"><br>
      <label>网名:</label>
      <input type="text" v-model="nickname"><br>
      <input type="submit" value="注册" @click="doRegister">
    </div>
  </div>
</template>

<script>
  import axios from "axios"
    export default {
      data(){
        return{
          username:"",
          password:"",
          Tpassword:"",
          sex:"",
          nickname:""
        }
      },
      methods:{
        doRegister(){
          let data = {
            username: this.username,
            password: this.password,
            Tpassword: this.Tpassword,
            sex:this.sex,
            nickname: this.nickname
          };
          axios.post("/api/register",data)
            .then(res=>{
              console.log(res.data);
            }).catch(error=>{
            console.log(error);
          });
          console.log("点击注册按钮");
        }
      }
    }
</script>

<style scoped>

</style>
