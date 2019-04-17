<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        个人信息
      </div>
      <div class="panel-body">
        <div :span="24">
          <el-form label-width="100px">
            <el-form-item label="昵称">
              <el-input v-model="from_data.nickname"></el-input>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="from_data.sign"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="from_data.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="from_data.age"></el-input>
            </el-form-item>
            <el-form-item label="Tel">
              <el-input v-model="from_data.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="from_data.email"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input v-model="from_data.brith"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="from_data.address"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submit_person_data">提交</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUser, register} from "../../../api";
  export default {
    data(){
      return{
        from_data:{
          userid:10000,
          nickname: '',
          sign: '',
          sex:'',
          age: '',
          tel:'',
          email:'',
          brith:'',
          address:''
        }
      }
    },
    mounted(){
      const id = this.$route.params.id;
      getUser({userid:id})
        .then(res=>{
          console.log("请求个人信息");
          console.log(res.object);
          const result=res.object;
          this.from_data.nickname=result.nickname;
          this.from_data.sign=result.sign;
          this.from_data.sex=result.sex;
          this.from_data.age=result.age;
          this.from_data.tel=result.phone;
          this.from_data.email=result.email;
          this.from_data.brith=result.brithday;
          this.from_data.address=result.address
        })
        .catch(error=>{
          console.log("请求个人信息失败");
        })
    },
    methods:{
      submit_person_data(){
        console.log("点击事件被触发");
        register(this.from_data)
          .then(res=>{
            console.log("发送成功");
            console.log(res);
          })
          .catch(error=>{
            console.log("发送失败");
          })
      }
    }
  }
</script>

<style scoped>
</style>
