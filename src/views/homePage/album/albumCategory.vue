<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        相册类别
      </div>

      <div class="row">
        <div class="panel-body">
          <div class="col-lg-12 col-sm-12">
            <div class="card bg-light text-dark">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6 col-sm-12">
                    <label>一级栏目：</label>
                    <select multiple class="form-control"
                            style="height: 120px">
                      <option v-for="(b1,index) in album_url_1" :key="index"
                              @click="sendClass1Id([b1.classid,b1.orderclass,b1.classname,b1])"
                      >
                        {{index+1}}:{{b1.classname}}
                      </option>
                    </select>
                    <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1"
                             label-width="100px" class="demo-ruleForm">
                      <el-form-item label="栏目排序" prop="order1">
                        <el-input type="text" v-model.trim="ruleForm1.order1" autofocus="autofocus"></el-input>
                      </el-form-item>
                      <el-form-item label="栏目名称" prop="class1Name">
                        <el-input type="text" v-model.trim="ruleForm1.class1Name"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="class1('ruleForm1')"
                                   style="margin-left: -70px">
                          添加
                        </el-button>
                        <el-button type="warning" @click="edit1('ruleForm1')">
                          编辑
                        </el-button>
                        <el-button type="danger" @click="delete1('ruleForm1')">
                          删除
                        </el-button>
                        <el-button type="danger" @click="reset1()">
                          重置
                        </el-button>
                      </el-form-item>
                    </el-form>
                  </div>

                  <!--二级栏目-->
                  <div class="col-lg-6 col-sm-12">
                    <label>二级栏目：</label>
                    <select multiple class="form-control" style="height: 120px">
                      <option v-for="(b2,index) in album_url_2_2" :key="index"
                              @click="sendClass2Id([b2.classid,b2.orderclass,b2.classname])">
                        {{index+1}}:{{b2.classname}}
                      </option>
                    </select>
                    <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="栏目排序" prop="order2">
                        <el-input v-model.trim="ruleForm2.order2"></el-input>
                      </el-form-item>
                      <el-form-item label="栏目名称" prop="class2Name">
                        <el-input v-model.trim="ruleForm2.class2Name"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="class2('ruleForm2')"
                                   style="margin-left: -70px">
                          添加
                        </el-button>
                        <el-button type="warning" @click="edit2('ruleForm2')">
                          编辑
                        </el-button>
                        <el-button type="danger" @click="delete2('ruleForm2')">
                          删除
                        </el-button>
                        <el-button type="danger" @click="reset2()">
                          重置
                        </el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addClass, deleteClass, editClass, getClass} from "../../../api";
  export default {
    inject: ['reload'],
    data() {
      return {
        selectedOption:{},
        album_url_1: [],
        album_url_2: [],
        album_url_2_2: [],
        blogClass1Id:"",
        blogClass2Id:"",
        ruleForm1: {
          order1:"",
          class1Name:"",
        },
        ruleForm2: {
          order2:"",
          class2Name:"",
        },
        rules:{
          order1:[
            { required: true, message: '必填项', trigger: 'blur' },
            {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
          ],
          class1Name:[
            { required: true, message: '必填项', trigger: 'blur' },
            { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
          ],
          order2:[
            { required: true, message: '必填项', trigger: 'blur' },
            {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
          ],
          class2Name:[
            { required: true, message: '必填项', trigger: 'blur' },
            { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
          ]
        }
      };
    },
    mounted() {
      // 一级栏目显示
      this.ruleForm1.order1=sessionStorage.getItem("sorder1");
      this.ruleForm1.class1Name=sessionStorage.getItem("s1className");
      this.blogClass1Id=sessionStorage.getItem("s1classId");
// 二级栏目显示
      this.ruleForm2.order2=sessionStorage.getItem("sorder2");
      this.ruleForm2.class2Name=sessionStorage.getItem("s2className");
      this.blogClass2Id=sessionStorage.getItem("s2classId");
      //拿到分类
      getClass({userid: localStorage.getItem("loginUser"), typeid: 2})
        .then(res => {
          console.log(res);
          const result = res.object;
          //一级标题的相关内容
          result.map(item => {
            if (item.depth == 1) {
              return this.album_url_1.push(item)
            }
          });
          console.log(this.album_url_1);
          // 二级标题的相关内容
          result.map(item => {
            if (item.depth === 2) {
              return this.album_url_2.push(item)
            }
          });
          console.log(this.album_url_2);
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods:{
      // 一级栏目添加弹框
      class1(ruleForm1){
        this.$refs[ruleForm1].validate((valid) => {
          if (valid) {
            this.$confirm('确认添加?', '提示', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.addClass1();
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消添加'
                });
              }
            });
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirm2uttonText: '确定',
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
      // 一级栏目添加点击事件
      addClass1(){
        console.log("一级栏目的点击事件");
        let data={
          userid: localStorage.getItem("loginUser"),
          classname:this.ruleForm1.class1Name,
          parentid:"1",
          orderclass:this.ruleForm1.order1,
          depth:"1",
          url:this.ruleForm1.class1Name,
          typeid:"2"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorder1", this.ruleForm1.order1);
              sessionStorage.setItem("s1className", this.ruleForm1.class1Name);
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              });
              this.reload();
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '一级分类名称已存在，请重新添加！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      // 二级栏目添加弹框
      class2(ruleForm2) {
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
            this.$confirm('确认添加?', '提示', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.addClass2();
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消添加'
                });
              }
            });
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirm2uttonText: '确定',
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
      // 二级栏目添加点击事件
      addClass2(){
        console.log("二级栏目的点击事件");
        let data={
          userid: localStorage.getItem("loginUser"),
          classname:this.ruleForm2.class2Name,
          parentid:this.blogClass1Id,
          orderclass:this.ruleForm2.order2,
          depth:"2",
          url:this.ruleForm2.class2Name,
          typeid:"2"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            console.log(res);
            if (res.status===200){
              sessionStorage.setItem("sorder2", this.ruleForm2.order2);
              sessionStorage.setItem("s2className", this.ruleForm2.class2Name);
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              });
              this.reload();
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '二级分类名称已存在，请重新添加！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      sendClass1Id([classid,order1,className,obj]){
        console.log("一级分类被点击"+classid);
        console.log(obj);
        this.selectedOption=obj;
        this.ruleForm2.order2="";
        this.ruleForm2.class2Name="";
        //使用session存储
        sessionStorage.setItem("sorder1", order1);
        this.ruleForm1.order1=sessionStorage.getItem("sorder1");

        sessionStorage.setItem("s1className", className);
        this.ruleForm1.class1Name=sessionStorage.getItem("s1className");

        sessionStorage.setItem("s1classId", classid);
        this.blogClass1Id=sessionStorage.getItem("s1classId");

        sessionStorage.setItem("s1obj", obj);
        this.selectedOption=sessionStorage.getItem("s1obj");
        // sessionStorage.setItem("sorder2", "");
        // sessionStorage.setItem("s2className", "");
        // sessionStorage.setItem("s2classId", "");
        this.album_url_2_2=[];
        this.album_url_2.find(item=>{
          for (let i=0;i<this.album_url_2.length;i++){
            if(classid===item.parentid){
              if (!~this.album_url_2_2.indexOf(item)) {
                this.album_url_2_2.push(item)
              }
            }
          }
        });
        console.log(this.blog_url_2_2);
        // this.reload()
      },
      sendClass2Id([classid,order2,className]){
        console.log("二级分类被点击"+classid);
        this.blogClass2Id=classid;
        this.ruleForm2.order2=order2;
        this.ruleForm2.class2Name=className;

        //使用session存储
        sessionStorage.setItem("sorder2", order2);
        this.ruleForm2.order2=sessionStorage.getItem("sorder2");
        sessionStorage.setItem("s2className", className);
        this.ruleForm2.class2Name=sessionStorage.getItem("s2className");
        sessionStorage.setItem("s2classId", classid);
        this.blogClass2Id=sessionStorage.getItem("s2classId");
      },
      // 一级栏目删除弹框
      delete1(ruleForm1){
        this.$refs[ruleForm1].validate((valid) => {
          if (valid) {
            this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.deleteClass1();
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  type: 'info',
                  message: '取消删除',
                  showClose: true,
                });
              }
            });
          } else {
            this.$alert('并未选择将要删除的数据', '网页消息', {
              confirm2uttonText: '确定',
              type:"error",
              center:"true",
              callback: action => {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: `提示: ${ '并未选择将要删除的数据' }`
                });
              }
            });
            return false;
          }
        });

      },
      // 一级栏目删除点击事件
      deleteClass1(){
        deleteClass({classid:this.blogClass1Id})
          .then(res=>{
            console.log("一级分类删除按钮被点击");
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorder1", "");
              sessionStorage.setItem("s1className", "");
              sessionStorage.setItem("s1classId", "");
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
              this.reload();
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '存在二级分类无法删除,请先删除二级分类！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      // 二级栏目删除弹框
      delete2(ruleForm2){
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
            this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.deleteClass2();
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  type: 'info',
                  message: '取消删除',
                  showClose: true,
                });
              }
            });
          } else {
            this.$alert('并未选择将要删除的数据', '网页消息', {
              confirm2uttonText: '确定',
              type:"error",
              center:"true",
              callback: action => {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: `提示: ${ '并未选择将要删除的数据' }`
                });
              }
            });
            return false;
          }
        });
      },
      // 二级栏目删除点击事件
      deleteClass2(){
        console.log("二级分类删除按钮被点击");
        deleteClass({classid:this.blogClass2Id})
          .then(res=>{
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorder2", "");
              sessionStorage.setItem("s2className", "");
              sessionStorage.setItem("s2classId", "");
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
              this.reload();
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '二级分类下有日志,请先删除日志！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      // 一级栏目编辑弹框
      edit1(ruleForm1){
        this.$refs[ruleForm1].validate((valid) => {
          if (valid) {
            this.$confirm('确认编辑?', '提示', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.editClass1()
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消编辑'
                });
              }
            });
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirm2uttonText: '确定',
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
      // 一级栏目编辑点击事件
      editClass1(){
        let data={
          classid:this.blogClass1Id,
          orderclass:this.ruleForm1.order1,
          classname:this.ruleForm1.class1Name,
          oldclassname:sessionStorage.getItem("s1className"),
          userid:this.$route.paramsid
        };
        editClass(data)
          .then(res=>{
            console.log(res);
            if (res.status==200){
              this.$message({
                showClose: true,
                message: '编辑成功！',
                type: 'success'
              });
              sessionStorage.setItem("sorder1", this.ruleForm1.order1);
              this.ruleForm1.order1=sessionStorage.getItem("sorder1");

              sessionStorage.setItem("s1className",this.ruleForm1.class1Name);
              this.ruleForm1.class1Name=sessionStorage.getItem("s1className");

              sessionStorage.setItem("s1classId", this.blogClass1Id);
              this.blogClass1Id=sessionStorage.getItem("s1classId");

              sessionStorage.setItem("s1obj", this.selectedOption);
              this.selectedOption=sessionStorage.getItem("s1obj");
              this.reload()
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '一级分类名称已存在！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });

      },
      // 二级栏目添加弹框
      edit2(ruleForm2){
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
            this.$confirm('确认编辑?', '提示', {
              confirm2uttonText: '确定',
              cancel2uttonText: '取消',
              type: 'warning',
              center:true
            }).then((action) => {
              if (action==='confirm'){    //成功的回调
                this.editClass2()
              }
            }).catch((err) => {
              if (err==='cancel'){       //失败的回调
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消编辑'
                });
              }
            });
          } else {
            this.$alert('所填内容不符合规范', '网页消息', {
              confirm2uttonText: '确定',
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
      // 二级栏目编辑点击事件
      editClass2(){
        let data={
          classid:this.blogClass2Id,
          orderclass:this.ruleForm2.order2,
          classname:this.ruleForm2.class2Name
        };
        editClass(data)
          .then(res=>{
            console.log(res);
            if (res.status==200){
              this.$message({
                showClose: true,
                message: '编辑成功！',
                type: 'success'
              });
              sessionStorage.setItem("sorder2", this.ruleForm2.order2);
              this.ruleForm2.order2=sessionStorage.getItem("sorder2");

              sessionStorage.setItem("s2className",this.ruleForm2.class2Name);
              this.ruleForm2.class2Name=sessionStorage.getItem("s2className");

              sessionStorage.setItem("s2classId", this.blogClass2Id);
              this.blogClass2Id=sessionStorage.getItem("s2classId");

              sessionStorage.setItem("s2obj", this.selectedOption);
              this.selectedOption=sessionStorage.getItem("s2obj");
              this.reload()
            }
            if (res.status==400){
              this.$message({
                showClose: true,
                message: '二级分类名称已存在！',
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      reset1(){
        this.ruleForm1.order1="";
        this.ruleForm1.class1Name=""
      },
      reset2(){
        this.ruleForm2.order2="";
        this.ruleForm2.class2Name=""
      },
    }
  }
</script>

<style scoped>
  .demo-ruleForm{
    margin-top: 25px;
    margin-left: -20px;
  }
</style>
