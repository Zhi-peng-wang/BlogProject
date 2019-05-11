<template>
  <div class="revise">
    <div class="password">
      <div class="logo">修改密码</div>
      <!--修改密码表单-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
          <el-button style="display:block;margin-left: 50px;float: left" @click="next">确认</el-button>
          <el-button style="display:block;margin:0 auto;" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {editPassword} from "../../../api";

  export default {
    data() {
      // 密码验证
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

      return {
        ruleForm: {
          inpass: '',
          pass: '',
          checkPass: '',
          timer: null
        },
        rules: {
          inpass: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'},
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符，允许有特殊字符及下划线，禁止纯数字或纯英文', trigger: 'blur'},
            {
              pattern: /^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /`[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,
              message: '只允许字母+数字，数字不能在前',
              trigger: 'blur'
            },
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'},
            {required: true, message: '请再次输入密码', trigger: 'blur'},
          ]
        },
      };
    },
    destroyed: function () {
      // 每次离开当前界面时，清除定时器
      clearInterval(this.timer);
      this.timer = null
    },
    methods: {
      setTimer() {
        const loading = this.$loading({
          lock: true,
          text: '恭喜您密码修改成功，三秒之后自动跳转登录页！',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 3000);
        if(this.timer == null) {
          this.timer = setInterval( () => {
            console.log('开始定时...3秒之后跳转页面');
            this.$router.push('/login')
          }, 3000)
        }
      },

      //修改密码
      next(ruleForm) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (valid) {
              this.$confirm('确认修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                //此处执行修改密码函数
                this.editPassword();
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.setTimer()
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '修改失败'
                });
              });
            }
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirmButtonText: '确定',
              type: "error",
              center: "true",
              callback: action => {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: `提示: ${'所填内容不符合规范,请认真填写'}`
                });
              }
            });
            return false;
          }
        });
      },
      // 取消修改，跳转到上一级
      back() {
        this.$router.go(-1)
      },
      editPassword() {
        let data = {
          userid: localStorage.getItem('loginUser'),
          oldpassword: this.ruleForm.inpass,
          password: this.ruleForm.pass,
          resetpassword: this.ruleForm.checkPass
        };
        editPassword(data)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
  }
</script>

<style scoped>
  .logo {
    font-size: 27px;
    margin-top: 30px;
    margin-bottom: 80px;
    text-align: center;
    opacity: 0.7;
  }

  .revise {
    position: fixed; /*绝对定位*/
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/xiugai.jpg");
    background-repeat: no-repeat;
    background-size: cover; /*全覆盖*/
    background-position: center;
  }

  .demo-ruleForm {
    margin: 0 auto;
    width: 40%;
    height: 100%;
    opacity: 0.6;
  }

  .Button {
    margin-top: 50px;
  }
</style>
