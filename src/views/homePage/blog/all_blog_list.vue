<template>
  <div>
    <div class="panel panel-info" v-loading="loading">
      <div class="panel-heading">
        日志列表
      </div>
      <div class="panel-body">
        <div style="margin-left: 30px">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button type="danger"  style="margin-left: 450px"
                     @click="[open_all()]" :disabled="checkedBlogs.length<2">
            批量删除
          </el-button>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBlogs" @change="handlecheckedBlogsChange">
            <el-checkbox v-for="(t,index) in blog_check" :label="t" :key="index" class="blog_label">
              <div>
                <div style="width: 100px;display: inline-block">{{t.classname}}</div>
                <div style="width: 100px;display: inline-block">{{t.title.length<13?t.title:t.title.slice(0,13)+"..."}}</div>
                <div style="margin-left:130px;display: inline-block;">{{t.blogdate.slice(0,10)}}-{{t.blogdate.slice(11,16)}}</div>
                <div  style="margin-left:40px;display: inline-block;">
                  <el-button type="danger"  @click="[open([t.blogid,t])]">删除</el-button>
                </div>
                <div  style="margin-left:30px;display: inline-block;">
                  <router-link :to="{path:`/${$route.params.id}`+'/home_page/edit_blog',query:{blogid:t.blogid}}">
                    <el-button type="primary">编辑</el-button>
                  </router-link>
                </div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!--分页-->
      <div class="block" style="margin-left: 230px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {deleteAllBlog, deleteBlog, getAllClassBlog} from "../../../api";
  export default {
    inject: ['reload'],
    data(){
      return{
        blog_list:[],
        checkAll: false,
        checkedBlogs: [],
        blog_check: [],
        isIndeterminate: true,
        currentPage: 1,
        total:0,
        page_size:0,
        page_number:0,
        loading:false,
      }
    },
    mounted(){
      this.getBlogList()
    },
    methods: {
      //批量删除
      open_all() {
        this.$confirm('此操作将永久这些日志, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            this.deleteAllBlogAction();
            this.$message({
              type: 'success',
              message: '删除成功!',
              showClose:true
            });
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消删除',
              showClose:true
            });
          }
        });
      },
      //批量删除
      deleteAllBlogAction(){
        console.log("批量删除按钮已触发");
        console.log(this.checkedBlogs);
        const result =this.checkedBlogs.map(item=>({
          blogid:item.blogid
        }));
        console.log(result);
        deleteAllBlog(result)
          .then(res=>{
            console.log(res);
            let res_status =res.status;
            if(res_status===200){
              //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
              this.reload()
            }else {
              console.log("删除失败");
            }
          })
          .catch(err=>{
            console.log(err);
          })
      },
      //判断单个确认选中和取消选中，等情况
      open([blogid,t]) {
        this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((action) => {
          if (action === 'confirm') {     //确认的回调
            this.deleteBlog([blogid,t]);
            this.$message({
              type: 'success',
              message: '删除成功!',
              showClose:true
            });
          }
        }).catch((err) => {
          if (err === 'cancel') {     //取消的回调
            this.$message({
              type: 'info',
              message: '已取消删除',
              showClose:true
            });
          }
        });
      },
      //删除单个博客
      deleteBlog([blogid,t]){
        console.log("删除按钮已经点击"+blogid);
        let blogId=blogid*1;
        deleteBlog({blogid:blogId})
          .then(res=>{
            console.log(res);
            const result =res.status;
            if(result===200){
              let index=this.blog_check.indexOf(t);
              console.log(t);
              this.blog_check.splice(index,1);
              //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
              this.reload()
            }else {
              console.log("删除失败");
            }
          })
          .catch(error=>{
            console.log(error);
          })
      },
      //分页得相关操作
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        this.getBlogList()
      },
      handleCheckAllChange(val) {
        this.checkedBlogs = val ? this.blog_check : [];
        this.isIndeterminate = false;
      },
      handlecheckedBlogsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.blog_check.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.blog_check.length;
      },
      //得到所有得日志列表
      getBlogList(){
        this.loading=true;
        getAllClassBlog({"userid":localStorage.getItem("loginUser"),"pagenum":this.page_number})
          .then(res=>{
            const result=res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            this.loading=false;
            const checks=result.map(item=>({
              blogid:item.blogid,
              classname:item.classname,
              title:item.title,
              blogdate:item.blogdate
            }));
            this.blog_check=checks;
            this.loading=false;
            console.log(this.blog_check);
          })
          .catch(error=>{
            console.log(error);
          })
      }
    },
  }
</script>

<style scoped>
  .blog_label{
    display: block;
    margin-bottom: 20px;
  }
</style>
