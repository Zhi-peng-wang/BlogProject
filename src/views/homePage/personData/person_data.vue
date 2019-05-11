<template>
  <div class="container">
    <!--头像-->
    <headPic></headPic>
    <!--个人信息-->
    <div>
      <div class="panel panel-info">
        <div class="panel-heading">个人资料</div>
        <div class="panel-body">
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm" v-loading="loading">
            <!-- 用户名-->
            <el-form-item label="用户名" prop="username">
              <el-input v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <!--昵称-->
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model.trim="ruleForm.nickname"></el-input>
            </el-form-item>
            <!--个签-->
            <el-form-item label="个签" prop="sign">
              <el-input v-model.trim="ruleForm.sign"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="男">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!--年龄-->
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number.trim="ruleForm.age"></el-input>
            </el-form-item>
            <!--电话-->
            <el-form-item label="电话" prop="Tel">
              <el-input v-model.trim="ruleForm.Tel"></el-input>
            </el-form-item>
            <!--邮箱-->
            <el-form-item  label="邮箱" prop="email">
              <el-input v-model.trim="ruleForm.email"></el-input>
            </el-form-item>
            <!--生日-->
            <el-form-item  label="生日" prop="birth">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <!--地址-->
            <el-form-item  label="地址" prop="address">
              <el-input v-model.trim="ruleForm.address"></el-input>
            </el-form-item>
            <!--提交-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addEdit, getUser} from "../../../api";
  import headPic from "./headPic"
  export default {
    components:{
      headPic
    },
    data(){
      return{
        loading:false,
        ruleForm: {
          username: "",
          userimg:"",
          nickname: "",
          sign:"",
          sex: "",
          age: "",
          Tel: 0,
          email: "",
          birth: "",
          address: "",
          imageUrl: "",
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符，允许有特殊字符及下划线，禁止纯数字或纯英文', trigger: 'blur' },
            {pattern:/^[a-z]*\d*[a-z]+\d+[a-z]*\d*$/i || /`[a-z]*\d*\d+[a-z]+[a-z]*\d*$/,message:'只允许字母+数字，数字不能在前',trigger: 'blur'},
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          age: [
            { required: false, message: '', trigger: 'blur' },
            {pattern:/^((1[0-5])|[1-9])?\d$/,message:'请正确输入年龄',trigger: 'blur'},
          ],
          sign: [
            { required: false, message: '', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符',trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '  ', trigger: 'blur' }
          ],
          address: [
            { required: false, message: '请输入详细地址', trigger: 'blur' },
          ],
          Tel: [
            { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
            {pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9|]|19[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'请输入正确的电话号码',trigger: 'blur'},
          ],
        }
      }
    },
    mounted(){
      const id = localStorage.getItem("loginUser");
      this.loading=true;
      getUser({userid:id})
        .then(res=>{
          console.log("请求个人信息");
          console.log(res.object);
          const result=res.object;
          this.loading=false;
          this.ruleForm.username=result.username;
          this.ruleForm.nickname=result.nickname;
          this.ruleForm.sign=result.sign;
          this.ruleForm.sex=result.sex;
          this.ruleForm.age=result.age;
          this.ruleForm.Tel=result.phone;
          this.ruleForm.email=result.email;
          this.ruleForm.brith=result.birthday;
          this.ruleForm.address=result.address;
        })
        .catch(error=>{
          console.log("请求个人信息失败");
        })
    },
    methods:{
      // 提交+重置 按钮
      submitForm(formName) {
        // console.log(data);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认上传', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then((action) => {
              if (action === 'confirm') {     //确认的回调
              //  确认的方法执行
              this.changeUerrInfo()
              }
            }).catch((err) => {
              if (err === 'cancel') {
                this.$message({
                  type: 'info',
                  message: '取消上传',
                  showClose:true
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeUerrInfo(){
        console.log("修改个人信息事件触发");
        let data={
          userid:this.$route.params.id,
          username:this.ruleForm.username,
          nickname:this.ruleForm.nickname,
          sign:this.ruleForm.sign,
          sex:this.ruleForm.sex,
          age:this.ruleForm.age,
          phone:this.ruleForm.Tel,
          email:this.ruleForm.email,
          birthday:this.ruleForm.brith,
          address:this.ruleForm.address,
        };
        addEdit(data)
          .then(res=>{
            console.log(res);
          })
          .catch(err=>{
            console.log(err);
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },

  }
</script>

<style scoped>

  .container{
    width:100%;
  }
  span img{
    margin-top: 10px;
    margin-right: 25px;
    float: left;
    background-color: #dff0d8;
  }
  .el-button_dj{
    margin-top: 15px;
  }
  .el-upload__tip{
    margin-top: 15px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
