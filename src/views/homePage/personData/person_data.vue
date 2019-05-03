<template>
  <div class="container">
    <!--注册页面-->
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
            <!-- 头像-->
            <el-form-item label="头像" prop="username">
              <span><img src="../../../assets/tx.jpg" height="50" width="50"/></span>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" class="el-button_dj" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
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
            <el-form-item  label="地址" prop="add">
              <el-input v-model.trim="ruleForm.add"></el-input>
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
  import {getUser} from "../../../api";
  export default {
    data(){
      return{
        loading:false,
        ruleForm: {
          username: "",
          userimg:"",
          imageUrl: '',
          nickname: "",
          sign:"",
          sex: "",
          age: "",
          Tel: "",
          email: "",
          birth: "",
          add: "",
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
          add: [
            { required: false, message: '请输入详细地址', trigger: 'blur' },
            { type: 'add', message: '请输入详细地址', trigger: ['blur', 'change'] }
          ],
          Tel: [
            { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
            {pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9|]|19[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'请输入正确的电话号码',trigger: 'blur'},
          ],
        }
      }
    },
    methods:{
      // 提交+重置 按钮
      submitForm(formName) {
        console.log(data);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 上传头像
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
          this.ruleForm.add=result.address;
        })
        .catch(error=>{
          console.log("请求个人信息失败");
        })
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
</style>
