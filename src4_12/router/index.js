import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import register from "../views/register"
import blog from '../views/blog'
import blog_list from '../views/blog_list'
import blog_content from '../views/blog_content.vue'
import album from '../views/album.vue'
import photo from '../views/photo.vue'


Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes:[
		{
			path:'',
			component:login
		},
    {
      path:'/register',
      component:register
    },
		{
			path:'/:id/blog',
			component:blog,
			children:
			[
				{
					path:'',
					component:blog_list
				},
				{
					path:'blog_list',
					component:blog_list
				},
        {
          path:'blog_content',
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
