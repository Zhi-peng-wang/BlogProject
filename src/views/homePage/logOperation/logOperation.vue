<template>
    <div>
      <div class="container">
        <h1>这是用户操作动作记录页面</h1>
        <router-link :to="`/${$route.params.id}`+'/blog'">日志页面</router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>

</style>
