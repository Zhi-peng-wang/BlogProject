<template>
  <div class="find">
    <h3> o(╥﹏╥)o
      404
      页面找不到了</h3>

   <p> 请确认您输入的网址是否正确，如果问题持续存在</p><br/>
    <p>请发邮件至contact@cnblogs.com与我们联系。</p>


    <!--<el-button @click="find()">返回首页</el-button><br>-->

    <el-button @click="prev()">返回上一个页面</el-button>

  </div>

</template>

<script>
    export default {
      methods:{
        // find(){
        //         this.$router.push(`/10000/index`)
        // },
        prev () {
          this.$router.go(-2)
        }
      }
    }
</script>

<style scoped>
.find{
 margin:200px 200px 100px 500px;
}
</style>
