/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api';

//1.用户登录接口
//          自定义接口名称和后台保持一致     接口名称
export const login=(data) => ajax('/api/login' ,data,"POST");

//2.获取分类名称
export const getClass=(userid)=>ajax('/api/getClass',userid,"POST");

//3.获取日志的标题
// export const getClassBlog=(classid)=>ajax('/api/getClassBlog',classid,"POST");
export const getClassBlog=(classid)=>ajax('/api/getClassBlog',classid);

//4.获取日志的内容
export const getBlog=(blogid)=>ajax('/api/getBlog',blogid,"POST");

//5.获取相册二级分类
export const getPhotoClass = (userid)=>ajax('/api/getPhotoClass',userid,"POST");

//6.通过classid来获取相应的相册分类下的所有图片信息
export const getClassPhoto=(classid)=>ajax('/api/getClassPhoto',classid,"POST");

//7.获取个人资料
export const getUser=(userid)=>ajax('/api/getUser',userid,"POST");

//8.修改个人信息
export const addEdit=(from_data)=>ajax('/api/addEdit',from_data,"POST");

//9.在添加日志组件中得到分类，将其转换为select下拉菜单
export const getMyBlogTwoClass=(data)=>ajax('/api/getMyBlogTwoClass',data,"POST");

//10.添加日志接口  data是提交的相关数据    包含classid title content
export const addBlog=(data)=>ajax('/api/addBlog',data,"POST");

//11.获取我的所有日志 含有分类 日志名称
export const getAllClassBlog=(data)=>ajax('/api/getAllClassBlog',data);

//12.通过blogid+-删除指定得日志
export const deleteBlog=(blogid)=>ajax('/api/deleteBlog',blogid,"POST");

//13.通过blogid批量删除日志
export const deleteAllBlog = (blogArray) => ajax('/api/deleteAllBlog',blogArray,"POST");

//14.通过blogid编辑相关日志
export const editBlog = (blogid) => ajax('/api/editBlog',blogid,"POST");

//15.获取相册内容和评论
export const getPhoto = (data)=>ajax('/api/getPhoto',data,"POST");

//16.添加评论 和回复
export const addComment = (data)=>ajax('/api/addComment',data,"POST");

//17.获取主页的个人日志
export const getNewBlog = (data)=>ajax('/api/getNewBlog',data,"POST");

//18.addClass 添加分类
export const addClass = (data)=>ajax('/api/addClass',data,"POST");

//19.deleteClass 删除分类
export const deleteClass =(data)=>ajax('/api/deleteClass',data,"POST");

//20.editClass 编辑分类
export const editClass =(data)=>ajax('/api/editClass',data,"POST");

//21.addGuest 添加分类的接口
export const addGuest = (data)=>ajax('/api/addGuest',data,"POST");

//22. getGuest获取访客的接口，自定义获取数量
export const getGuest =(data)=>ajax('/api/getGuest',data,"POST");

//23/删除评论 deleteComment
export const deleteComment =(data)=>ajax('/api/deleteComment',data,"POST");

//24.在相册里添加图片addPhoto
export const addPhoto =(data)=>ajax('/api/addPhoto',data,"POST");

//25.editPassword修改密码
export const editPassword =(data)=>ajax('/api/editPassword',data,"POST");

//26.删除相册下的图片deleteAllPhoto
export const deleteAllPhoto =(data)=>ajax('/api/deleteAllPhoto',data,"POST");










