import axios from 'axios'

export function getBlog(data){
    axios.get('../../static/tb_blog.json')
    .then(res=>{
        console.log(res.data)
    })
}