<template>
  <div class="container">
    <div class="row">
      <ul class="col-md-3" v-for="(t,index) in photo" :key="index" v-show="t.parentid===6|t.parentid===7|t.parentid===8">
        <li>
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import  axios from 'axios'
    export default {
      data(){
        return{
          photo:[]
        }
      },
      created() {
        axios.get("../../static/tb_class.json")
          .then(response=>{
            // console.log(response)
            // console.log(response.data)
            const  result =response.data;
            console.log(this.photo);
            const a=result.map(item=>({
              url:item.url,
              classname: item.classname,
              parentid:item.parentid
            }));
            this.photo=a;
            console.log(this.photo);
          })
      }
    }
</script>

<style scoped>
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
</style>
