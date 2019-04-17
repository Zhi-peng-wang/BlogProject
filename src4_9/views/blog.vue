<template>
  <div>
    <div class="logo">
      <img src="holder.js/100px60">
      <br>
    </div>
    <!--导航条-->
    <div class="branner">
      <el-carousel :interval="2000" type="card" height="400px">
        <el-carousel-item v-for="item in imgs" :key="item.id">
          <img :src="item.idView" class="image" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
      <br>
    </div>
    <div class="container">
      <!--导航-->
      <div class="nav_bar" style="width:37%;margin:0 auto">
        <!-- <img src="holder.js/100px60" /> -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">
            <router-link to="/album">相册</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/blog">日志</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            留言
          </el-menu-item>
          <el-menu-item index="5">
            访客
          </el-menu-item>
          <el-menu-item index="6">
            评论
          </el-menu-item>
        </el-menu>
        <br>
      </div>
    </div>


    <div class="container">
      <div class="row">
        <!-- 目录 -->
        <div class="col-md-4 col-xs-4" style="height: 600px;">
          <el-col :span="24">
            <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo">
              <el-submenu v-for="(t1,index) in blog_url_1" :index="t1.url">
                <template slot="title">
                  {{t1.classname}}
                </template>
                <el-menu-item-group v-for="(t2,index) in blog_url_2" v-if="t1.classid==t2.parentid">
                  <el-menu-item :index="t2.url" :key="index">
                    <router-link :to="t2.url">{{t2.classname}}{{t2.classid}}</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
        <div class="col-md-8 col-xs-8 panel panel-primary" style="padding: 0;" >
          <div class="panel-heading">
            <h4>详情列表</h4>
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
  import axios from 'axios'

  export default {
    data() {
      return {
        imgs: [
          {id: 0, idView: require("../assets/4.jpg")},
          {id: 1, idView: require("../assets/2.jpg")},
          {id: 2, idView: require("../assets/3.jpg")},
          {id: 3, idView: require("../assets/1.jpg")}
        ],
        activeIndex: '3',
        blog_url_1: [],
        blog_url_2: []
      };
    },
    created() {
      let id = this.$route.params.id
      // axios.get("../../static/tb_class.json")
      // axios.get(`http://192.168.43.238:8090/getMyClass?userid=${id}`)
      axios.post(`http://192.168.43.238:8090/getMyClass`, {userid: id})
        .then((response) => {
          const result = response.data.object;
          console.log(result);

          //一级标题的相关内容
          result.map(item => {
            if (item.depth == 1 && item.parentid == 1) {
              return this.blog_url_1.push(item)
            }
          });
          console.log(this.blog_url_1);


          // 二级标题的相关内容
          result.map(item => {
            if (item.depth == 2) {
              return this.blog_url_2.push(item)
            }
          });
          console.log(this.blog_url_2);

        }).catch((error) => {
        console.log("请求失败" + error);
      })
    }
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
