// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
});
// router.beforeEach((to,from,next)=>{
//   if (to.meta.needLogin){
//     console.log("需要登录");
//   }else {
//     next()
//   }
// });
// router.beforeEach((to,from,next)=>{
//   if (!userid){
//     next({path:'/login'})
//   }else{
//     next()
//   }
// });
