<template>
  <div>
    <div class="container">
      <!--导航-->
      <navBar></navBar>
      <h1>这是留言页面</h1>
    </div>
  </div>
</template>

<script>
  import navBar from "../nav/navBar.vue"
  export default {
    components:{
      navBar
    },
    data(){
      return{
      }
    },
    created(){
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "4");
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
