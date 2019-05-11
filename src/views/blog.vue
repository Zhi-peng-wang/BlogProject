<template>
  <div>
    <div class="container">
      <!--导航-->
      <navBar></navBar>
    </div>


    <div class="container">
      <div class="row">
        <!-- 目录 -->
        <div class="col-md-4 col-xs-4" style="height: 600px;">
          <el-col :span="24">
            <template>
              <h4>日志分类</h4>
            </template>
            <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo"
                     uniqueOpened>
              <el-submenu v-for="(t1,index) in blog_url_1" :index="t1.url">
                <template slot="title">
                  <span>{{t1.classname}}</span>
                </template>
                <el-menu-item-group v-for="(t2,index) in blog_url_2" v-if="t1.classid==t2.parentid" v-loading="loading">
                  <el-menu-item :key="index">
                    <router-link :to="{path:`/${$route.params.id}`+'/blog/blog_list',query:{classid:t2.classid}}"
                    >
                      <span>{{t2.classname}}</span>
                      <el-badge :value="t2.num" class="item" type="primary" style="float: right;margin-top: 5px">
                      </el-badge>
                    </router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
        <!--这是日志的title-->
        <div class="col-md-8 col-xs-8 panel panel-primary" style="padding: 0;" >
          <div class="panel-heading">
            <h4>日志列表</h4>
          </div>
          <div class="panel-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <br>
      <img src="holder.js/100px30" alt>
    </div>
  </div>
</template>

<script>
  import {getClass} from "../api";
  import navBar from "./nav/navBar"
  export default {
    components:{
      navBar
    },
    data() {
      return {
        loading:false,
        activeIndex: '3',
        blog_url_1: [],
        blog_url_2: [],
        blog_title:[],
        loginUser:"",
      };
    },
    created(){
      //修改vuex中的默认激活的值
      this.$store.commit('activeNav', "3");
    },
    mounted() {
      this.loading=true;
      let id = this.$route.params.id;
      this.loginUser=localStorage.getItem("loginUser");
      getClass({userid:id,typeid:1})
      //得到分类名称
        .then(response => {
          console.log(response);
          const result = response.object;
          console.log("assddas");
          console.log(result);
          //一级标题的相关内容
          result.map(item => {
            if (item.depth == 1 && item.parentid == 1) {
              return this.blog_url_1.push(item)
            }
          });
          // 二级标题的相关内容
          result.map(item => {
            if (item.depth == 2) {
              return this.blog_url_2.push(item)
            }
          });
        });
      this.loading=false;
    },
  };
</script>

<style>
  a {
    color: black;
    display: block;
  }
  li {
    list-style: none;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
