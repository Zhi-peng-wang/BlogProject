<script src="../config/index.js"></script>
<template>
  <div id="app">
		<router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  .el-menu-demo li{
    padding: 0;
    width: 80px;
    text-align: center;
  }
</style>
