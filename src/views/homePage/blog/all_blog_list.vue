<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        日志列表
      </div>
      <div class="panel-body">
        <div style="margin-left: 30px">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(t,index) in blog_check" :label="t" :key="index" class="blog_label">
              <div>
                <div style="width: 100px;display: inline-block">{{t.classname}}</div>
                <div style="width: 100px;display: inline-block">{{t.title}}</div>
                <div style="margin-left:150px;display: inline-block;">{{t.blogdate.slice(0,10)}}</div>
                <div  style="margin-left:40px;display: inline-block;">
                  <el-button type="danger" plain @click="deleteBlog(t.blogid)">删除</el-button>
                </div>
                <div  style="margin-left:30px;display: inline-block;">
                  <el-button type="primary" plain>编辑</el-button>
                </div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
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
  import {deleteBlog, getAllClassBlog} from "../../../api";
  export default {
    data(){
      return{
        blog_list:[],
        checkAll: false,
        checkedCities: [],
        blog_check: [],
        isIndeterminate: true,
        currentPage: 1,
        total:0,
        page_size:0,
        page_number:0,
      }
    },
    mounted(){
      this.getBlogList()
    },
    methods: {
      deleteBlog(blogId){
        console.log("删除按钮已经点击"+blogId);
        deleteBlog({"blogid":blogId})
          .then(res=>{
            console.log(res);
          })
          .catch(error=>{
            console.log(error);
          })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        this.getBlogList()
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.blog_check : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.blog_check.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.blog_check.length;
      },
      getBlogList(){
        getAllClassBlog({"userid":this.$route.params.id,"pagenum":this.page_number})
          .then(res=>{
            const result=res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            const checks=result.map(item=>({
              blogid:item.blogid,
              classname:item.classname,
              title:item.title,
              blogdate:item.blogdate
            }));
            this.blog_check=checks;
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
