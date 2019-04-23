<template>
  <div>
    <h3>日志列表:</h3><br>
    <div style="height: 220px">
      <ul>
        <li v-for="(t,index) in blogid_title" :key="index">
          <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_content',query:{blogid:t.blogid}}"
                       class="list-group-item">
            {{t.title}}
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import event from '../event.js'
  export default{
    data(){
      return{
        blogid_title:[],
      }
    },
    mounted(){
      event.$on('toChangeTitle',  msg => {
        console.log("blog组件信息：");
        console.log(msg);
        this.loading=false;
        this.blogid_title=msg;
        // this.total=msg[1].totalElements;
        // this.page_size=msg[1].size;
        console.log("blog_list组件");
        console.log(this.blogid_title);
      })
    },
  }
</script>

<style>
</style>
