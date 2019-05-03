<template>
  <div>
    <div class="panel panel-info" style="height: 800px">
      <div class="panel-heading">
        日志类别
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
                      <option v-for="(b1,index) in blog_url_1" :key="index"
                              @click="sendClassAId([b1.classid,b1.orderclass,b1.classname,b1])"
                              :id="b1.classid" :value="b1.classname"  :label="index+1+':'+b1.classname">
                        <!--{{index+1}}:{{b1.classname}}-->
                      </option>
                    </select>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="栏目排序" prop="orderA">
                        <el-input v-model="ruleForm.orderA"></el-input>
                      </el-form-item>
                      <el-form-item label="栏目名称" prop="classAName">
                        <el-input v-model="ruleForm.classAName"></el-input>
                      </el-form-item>
                    </el-form>
                    <el-button type="primary" class="btn btn-info pl-3 pr-3"
                                @click="classA()"
                               :disabled="ruleForm.orderA.length===0||ruleForm.orderA.length>2||ruleForm.classAName.length===0||ruleForm.classAName.length>10">
                      添加
                    </el-button>
                    <el-button type="warning" class="btn btn-primary pl-3 pr-3"
                            @click="editA()"
                               :disabled="ruleForm.orderA.length===0||ruleForm.orderA.length>2||ruleForm.classAName.length===0||ruleForm.classAName.length>10">
                      编辑
                    </el-button>
                    <el-button type="danger" class="btn btn-danger pl-3 pr-3"
                            @click="deleteA()"
                               :disabled="ruleForm.orderA.length===0||ruleForm.orderA.length>2||ruleForm.classAName.length===0||ruleForm.classAName.length>10">
                      删除
                    </el-button>
                    <el-button type="danger" class="btn btn-danger pl-3 pr-3"
                               @click="resetA()"
                               :disabled="ruleForm.orderA.length===0||ruleForm.orderA.length>2||ruleForm.classAName.length===0||ruleForm.classAName.length>10">
                      重置
                    </el-button>
                  </div>
                  <!--二级栏目-->
                  <div class="col-lg-6 col-sm-12">
                    <label>二级栏目：</label>
                    <select multiple class="form-control" style="height: 120px">
                      <option v-for="(b2,index) in blog_url_2_2" :key="index"
                              @click="sendClassBId([b2.classid,b2.orderclass,b2.classname])">
                        {{index+1}}:{{b2.classname}}
                      </option>
                    </select>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="栏目排序" prop="orderB">
                        <el-input v-model="ruleForm.orderB"></el-input>
                      </el-form-item>
                      <el-form-item label="栏目名称" prop="classBName">
                        <el-input v-model="ruleForm.classBName"></el-input>
                      </el-form-item>
                    </el-form>
                    <el-button type="primary" class="btn btn-info pl-3 pr-3"
                                @click="classB()"
                               :disabled="ruleForm.orderB.length===0||ruleForm.orderB.length>2||ruleForm.classBName.length===0||ruleForm.classBName.length>10">
                      添加
                    </el-button>
                    <el-button type="warning" class="btn btn-primary pl-3 pr-3"
                            @click="editB()"
                               :disabled="ruleForm.orderB.length===0||ruleForm.orderB.length>2||ruleForm.classBName.length===0||ruleForm.classBName.length>10">
                      编辑
                    </el-button>
                    <el-button type="danger" class="btn btn-danger pl-3 pr-3"
                            @click="deleteB()"
                               :disabled="ruleForm.orderB.length===0||ruleForm.orderB.length>2||ruleForm.classBName.length===0||ruleForm.classBName.length>10">
                      删除
                    </el-button>
                    <el-button type="danger" class="btn btn-danger pl-3 pr-3"
                               @click="resetB()"
                               :disabled="ruleForm.orderB.length===0||ruleForm.orderB.length>2||ruleForm.classBName.length===0||ruleForm.classBName.length>10">
                      重置
                    </el-button>
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
        blog_url_1:[],
        blog_url_2:[],
        blog_url_2_2:[],
        blogClassAId:"",
        blogClassBId:"",
        ruleForm: {
          orderA:"",
          classAName:"",
          orderB:"",
          classBName:"",
        },
        rules:{
          classAName:[
            { required: true, message: '  ', trigger: 'blur' },
            { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
          ],
          orderA:[
            { required: true, message: '  ', trigger: 'blur' },
            {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
          ],
          classBName:[
            { required: true, message: '  ', trigger: 'blur' },
            { min: 1, max: 10, message: '1-10个字符', trigger: 'blur' },
          ],
          orderB:[
            { required: true, message: '  ', trigger: 'blur' },
            {pattern:/^(([1-9]\d?)|100)$/,message:'数字1-99',trigger: 'blur'},
          ],
        }
      };
    },
    mounted() {
      this.ruleForm.orderA=sessionStorage.getItem("sorderA");
      this.ruleForm.classAName=sessionStorage.getItem("sAclassName");
      this.blogClassAId=sessionStorage.getItem("sAclassId");

      this.ruleForm.orderB=sessionStorage.getItem("sorderB");
      this.ruleForm.classBName=sessionStorage.getItem("sBclassName");
      this.blogClassBId=sessionStorage.getItem("sBclassId");
      //拿到分类
      getClass({userid:this.$route.params.id,typeid:1})
        .then(res=>{
          console.log(res);
          const result = res.object;
          //一级标题的相关内容
          result.map(item => {
            if (item.depth == 1) {
              return this.blog_url_1.push(item)
            }
          });
          console.log(this.blog_url_1);
          // 二级标题的相关内容
          result.map(item => {
            if (item.depth === 2) {
              return this.blog_url_2.push(item)
            }
          });
          console.log(this.blog_url_2);
        })
        .catch(err=>{
          console.log(err);
        });
    },
    methods:{
      // 一级栏目添加弹框
      classA(){
        this.$confirm('确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.addClassA();
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
      },
      // 一级栏目添加点击事件
      addClassA(){
        console.log("一级栏目的点击事件");
        let data={
          userid: this.$route.params.id,
          classname:this.ruleForm.classAName,
          parentid:"1",
          orderclass:this.ruleForm.orderA,
          depth:"1",
          url:this.ruleForm.classAName,
          typeid:"1"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorderA", this.ruleForm.orderA);
              sessionStorage.setItem("sAclassName", this.ruleForm.classAName);
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
      classB(){
        this.$confirm('确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.addClassB();
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
      },
      // 二级栏目添加点击事件
      addClassB(){
        console.log("二级栏目的点击事件");
        let data={
          userid: this.$route.params.id,
          classname:this.ruleForm.classBName,
          parentid:this.blogClassAId,
          orderclass:this.ruleForm.orderB,
          depth:"2",
          url:this.ruleForm.classBName,
          typeid:"1"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorderB", this.ruleForm.orderB);
              sessionStorage.setItem("sBclassName", this.ruleForm.classBName);
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
      sendClassAId([classid,orderA,className,obj]){
        console.log("一级分类被点击"+classid);
        console.log(obj);
        this.selectedOption=obj;
        this.ruleForm.orderB="";
        this.ruleForm.classBName="";
        //使用session存储
        sessionStorage.setItem("sorderA", orderA);
        this.ruleForm.orderA=sessionStorage.getItem("sorderA");

        sessionStorage.setItem("sAclassName", className);
        this.ruleForm.classAName=sessionStorage.getItem("sAclassName");

        sessionStorage.setItem("sAclassId", classid);
        this.blogClassAId=sessionStorage.getItem("sAclassId");

        sessionStorage.setItem("sAobj", obj);
        this.selectedOption=sessionStorage.getItem("sAobj");
        sessionStorage.setItem("sorderB", "");
        sessionStorage.setItem("sBclassName", "");
        sessionStorage.setItem("sBclassId", "");
        this.blog_url_2_2=[];
        this.blog_url_2.find(item=>{
          for (let i=0;i<this.blog_url_2.length;i++){
            if(classid===item.parentid){
              if (!~this.blog_url_2_2.indexOf(item)) {
                this.blog_url_2_2.push(item)
              }
            }
          }
        });
        console.log(this.blog_url_2_2);
        // this.reload()
      },
      sendClassBId([classid,orderB,className]){
        console.log("二级分类被点击"+classid);
        this.blogClassBId=classid;
        this.ruleForm.orderB=orderB;
        this.ruleForm.classBName=className;

        //使用session存储
        sessionStorage.setItem("sorderB", orderB);
        this.ruleForm.orderB=sessionStorage.getItem("sorderB");

        sessionStorage.setItem("sBclassName", className);
        this.ruleForm.classBName=sessionStorage.getItem("sBclassName");

        sessionStorage.setItem("sBclassId", classid);
        this.blogClassBId=sessionStorage.getItem("sBclassId");

        // sessionStorage.setItem("sBobj", obj);
        // this.selectedOption=sessionStorage.getItem("sBobj");
      },
      // 一级栏目删除弹框
      deleteA(){
        this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.deleteClassA();
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
      },
      // 一级栏目删除点击事件
      deleteClassA(){
        deleteClass({classid:this.blogClassAId})
          .then(res=>{
            console.log("一级分类删除按钮被点击");
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorderA", "");
              sessionStorage.setItem("sAclassName", "");
              sessionStorage.setItem("sAclassId", "");
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
      deleteB(){
        this.$confirm('您将删除该分类，确定继续吗？', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.deleteClassB();
          }
        }).catch((err) => {
          if (err==='cancel'){       //失败的回调
            this.$message({
              showClose: true,
              type: 'info',
              message: '取消删除'
            });
          }
        });
      },
      // 二级栏目删除点击事件
      deleteClassB(){
        console.log("二级分类删除按钮被点击");
        deleteClass({classid:this.blogClassBId})
          .then(res=>{
            console.log(res);
            if (res.status==200){
              sessionStorage.setItem("sorderB", "");
              sessionStorage.setItem("sBclassName", "");
              sessionStorage.setItem("sBclassId", "");
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
      editA(){
        this.$confirm('确认编辑该分类吗?', '编辑分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.editClassA();
          }
        }).catch((err) => {
          if (err==='cancel'){       //失败的回调
            this.$message({
              showClose: true,
              type: 'info',
              message: '取消编辑'
            });
          }
        });
      },
      // 一级栏目编辑点击事件
      editClassA(){
        let data={
          classid:this.blogClassAId,
          orderclass:this.ruleForm.orderA,
          classname:this.ruleForm.classAName
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
              sessionStorage.setItem("sorderA", this.ruleForm.orderA);
              this.ruleForm.orderA=sessionStorage.getItem("sorderA");

              sessionStorage.setItem("sAclassName",this.ruleForm.classAName);
              this.ruleForm.classAName=sessionStorage.getItem("sAclassName");

              sessionStorage.setItem("sAclassId", this.blogClassAId);
              this.blogClassAId=sessionStorage.getItem("sAclassId");

              sessionStorage.setItem("sAobj", this.selectedOption);
              this.selectedOption=sessionStorage.getItem("sAobj");
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
      editB(){
        this.$confirm('确认编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then((action) => {
          if (action==='confirm'){    //成功的回调
            this.editClassB();
          }
        }).catch(() => {
          if (err==='cancel'){       //失败的回调
            this.$message({
              showClose: true,
              type: 'info',
              message: '取消编辑'
            });
          }
        });
      },
      // 二级栏目编辑点击事件
      editClassB(){
        let data={
          classid:this.blogClassBId,
          orderclass:this.ruleForm.orderB,
          classname:this.ruleForm.classBName
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
              sessionStorage.setItem("sorderB", this.ruleForm.orderB);
              this.ruleForm.orderB=sessionStorage.getItem("sorderB");

              sessionStorage.setItem("sBclassName",this.ruleForm.classBName);
              this.ruleForm.classBName=sessionStorage.getItem("sBclassName");

              sessionStorage.setItem("sBclassId", this.blogClassBId);
              this.blogClassBId=sessionStorage.getItem("sBclassId");

              sessionStorage.setItem("sBobj", this.selectedOption);
              this.selectedOption=sessionStorage.getItem("sBobj");
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
      resetA(){
        this.ruleForm.orderA="";
        this.ruleForm.classAName=""
      },
      resetB(){
        this.ruleForm.orderB="";
        this.ruleForm.classBName=""
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
