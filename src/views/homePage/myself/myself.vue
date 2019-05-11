<template>
  <div>
    <div class="container">
    <div class="nav_bar" style="width:90%;margin:0 auto">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item>
          <img src="../../../assets/tx.jpg">
        </el-menu-item>
        <el-menu-item>
          <h3>{{this.$route.params.id}}</h3>
        </el-menu-item>
        <el-menu-item index="1" style="margin-left:42%">
          <router-link :to="`/${$route.params.id}`+'/home'">主页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="`/${$route.params.id}`+'/album/photo_class'">相册</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link :to="`/${$route.params.id}`+'/blog'">日志</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link :to="`/${$route.params.id}`+'/leaveMessage'">留言</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link :to="`/${$route.params.id}`+'/home_page'">
            <el-dropdown>
                  <span class="el-dropdown-link">
                    {{loginUser}}<i class="el-icon-arrow-down el-icon--right" style="margin:-3px 0px 0px -3px"></i>
                  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="`/${$route.params.id}`+'/home_page'">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="`/${$route.params.id}`+'/editPassword'">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </router-link>
        </el-menu-item>
      </el-menu>
      <br>
    </div>
    </div>

    <div class="container">
      <!--访客信息-->
      <div class="col-md-4">
        <div class="panel panel-warning">
          <div class="panel-heading">
            <b>最近访客</b>
          </div>
          <div class="panel-body" style="padding-bottom: 0;">
            <div style="height: 400px">
              <!--访客人员的信息-->
              <div class="row">
                <div class="col-md-4" style="padding: 0;"
                     v-for="(v,index) in visitorInfo.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                     :key="index">
                  <el-tooltip  placement="top">
                    <div slot="content" style="width: 60px;text-align: center">{{v.nickname}}</div>
                    <div>   <!--这是最外面的盒子-->
                      <div style="margin: 5px auto;width:88px; height:88px;background: skyblue;">  <!--这是包裹图片的盒子-->
                        <!--<img src="" alt="访客头像" width="66px" height="57px">-->
                      </div>
                      <div>   <!--这是访客访问的日期的盒子-->
                        <p class="vistorDate">{{v.guestdate.slice(0,10)}}</p>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <!--访客的分页-->
            <div>
              <el-pagination style="text-align: right;margin-top: 15px"
                             @current-change="handleCurrentChange"
                             :current-page="currentPage"
                             :page-size="PageSize"
                             layout="prev,next"
                             :total="totalCount">
              </el-pagination>
            </div>
          </div>
          <!--浏览量-->
          <div class="panel-body" style="padding: 0 0 15px 0">
            <div class="row">
              <div class="col-md-4">
                <p class="browseNum">今日浏览</p>
                <p class="browseNum"><b>30</b></p>
              </div>
              <div class="col-md-4">
                <p class="browseNum">总浏览量</p>
                <p class="browseNum"><b>6666</b></p>
              </div>
              <div class="col-md-4">
                <p class="browseNum" style=" font-weight: bold;padding-top: 30px;"><router-link :to="`/${$route.params.id}`+'/visitCenter'">更多访客</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--个人资料-->
      <div class="col-md-8">
      <div class="panel panel-info">
        <div class="panel-heading">个人资料</div>
        <div class="panel-body">
          <div class="mine">
            <p>昵称：{{nickname}}</p>
            <p><span>签名：{{sign}}</span></p>
            <p><span>年龄：{{age}}</span></p>
            <p><span>性别：{{sex}}</span></p>
            <p>电话：{{Tel}}</p>
            <p><span>邮箱：{{email}}</span></p>
            <p><span>生日：{{birth}}</span></p>
            <p><span>地址：{{add}}</span></p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getGuest, getUser} from "../../../api";
  export default {
    data(){
      return{
        loading:false,
        activeIndex:"",
        loginUser:"",
        nickname: "",
        sign:"",
        sex: "",
        age: "",
        Tel: "",
        email: "",
        birth: "",
        add: "",
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:30,
        // 默认每页显示的条数（可修改）
        PageSize:9,
        //访客信息
        visitorInfo:[],
      }
    },
    mounted(){
      this.loginUser=localStorage.getItem("loginUser");
      this.loading=true;
      let id = this.$route.params.id;
      getUser({userid:id})
        .then(res=>{
          console.log("请求个人信息");
          console.log(res);
          const result=res.object;
          this.loading=false;
          this.nickname=result.nickname;
          this.sign=result.sign;
          this.sex=result.sex;
          this.age=result.age;
          this.Tel=result.phone;
          this.email=result.email;
          this.brith=result.birth;
          this.add=result.add;
        })
        .catch(error=>{
          console.log("请求个人信息失败");
        });
        this.loading=true;

      //得到访客信息
      let getGuestData={
        userid:this.$route.params.id,
        typeid:"index",
        topnum:30
      };
      getGuest(getGuestData)
        .then(res=>{
          console.log("拿到访客信息");
          console.log(res);
          const result = res.object;
          console.log(result);
          const visitorInfos=result.map(item=>({
            fromuserid: item.fromuserid,
            guestdate:item.guestdate,
            nickname:item.nickname,
            userimg:item.img
          }));
          this.visitorInfo=visitorInfos;
          console.log(this.visitorInfo);
        })
        .catch(err=>{
          console.log("没有拿到访客信息");
          console.log(err);
        });
    },
    methods:{
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
    }
  }
</script>

<style scoped>
  .container{
    margin-top: 20px;
  }
  .vistorDate{
    text-align:center;
  }
  .browseNum{
    text-align:center;
  }
  .demo-ruleForm{
    width: 80%;
  }
  p{
    line-height: 30px;
  }
</style>
