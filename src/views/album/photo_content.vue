<template>
  <div>
    <div class="container">
      <h1>相册得评论{{this.$route.query.photoid}}</h1>

    </div>

  </div>
</template>

<script>
    import {getPhoto} from "../../api";

    export default {
        mounted(){
          let photoid=this.$route.query.photoid*1;
          console.log(photoid);
          getPhoto({photoid:photoid})
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err);
            })
        }
    }
</script>

<style scoped>

</style>
