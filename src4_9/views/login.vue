<template>
	<div class="container">
		登录页面
    <div>
      <label>用户名:</label>
      <input type="text" v-model="username"><br>
      <label>密码:</label>
      <input type="text" v-model="password"><br>
      <input type="submit" value="登录" @click="dologin">
    </div>
		<router-link to="/blog">登录成功</router-link>
	</div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        username:"admin",
        password:"admin"
      }
    },
    methods:{
      dologin(){
        let data={'username':this.username,'password':this.password};
        axios.post('/api/check',data)
          .then(response=>{
            const id=response.data.object.userid;
            // console.log(id);
            if (true){
              this.$router.push(`/${id}/blog`)
            }
            // console.log(response);
          }).catch(error=>{
          console.log(error);
        })
      }

    }

  }
</script>

<style>
</style>
