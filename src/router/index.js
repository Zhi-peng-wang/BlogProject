import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import register from "../views/register"
import home_page from "../views/homePage/home_page.vue"
import person_data from "../views/homePage/personData/person_data.vue"
import add_blog from "../views/homePage/blog/add_blog.vue"
import edit_blog from "../views/homePage/blog/edit_blog"
import all_blog_list from "../views/homePage/blog/all_blog_list"
import blogCategory from "../views/homePage/blog/blogCategory"
import albumAll from "../views/homePage/album/albumAll"
import albumCategory from "../views/homePage/album/albumCategory"
import addPhoto from "../views/homePage/album/addPhoto"
import myComment from "../views/homePage/personData/myComment"
import myParticipate from "../views/homePage/personData/myParticipate"
import blog from '../views/blog'
import blog_list from '../views/blog_list'
import new_blog_list from '../views/new_blog_list'
import blog_content from '../views/blog_content.vue'
import album from '../views/album.vue'
import photo_class from '../views/album/photo_class.vue'
import photo_list from '../views/album/photo_list.vue'
import photo_content from '../views/album/photo_content.vue'
import leaveMessage from '../views/leaveMessage/leaveMessage'
import logOperation from '../views/homePage/logOperation/logOperation'
import home from '../views/home'
import wrong from '../views/wrong.vue'
import editPassword from '../views/homePage/editPassword/editPassword'
import visitCenter from '../views/homePage/visitCenter/visitCenter'
import myself from '../views/homePage/myself/myself'
import albumList from '../views/homePage/album/albumList'

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
      path:'/:id/home',
      component:home
    },
    {
      path:'/:id/visitCenter',
      component:visitCenter
    },
    {
      path:'/:id/myself',
      component:myself
    },
    {
      path:'/:id/logOperation',
      component:logOperation
    },
    {
      path:'/:id/editPassword',
      component:editPassword
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
          {
            path:'blogCategory',
            component:blogCategory
          },
          {
            path:'all_blog_list',
            component:all_blog_list
          },
          {
            path:'albumAll',
            component:albumAll
          },
          {
            path:'albumList',
            component:albumList
          },
          {
            path:'albumCategory',
            component:albumCategory
          },
          {
            path:'addPhoto',
            component:addPhoto
          },
          {
            path:'myComment',
            component:myComment
          },
          {
            path:'myParticipate',
            component:myParticipate
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
            component:new_blog_list
          },
          {
            path:'/new_blog_list',
            component:new_blog_list
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
    {
      path:'/:id/leaveMessage',
      component:leaveMessage
    },
    {
      path:'/404',
      name:"wrong",
      component:wrong
    },
    {
      path:"*",
      redirect:"/404"
    }
  ]
})
