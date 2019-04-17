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
export const register=(from_data)=>ajax('/api/register',from_data,"POST");

//9.在添加日志组件中得到分类，将其转换为select下拉菜单
export const getMyBlogTwoClass=(data)=>ajax('/api/getMyBlogTwoClass',data,"POST");

//10.添加日志接口  data是提交的相关数据    包含classid title content
export const addBlog=(data)=>ajax('/api/addBlog',data,"POST");

//11.获取我的所有日志 含有分类 日志名称
export const getAllClassBlog=(data)=>ajax('/api/getAllClassBlog',data);
