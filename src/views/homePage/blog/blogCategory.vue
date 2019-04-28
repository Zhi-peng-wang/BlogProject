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
                    <select multiple class="form-control"  style="height: 120px">
                      <option v-for="(b1,index) in blog_url_1" :key="index"
                              @click="sendClassAId([b1.classid,b1.orderclass,b1.classname])">
                        {{index+1}}:{{b1.classname}}
                      </option>
                    </select>
                    <div class="form-group">
                      <label>栏目排序：</label>
                      <input type="text" class="form-control" v-model="orderA">
                    </div>
                    <div class="form-group">
                      <label>栏目名称：</label>
                      <input type="text" class="form-control" v-model="classAName">
                    </div>
                    <button type="submit" class="btn btn-info pl-3 pr-3"
                            @click="addClassA()">
                      添加
                    </button>
                    <button type="submit" class="btn btn-primary pl-3 pr-3"
                            @click="editClassA()">
                      编辑
                    </button>
                    <button type="submit" class="btn btn-danger pl-3 pr-3"
                            @click="deleteClassA()">
                      删除
                    </button>
                  </div>


                  <!--二级栏目-->
                  <div class="col-lg-6 col-sm-12">
                    <label>二级栏目：</label>
                    <select multiple class="form-control" style="height: 120px">
                      <option v-for="(b2,index) in blog_url_2_2"
                              @click="sendClassBId([b2.classid,b2.orderclass,b2.classname])">
                        {{b2.classname}}
                      </option>
                    </select>
                    <div class="form-group">
                      <label>栏目排序：</label>
                      <input type="text" class="form-control" v-model="orderB">
                    </div>
                    <div class="form-group">
                      <label>栏目名称：</label>
                      <input type="text" class="form-control" v-model="classBName">
                    </div>
                    <button class="btn btn-info pl-3 pr-3"
                            @click="addClassB()">
                      添加
                    </button>
                    <button class="btn btn-primary pl-3 pr-3"
                            @click="editClassB()">
                      编辑
                    </button>
                    <button class="btn btn-danger pl-3 pr-3"
                            @click="deleteClassB()">
                      删除
                    </button>
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
        blog_url_1:[],
        blog_url_2:[],
        blog_url_2_2:[],
        classAName:"",
        classBName:"",
        blogClassAId:"",
        blogClassBId:"",
        orderA:"",
        orderB:""
      };
    },
    mounted() {
      //拿到分类
      getClass({userid:localStorage.getItem("loginUser"),typeid:1})
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
      addClassA(){
        console.log("一级栏目的点击事件");
        let data={
          userid: localStorage.getItem("loginUser"),
          classname:this.classAName,
          parentid:"1",
          orderclass:this.orderA,
          depth:"1",
          url:this.classAName,
          typeid:"1"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            this.reload();
            console.log(res);
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
          })
      },
      addClassB(){
        console.log("二级栏目的点击事件");
        let data={
          userid: localStorage.getItem("loginUser"),
          classname:this.classBName,
          parentid:this.blogClassAId,
          orderclass:this.orderB,
          depth:"2",
          url:this.classBName,
          typeid:"1"
        };
        console.log(data);
        addClass(data)
          .then(res=>{
            console.log(res);
            this.reload();
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
          })
      },
      sendClassAId([classid,orderA,className]){
        console.log("一级分类被点击"+classid);
        this.orderA=orderA;
        this.classAName=className;
        this.blogClassAId=classid;
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
      },
      sendClassBId([classid,orderB,className]){
        console.log("二级分类被点击"+classid);
        this.blogClassBId=classid;
        this.orderB=orderB;
        this.classBName=className;
      },
      deleteClassA(){
        deleteClass({classid:this.blogClassAId})
          .then(res=>{
            console.log("一级分类删除按钮被点击");
            console.log(res);
            this.reload();
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
          })
      },
      deleteClassB(){
        console.log("二级分类删除按钮被点击");
        deleteClass({classid:this.blogClassBId})
          .then(res=>{
            console.log(res);
            this.reload();
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
          })
      },
      editClassA(){
        let data={
          classid:this.blogClassAId,
          orderclass:this.orderA,
          classname:this.classAName
        };
        editClass(data)
          .then(res=>{
            console.log(res);
            this.reload();
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
          })
      },
      editClassB(){
        let data={
          classid:this.blogClassBId,
          orderclass:this.orderB,
          classname:this.classBName
        };
        editClass(data)
          .then(res=>{
            console.log(res);
            this.reload();
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
          })
      }
    }
  }
</script>

<style scoped>

</style>
