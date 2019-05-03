<template>
  <div :style="note" class="note">
    <div class="zhuce">
      <div class="logo">
        注册页面
      </div>
      <el-form :model="ruleForm2" status-icon :rules="rules2"
               ref="ruleForm2" label-width="100px"
               class="demo-ruleForm" style="margin-right: 60px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm2.name" placeholder="请输入您的用户名" autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入您的密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm2.sex" placeholder="请选择您的性别" style="width: 250px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网名" prop="nickname">
          <el-input v-model="ruleForm2.nickname" auto-complete="off" placeholder="请输入您的网名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')"
                     :disabled="ruleForm2.name.length===0||ruleForm2.pass.length===0||ruleForm2.checkPass.length===0||ruleForm2.sex.length===0||ruleForm2.nickname.length===0">
            注册
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          name: "",
          pass: "",
          checkPass: "",
          sex: "",
          nickname: "",
        },
        rules2: {
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'},
            {min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur'},
            {
              pattern: /^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /^[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,
              message: '密码不能为纯数字或纯英文',
              trigger: 'blur'
            },
          ],
          checkPass: [
            {validator: validatePass2, required: true, trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'},
            {pattern: /^[\w\s]+$/, message: '用户名不能为中文', trigger: 'blur'},
            {
              pattern: /^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /^[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,
              message: '密码不能为纯数字或纯英文且数字不能开头',
              trigger: 'blur'
            }
          ],
          nickname: [
            {required: true, message: '请输入您的网名', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在1到12个字符', trigger: 'blur'},
          ],
        },
        note: {
          backgroundImage: "url(" + require("../assets/time.jpeg") + ")",
          backgroundRepeat: "no-repeat",
        },
      }
    },

    methods: {
      submitForm(ruleForm2) {
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
            //注册信息有效
            let data = {
              username: this.ruleForm2.name,
              password: this.ruleForm2.pass,
              sex: "男",
              nickname: this.ruleForm2.nickname
            };
            console.log(data);
            console.log("下面执行注册接口");
            axios.post("/api/register", data)
              .then(res => {
                console.log(res.data);
                if (res.data.status===200){
                  this.$confirm('注册成功', '网页信息', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '继续注册',
                    type:"success",
                    center:true,
                  }).then(() => {
                    this.$message({
                      type: 'success',
                      message: '欢迎您的到来!'
                    });
                    // this.$router.go(-1)
                    //跳转到登录页要进行刷新
                    location.href = "/login"
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '继续注册'
                    });
                    //重置的方法
                    this.$refs[ruleForm2].resetFields();
                  });
                }
              }).catch(error => {
              console.log(error);
            });
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirmButtonText: '确定',
              type:"error",
              center:"true",
              callback: action => {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: `提示: ${ '所填内容不符合规范,请认真填写' }`
                });
              }
            });
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .zhuce {
    border-radius: 5px;
    position: fixed;
    width: 410px;
    height: 480px;
    margin: 120px 0 0 550px;
    background: rgba(226, 235, 237, .3);
  }

  button {
    font-size: 14px;
    background: #acb4b5;
    width: 220px;
    height: 35px;
    margin: 0px 0 0 0px;
    font-weight: bold;
    border-radius: 2px;
    text-indent: 10px;
    border: 1px solid #cceff5;
    color: white;
  }

  label {
    font-size: 15px;
    float: left;
    margin: 30px 0 0 0;
    border: 1px solid #cceff5;
    color: white;
    width: 40px;
    height: 30px;

  }

  .logo {

    color: white;
    font-size: 27px;
    margin: 30px 0 20px 160px;
  }

  .note {
    position: fixed;
    width: 100%;
    height: 100%;
  }
</style>
