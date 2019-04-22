import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import register from "../views/register"
import home_page from "../views/homePage/home_page.vue"
import person_data from "../views/homePage/personData/person_data.vue"
import add_blog from "../views/homePage/blog/add_blog.vue"
import edit_blog from "../views/homePage/blog/edit_blog"
import addBlog from "../views/homePage/blog/addBlog"
import all_blog_list from "../views/homePage/blog/all_blog_list"
import blog from '../views/blog'
import blog_list from '../views/blog_list'
import blog_content from '../views/blog_content.vue'
import album from '../views/album.vue'
import photo_class from '../views/album/photo_class.vue'
import photo_list from '../views/album/photo_list.vue'
import photo_content from '../views/album/photo_content.vue'


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'/:id/home_page',
      component:home_page,
      children:
        [
          {
            path:'',
            component:person_data
          },
          {
            path:'person_data',
            component:person_data
          },
          {
            path:'add_blog',
            component:add_blog
          },
          {
            path:'edit_blog',
            component:edit_blog
          },

          // {
          //   path:'addBlog',
          //   component:addBlog
          // },
          {
            path:'all_blog_list',
            component:all_blog_list
          },
        ]
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
      path:'/:id/album',
      component:album,
      children:
        [
          {
            path:'photo_class',
            component:photo_class
          },
          {
            path:'photo_list',
            component:photo_list
          },
          {
            path:'photo_content',
            component:photo_content
          }
        ]
    },
  ]
})
