<template>
  <div>
    <div class="jumbotron">
      <h2>{{this.blog_title.title}}内容:</h2><br>
      <p>{{this.blog_title.content}}</p><br>
      <hr>
    </div>
  </div>
</template>
<script>
  import event from '@/event.js'

  export default {
    data() {
      return {
        //日志的详情内容
        blog_title: []
      }
    },
    mounted(){
      event.$on('toChangeBlog', msg => {
        console.log("blog_content组件的信息");
        console.log(msg.object);
        this.blog_title=msg.object;
        console.log(this.blog_title);
      })
    }
  }
</script>
<style>
</style>
