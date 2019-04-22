<template>
  <div>
    <div class="container">
      <!--导航-->
      <div class="nav_bar" style="width:90%;margin:0 auto">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item>
            <img src="../assets/tx.jpg">
          </el-menu-item>
          <el-menu-item>
            <h3>王小明</h3>
          </el-menu-item>
          <el-menu-item index="1" style="margin-left:30%">主页</el-menu-item>
          <el-menu-item index="2">
            <router-link :to="`/${$route.params.id}`+'/album/photo_class'">相册</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="`/${$route.params.id}`+'/blog'">日志</router-link>
          </el-menu-item>
          <el-menu-item index="4">留言</el-menu-item>
          <el-menu-item index="5">访客</el-menu-item>
          <el-menu-item index="6">评论</el-menu-item>
          <el-menu-item index="7">
            <router-link :to="`/${$route.params.id}`+'/home_page'">个人中心</router-link>
          </el-menu-item>
        </el-menu>
        <br>
      </div>
    </div>


    <div class="container" v-loading="loading">
      <div class="row">
        <!-- 目录 -->
        <div class="col-md-4 col-xs-4" style="height: 600px;">
          <el-col :span="24">
            <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo">
              <el-submenu v-for="(t1,index) in blog_url_1" :index="t1.url">
                <template slot="title">
                  <i class="iconfont icon-VIP" style="font-size: 30px;color: gold"></i>
                  <span>{{t1.classname}}</span>
                </template>
                <el-menu-item-group v-for="(t2,index) in blog_url_2" v-if="t1.classid==t2.parentid">
                  <el-menu-item :key="index">
                    <router-link :to="`/${$route.params.id}`+'/blog/blog_list'"
                                 @click.native="send_id(t2.classid)">
                      <i class="iconfont icon-fuwurizhi" style="font-size: 15px;color: #d4d4d4"></i>
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
            <h4>详情列表</h4>
          </div>
          <div class="panel-body" @click="unShow">
            <router-view></router-view>
          </div>
          <div class="block" style="margin-left: 230px;" v-if="fenye_show">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="page_size"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
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
  import event from '@/event.js'
  import {getClassBlog, getClass} from "../api";
  export default {
    data() {
      return {
        activeIndex: '3',
        blog_url_1: [],
        blog_url_2: [],
        blog_classid:9,
        blog_title:[],
        totalElements:"",
        size:"",
        currentPage: 1,
        total:0,
        page_size:0,
        page_number:0,
        fenye_show:true,
        loading: false
      };
    },
    mounted() {
      this.loading=true;
      let id = this.$route.params.id;
      getClass({userid: id,typeid:1})
      //得到分类名称
        .then((response) => {
          const result = response.object;
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
          this.loading=false
        });
      this.send_id(this.blog_classid)
    },
    methods:{
      unShow(){
        console.log("发生了点击事件");
        this.fenye_show=false
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val-1}`);
        this.page_number=`${val-1}`;
        console.log(this.page_number);
        this.O_getClassBlog()
      },
      send_id(classid) {
        console.log("blog组件传递参数classid给后台:"+classid);
        this.blog_classid=classid;
        this.fenye_show=true;
        this.O_getClassBlog()
      },
      O_getClassBlog(){
        getClassBlog({classid:this.blog_classid,pagenum:this.page_number})
          .then(res=>{
            this.loading=false;
            console.log(res);
            console.log("-------------------------");
            //此处的res已经拿到了res.data数据,在封装的方法中已经完成
            const result =res.object.content;
            this.total=res.object.totalElements;
            this.page_size=res.object.size;
            const blog_title=result.map(item=>({
              blogid:item.blogid,
              classid:item.classid,
              title:item.title,
            }));
            //将此时的数据赋给上面的空数组
            this.blog_title=blog_title;
            event.$emit('toChangeTitle',this.blog_title);
          }).catch(error=>{
          console.log("请求数据失败"+error);
        })
      },
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
