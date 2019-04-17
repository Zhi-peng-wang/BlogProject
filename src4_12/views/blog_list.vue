<template>
	<div>
		<h3>ajax基础：</h3><br>
		<ul>
			<li v-for="(t,index) in blogid_title" :key="index">
				 <a href="" class="list-group-item">{{t.title}}</a>
				<!--<router-link :to="`/${$route.params.id}/blog/blog_content/${t.blogid}`" class="list-group-item">-->
					<!--{{t.title}}-->
				<!--</router-link>-->
        <!--4.11晚写的留明早测试-->
        <!--<router-link :to="`/${$route.params.id}`+'/blog/blog_content'" @click.native="send_blogid(t.blogid)">{{t.title}}</router-link>-->
			</li>
		</ul>
	</div>
</template>

<script>
import event from '@/event.js'
export default{
	data(){
		return{
      blogid_title:[]
		}
	},
	// create(){
  //   event.$on('toChangeTitle',  msg => {
  //     console.log("第一个组件信息：");
  //     console.log(msg);
  //     this.blogid_title=msg;
  //   });
  //   //设想获得到了包括title和content内容的数据
  //   // 将其传入到content中
  //   event.$emit('toChangeBlog',this.blogid_title)
  // },
  mounted(){
    event.$on('toChangeTitle',  msg => {
      console.log("第一个组件信息：");
      console.log(msg);
      this.blogid_title=msg;
    })
  },
  methods:{
	  send_blogid(){
      console.log("发送blogid事件被触发");
    }
  }
}
</script>

<style>
</style>
