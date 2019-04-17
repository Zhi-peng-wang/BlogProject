<template>
    <div>
        <h1>图片id:{{this.$route.params.classid}}</h1>
        <div class="container">
            <div class="nav_bar">
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-menu-item>
                        <img src="../assets/tx.jpg">
                    </el-menu-item>
                    <el-menu-item>
                        <h3>王小明</h3>
                    </el-menu-item>
                    <el-menu-item index="1" style="margin-left:40%">主页</el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/album">相册</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/blog">日志</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">留言</el-menu-item>
                    <el-menu-item index="5">访客</el-menu-item>
                    <el-menu-item index="6">评论</el-menu-item>
                </el-menu>
                <br>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="panel panel-success">
                        <div class="panel-heading">我的相册</div>
                        <div class="panel-body">
                            <div class="row">
                                <ul class="col-md-4" v-for="(t,index) in my_photo" :key="index">
                                    <li>
                                        <img :src="t.thumbnail">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-info">
                        <div class="panel-heading">相册分类</div>
                        <div class="panel-body">
                            <el-col :span="24">
                                <el-menu class="el-menu-vertical-demo">
                                    <el-submenu index="1">
                                        <template slot="title">相册列表</template>
                                        <el-submenu index="1-1">
                                            <template slot="title">山景</template>
                                            <el-menu-item index="1-1-1">
                                                <router-link to="/album">华山</router-link>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-2">
                                                <router-link to="/album">泰山</router-link>
                                            </el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="1-2">
                                            <template slot="title">海景</template>
                                            <el-menu-item index="1-2-1">
                                                <router-link to="/album">东海</router-link>
                                            </el-menu-item>
                                            <el-menu-item index="1-2-2">
                                                <router-link to="/album">南海</router-link>
                                            </el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="1-3">
                                            <template slot="title">遗迹</template>
                                            <el-menu-item index="1-3-1">
                                                <router-link to="/album">秦始皇</router-link>
                                            </el-menu-item>
                                            <el-menu-item index="1-3-2">
                                                <router-link to="/album">慈禧</router-link>
                                            </el-menu-item>
                                        </el-submenu>
                                    </el-submenu>
                                </el-menu>
                            </el-col>
                        </div>
                    </div>

                    <div class="panel panel-warning">
                        <div class="panel-heading">我的访客</div>
                        <div class="panel-body">
                            <div class="row">
                                <ul class="col-md-4" v-for="(guest,index) in my_guest" :key="index">
                                    <li>
                                        <div>
                                            <img :src="guest.userimg">
                                        </div>
                                        <div class="gdate">
                                            {{guest.guestdate}}
                                        </div>
                                        <div class="gnickname">
                                            {{guest.nickname}}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 左边显示 -->
                <div class="col-md-8">
                    <div class="panel panel-info">
                        <!-- 标题部分 头部信息 -->
                        <div class="panel-heading">
                            <h4 style="font-weight:600;margin-left:20px">{{my_photo_content.title}}</h4>
                            <p style="margin:0px 30px 0px;height:40px">
                                <span style="line-height:40px">{{my_photo_content.photodate}}</span>
                                <button @click="show_img = !show_img" class="pull-right btn btn-info">
                                    列表/高清查看
                                </button>
                            </p>
                        </div>
                        <!-- 主体部分 -->
                        <div class="panel-body">
                            <!-- 列表展示图片 -->
                            <div class="row" v-if="show_img">
                                <!-- 此处判断语句最好使用v-show 因为v-if在编辑器内报错 但是不影响结果 -->
                                <ul class="col-md-4" v-for="(p,index) in my_photo" :key="index" v-show="p.classid==my_photo_id">
                                    <li>
                                        <div>
                                            <img :src="p.thumbnail">
                                        </div>
                                        <div class="gdate">
                                            {{p.title}}
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <!-- 高清大图展示图片 -->
                            <div v-if="!show_img" class="item">
                                <el-carousel indicator-position="outside">
                                    <el-carousel-item v-for="(item,index) in imgs" :key="index">
                                        <div>
                                            <img :src="item.url" class="image" width="100%" height="100%">
                                            <div class="carousel-caption">
                                                <h3>{{item.title}}</h3>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </div>
                                        
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            
                        </div>

                        <!-- 相册图片的描述信息 -->
                        <div class="panel-body">
                            <p>游览普陀山一天时间足够了，如果考虑到还要来还愿，
                                那就没必要一次把所有的地方都去到，如果只是单纯的旅游，那就把最重要的地方看看就可以了，
                                普陀山并不是以景色著称的。普陀山上住宿餐饮价格都非常贵，住宿还好说，毕竟供不应求嘛，
                                尤其是节假日，想要提前预定都不一定有房间，餐饮更是离谱，一般都是岛外四五倍的价格。
                                所以建议大家像我们一样住在朱家尖，
                                莲花路是朱家尖镇的中心，比较繁华热闹，住宿餐饮都集中在那里，岛上游玩去庙里体验素斋就可以啦。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            my_photo: [],
            my_photo_content:"",
            my_guest: [],
            //将路由地址栏传过来的值赋值到这
            my_photo_id:0,
            //从json数据中获取数据并且存储到该数组中。
            imgs: [],
            //设置列表图片的展现和高清展示
            show_img:false
        };
    },
    created() {
        axios.get("../../static/tb_photo.json").then(data => {
            const result = data.data;
            const my_photos = result.map(item => ({
                title: item.title,
                photo: item.photo,
                thumbnail: item.thumbnail,
                photoid: item.photoid,
                photodate:item.photodate,
                classid:item.classid
            }));

            this.my_photo = my_photos;
            // console.log(this.my_photo);

            //获取地址栏传过来的id值
            const id = this.$route.params.classid * 1
            //根据路由传过来的id值判断得到的是哪一条数据
            this.my_photo_content=my_photos.find(detail => detail.classid===id)

            this.my_photo_id=this.$route.params.classid * 1

            // 尝试将json数据中的图片链接提取出来放到imgs中-------------------失败
            // this.imgs=this.imgs.push(this.my_photos.thumbnail)
            // console.log(this.imgs)


            //根据传过来的classid值判断是json数据中的某条数据
            const photo_imgs=my_photos.find(detail => detail.classid===id)
            console.log(photo_imgs)
            //获取到之后classid整条数据，下面进行提取出所需要的图片数组
            this.imgs=photo_imgs.photo
            console.log(this.imgs)
        });

        


        //请求访客信息
        axios.get('../../static/tb_guest.json')
        .then((data)=>{
            const fk = data.data
            const my_guests=fk.map(item=>({
                userimg:item.userimg,
                guestdate:item.guestdate,
                nickname:item.nickname
            }))
            this.my_guest=my_guests
            // console.log(this.my_guest)
        });

        
    }
		
};
</script>
<style scoped>
li {
    list-style: none;
}
.gdate{
    text-align: center;
    font-weight: 100;
    font-size: 12px;
    opacity: 0.7;
}
.gnickname{
    text-align: center;
}
.carousel-caption{
    background-color: #000000;
    opacity: 0.5;
    width: 100%;
    position: absolute;
    bottom: 0px!important;
    left: 0px!important;
    height: 80px;
    z-index: 999;
}
.carousel-caption p{
    padding-top: 10px;
}
.carousel-caption h3{
    margin: 0;
}
</style>
