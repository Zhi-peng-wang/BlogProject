<template>
    <div>
        <div class="container">
            <div class="nav_bar">
                <!-- <img src="holder.js/100px60" /> -->
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
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
        </div>
        <div class="container">
            <div class="liulan">
                <div class="row">
                    <ul class="col-md-3" v-for="(t,index) in album" :key="index" v-show="t.parentid===6|t.parentid===7|t.parentid===8">
                        <li>
                            <router-link :to="`/photo/${t.classid}`">
                                <div class="fj_img">
                                    <div>
                                        <img :src="t.url">
                                    </div>
                                </div>
                                <div class="fj_title">
                                    <h4>{{t.classname}}</h4>
                                </div>
                                <div class="fj_content">
                                    <p>好咖啡要和朋友一起品尝，好“模板”也要和同样喜欢它的人一起分享。</p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-offset-4 col-md-4 ">
                    <el-pagination  layout="prev, pager, next" :total="1000"></el-pagination>
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
            activeIndex: "2",
            album: []
        };
    },
    created() {
        axios.get("../../static/tb_class.json").then(data => {
            console.log(data.data);
            const result = data.data;
            const albums = result.map(item => ({
                url: item.url,
                classname: item.classname,
                classid:item.classid,
                parentid:item.parentid
            }));
            // this.album=albums.find(detail => detail.photoid===2)
            this.album = albums;
            // console.log(this.album);
        });
    }
};
</script>
<style>
li {
    list-style: none;
}
.fj_img div{
    text-align: center;
}
.fj_title {
    border-bottom: 1px solid black;
}
.fj_title h4 {
    text-align: center;
    margin: 15px 0;
    font-weight: 600;
    opacity: 0.7;
}
.fj_content p {
    margin: 15px;
    font-size: 15px;
    opacity: 0.7;
}
a {
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}
</style>
