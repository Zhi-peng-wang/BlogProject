<template>
  <div>
    <div style="margin-top: 30px">
      <div style="height: 440px">
        <ul>
          <li v-for="(b,index) in newBlogList" :key="index">
            <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_content',query:{blogid:b.blogid}}"
                         class="list-group-item">
              <span>{{b.title}}</span>
              <span style="float: right;margin-right: 60px">{{b.blogdate.slice(0,10)}}</span>
            </router-link>
          </li>
        </ul>
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
  import {getAllClassBlog} from "../api";

  export default{
    data(){
      return{
        blogid_title:[],
        newBlogList:[],
        currentPage: 1,
        total:0,
        page_size:0,
        page_number:0
      }
    },
    methods:{
      //分页得相关操作
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        this.getBlogList()
      },
      getBlogList(){
        getAllClassBlog({userid:this.$route.params.id,pagenum:this.page_number})
          .then(res=>{
            console.log(res);
            const result=res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            const newBlogLists=result.map(item=>({
              blogid:item.blogid,
              title:item.title,
              blogdate:item.blogdate
            }));
            this.newBlogList=newBlogLists;
            console.log(this.newBlogList);
          })
          .catch(error=>{
            console.log(error);
          })
      }
    },
    mounted(){
      this.getBlogList()
    },
  }
</script>

<style>
</style>
