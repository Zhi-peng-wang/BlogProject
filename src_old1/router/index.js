import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import blog from '../views/blog'
import ajax_base from '../views/ajax_base'
import ajax_progress from '../views/ajax_progress'
import mysql_base from '../views/mysql_base.vue'
import mysql_progress from '../views/mysql_progress.vue'
import java_base from '../views/java_base.vue'
import java_progress from '../views/java_progress.vue'
import blog_content from '../views/blog_content.vue'
import album from '../views/album.vue'
import photo from '../views/photo.vue'
import xiangche from '../views/xiangche.vue'


Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes:[
		{
			path:'',
			component:login
		},
    {
      path:'/xiangche',
      component:xiangche
    },
		{
			path:'/blog',
			component:blog,
			children:
			[
				{
					path:'',
					component:ajax_base
				},
				{
					path:'ajax_base',
					component:ajax_base
				},
				{
					path:'ajax_progress',
					component:ajax_progress
				},
				{
					path:'mysql_base',
					component:mysql_base
				},
				{
					path:'mysql_progress',
					component:mysql_progress
				},
				{
					path:'java_base',
					component:java_base
				},
				{
					path:'java_progress',
					component:java_progress
				},
				{
					path:'blog_content/:id',
					component:blog_content
				}
			]
		},
		{
			path:'/album',
			component:album
		},
		{
			path:'/photo/:classid',
			component:photo
		}
	]
})
