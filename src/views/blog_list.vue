<template>
  <div>
    <h3>日志列表:</h3><br>
    <div style="height: 260px">
      <div style="height: 220px" v-loading="loading">
        <ul>
          <li v-for="(t,index) in blog_title" :key="index">
            <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_content',query:{blogid:t.blogid}}"
                         class="list-group-item">
              {{t.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="block" style="margin-left: 230px;" v-if="fenye_show">
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
  import {getClassBlog} from "../api";

  export default{
    data(){
      return{
        blog_title:[],
        totalElements:"",
        size:"",
        currentPage: 1,
        total:0,
        page_size:0,
        page_number:0,
        fenye_show:true,
        loading: false,
        uniqueOpened:true
      }
    },
    mounted(){
      this.getClassBlogList()
    },
    // 监听,当路由发生变化的时候执行
    watch: {
      '$route':'getClassBlogList'
    },
    methods: {
      unShow(){
        console.log("发生了点击事件");
        this.fenye_show=false
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        this.getClassBlogList()
      },

      getClassBlogList(){
        this.loading=true;
        getClassBlog({classid:this.$route.query.classid,pagenum:this.page_number})
          .then(res=>{
            this.loading=false;
            console.log(res);
            console.log("-------------------------");
            //此处的res已经拿到了res.data数据,在封装的方法中已经完成
            const result =res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            const blog_title=result.map(item=>({
              blogid:item.blogid,
              classid:item.classid,
              title:item.title,
            }));
            //将此时的数据赋给上面的空数组
            this.blog_title=blog_title;
          }).catch(error=>{
          console.log("请求数据失败"+error);
        })
      },
    }
  }
</script>

<style>
</style>
