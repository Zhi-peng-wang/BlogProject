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
              <div style="width: 100px;display: inline-block">{{t.classname}}</div>
              <div style="width: 100px;display: inline-block">{{t.title}}</div>
              <div style="margin-left:100px;display: inline-block;">{{t.blogdate.slice(0,10)}}</div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllClassBlog} from "../../../api";
  export default {
    data(){
      return{
        blog_list:[],
        checkAll: false,
        checkedCities: [],
        blog_check: [],
        isIndeterminate: true
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.blog_check : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.blog_check.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.blog_check.length;
      }
    },
    mounted(){
      getAllClassBlog({"userid":10000,"pagenum":0})
        .then(res=>{
          const result=res.object.content;
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
    },
  }
</script>

<style scoped>
  .blog_label{
    display: block;
    margin-bottom: 20px;
  }
</style>
