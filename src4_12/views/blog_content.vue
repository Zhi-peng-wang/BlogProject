<template>
    <div>
        <div class="jumbotron">
			<h2>{{this.blog_content.title}}内容:</h2><br>
			<p>{{this.blog_content.content}}</p><br>

            <hr>
            <div class="panel panel-info">
                <div class="panel-heading">
                    日志评论
                </div>
                <div class="panel-body" style="background:#d6e9c6;" v-show="isCommnet">
                    <div class="row">
                        <div class="col-md-2" style="width:80px;height:80px">
                            <img src="holder.js/50x50" style="margin-top:15px">
                        </div>
                        <div class="col-md-8">
                            <p style="float:left;font-size:12px">用户名:</p>
                            <p style="float:right;font-size:12px">{{blog_comment_id.commentdate}}</p>
                            <p style="clear:both;font-size:15px;margin-left:30px">{{blog_comment_id.content}}</p>
                        </div>
                    </div>
                </div>

                <div class="panel-body" style="background:#eee;"  v-show="isCommnet=!isCommnet">
                    <h3>当前没有评论请稍后再试</h3>
                </div>
            </div>

            <p v-if="this.blog_content.classid==9"><router-link to="/blog/ajax_base" type="button" class="btn  btn-info">返回日志列表</router-link></p>
            </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            //将所需要的数据存到blog_contents
            blog_contents: [],
            //日志的详情内容
            blog_content: "",
            //日志的评论内容
            blog_comment:[],
            //通过id值相同将数据存储
            blog_comment_id:[],
            //判断数据是否显示
            isCommnet:false
        }
    },
    created(){
      //拿到数据
      event.$on('toChangeTitle',  msg => {
        console.log("第一个组件信息：");
        console.log(msg);
        this.blogid_title=msg;
      });
        axios.get('../../static/tb_blog.json')
        .then((data)=>{
            // console.log(data.data)
            //选取想要的数据
            const result = data.data
            const blog_contents = result.map(item => ({
                blogid: item.blogid,
                content: item.content,
                title:item.title,
                classid:item.classid
            }))
            this.blog_contents = blog_contents
            // console.log(blog_contents)

            //获取地址栏传过来的id值
            const id = this.$route.params.id * 1

            //查找blog_contents数组中id值与地址栏值相等的数据，该数据为日志内容的详情
            this.blog_content = blog_contents.find(detail => detail.blogid === id)
            // console.log(this.blog_content)
        })

        //获取评论内容
        axios.get('../../static/tb_comment.json')
        .then((data)=>{
            const comment_result=data.data
            // console.log(comment_result)
            //提取需要的值，然后赋值到日志评论数组中
            const blog_comments=comment_result.map(item=>({
                commentdate:item.commentdate,
                id:item.id,
                content:item.content,
                fromuser:item.fromuser
            }))

            this.blog_comment=blog_comments
            // console.log(this.blog_comment)

            //获取地址栏传过来的日志id值，将这个id值与评论表中的id值比对，相等说明是该片日志的评论
            const blog_id=this.$route.params.id*1


            blog_comments.find(detail=>{
                if(detail.id===blog_id){
                   return this.isCommnet=true
                }else{
                   return this.isCommnet=false
                }
            })
            console.log(this.isCommnet)
            //上面获取到地址栏传过来的id值，将此id值与blog_comments中的id值比对,比对成功获取数据
            this.blog_comment_id=blog_comments.find(detail=>detail.id===blog_id)
            console.log(this.blog_comment_id)
        })
    }
}
</script>
<style>
</style>
