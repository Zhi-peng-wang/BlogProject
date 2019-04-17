<template>
    <div>
        <h3>Java基础：</h3><br>
		<ul>
			<li v-for="(t,index) in blog_title" :key="index">
				<!-- <a href=""  v-if="t.classid==13" class="list-group-item">{{t.title}}</a> -->
				<router-link :to="`/blog/blog_content/${t.blogid}`" v-if="t.classid==13" class="list-group-item">{{t.title}}</router-link>
			</li>
		</ul>
    </div>    
</template>

<script>
import axios from 'axios'

export default{
	data(){
		return{
			blog_title:[]
		}
	},
	created(){
		axios.get('../../static/tb_blog.json')
		.then(data=>{
			// console.log(data.data)
			//得到数据
			const result =data.data
			//将所需要的数据提取出来
			const blog_title=result.map(item=>({
				blogid:item.blogid,
				classid:item.classid,
				title:item.title
			}))
			//将此时的数据赋给上面的空数组
			this.blog_title=blog_title
			// console.log(this.blog_title)
		})
	}
	
}
</script>
<style>

</style>
