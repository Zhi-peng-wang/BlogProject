<template>
  <div class="revise">
    <div class="password">
      <div class="logo">修改密码</div>
      <!--修改密码表单-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="showEdit">
        <el-form-item label="请输入原密码" prop="inpass">
          <el-input type="password" v-model.trim="ruleForm.inpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="pass">
          <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="Button">
          <el-button type="danger" style="display:block;margin-left: 50px;float: left" @click="back">取消修改</el-button>
          <el-button type="primary" style="display:block;margin:0 auto;" @click="next">确认修改</el-button>
        </el-form-item>
      </el-form>
      <!--跳转到登陆页面-->
      <el-row class="enter" v-if="showLogin">
        <div class="img">
          <img src="../../../assets/denglu.jpg" height="355" width="450"/>
        </div>
        <div class="bottom clearfix">
          <el-button @click="xiugai">现在登陆</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        ruleForm: {
          inpass:"",
          pass: '',
          checkPass: '',
        },
        showEdit:true,
        showLogin:false,
        active: 0,
        rules: {
          inpass:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符，允许有特殊字符及下划线，禁止纯数字或纯英文', trigger: 'blur' },
            {pattern:/^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /`[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,message:'只允许字母+数字，数字不能在前',trigger: 'blur'},
          ],
          checkPass: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('登陆成功!');
          } else {
            console.log('登陆失败!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //切换页面
      next(){
        this.showEdit=false;
        this.showLogin=true
      },
      back(){
        // 取消修改，跳转到上一级
        this.$router.go(-1)
      },
      xiugai() {
        this.$message({
          message: '登陆成功',
          type: 'success'
        });
      },
    }
  }
</script>

<style scoped>
  .logo{
    font-size: 27px;
    margin-top: 30px;
    margin-bottom: 80px;
    text-align: center;
    opacity:0.7;
  }
  .revise{
    position: fixed;  /*绝对定位*/
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/xiugai.jpg");
    background-repeat: no-repeat;
    background-size: cover;   /*全覆盖*/
    background-position:center;
  }
  .demo-ruleForm{
    margin: 0 auto;
    width: 40%;
    height: 100%;
    opacity:0.8;
  }
  .img{
    text-align: center;
    opacity:0.4;
  }
  .Button{
    margin-top: 50px;
  }
  .bottom {
    margin-top: 30px;
    text-align: center;
    line-height: 12px;
  }
</style>
