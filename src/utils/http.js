// import { data } from "autoprefixer";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
// 调用了状态层
import store from "../store";
// 调用了路由
import router from "../router"

import { erroralert } from "./alert"

//开发环境使用 8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""

// 请求拦截
axios.interceptors.request.use(req=>{
    // 判断，只要不是登录页面就要设置请求头
    if(req.url!=baseUrl+"/api/userlogin"){
        // 用请求头解析token，解析拦截
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})


// 响应拦截
axios.interceptors.response.use(res => {
    console.group("本次请求的地址" + res.config.url)
    console.log(res);
    console.groupEnd()
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    if(!res.data.list){
        res.data.list=[];
    }

    // 如果token的掉线了
    if(res.data.msg==="登录已过期或访问权限受限"){
        // 对vuex的状态层的actions的进行操作，将用户信息清空,之后连带着sessionStore数据也会消失
        store.dispatch("changeUser",{});
        // 然后自动跳转到登录页面
        router.push("/login")
    }
    
    return res
})

/*--------------post（文件上传，参数转换）------------ */
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        // 这是将每一个对应的键的对用值进行参数的转换
        data.append(i,user[i])
    }
    // 返回
    return data
}



// ----------------这是菜单管理-------------
// 菜单添加
export let reqMenuadd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}
// 菜单列表
export let reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 菜单的删除
export let reqMenudelete = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 菜单的获取
export let reqMenuinfo = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: obj
    })
}
// 菜单修改 
// id是在获取的时候获取的id
export let reqMenuedit = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}
// -------------------菜单管理结束----------


// ---------------角色管理--------------
// 角色添加
export let reqRoleadd = (obj)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 角色列表
export let reqRolelist =()=>{
    return axios ({
        url:baseUrl +"/api/rolelist",
        method:"get"
    })
}
// 角色删除
export let reqRoledelete =(obj)=>{
    return axios ({
        url:baseUrl +"/api/roledelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 角色获取
export let reqRoleinfo =(obj)=>{
    return axios({
        url:baseUrl +"/api/roleinfo",
        method:"get",
        params:obj
    })
}
// 角色修改，记得补id
export let reqRoleedit=(obj)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ---------------角色管理结束--------------

// -----------------管理员管理----------
// 管理员添加
export let reqUseradd=(obj)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 管理员总数
export let reqUsercount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

// 管理员列表
export let reqUserlist=(obj)=>{
   return axios({
    url:baseUrl+"/api/userlist",
    method:"get",
    params:obj
   })
}

// 管理员获取
export let reqUserinfo=(obj)=>{
    return axios({
        url:baseUrl +"/api/userinfo",
        method:"get",
        params:obj
    })
}

// 管理员修改
export let reqUseredit=(obj)=>{
    return axios({
        url:baseUrl +"/api/useredit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 管理员删除
export let reqUserdelete=(obj)=>{
    return axios({
        url:baseUrl +"/api/userdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 管理员登录
export let reqUserlogin=(obj)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ----------------管理员管理end-----------

// ------------------商品分类管理---------
// 商品分类添加
export let reqCateadd=(obj)=>{
    return axios ({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:dataToFormData(obj)
    })
}
// 商品分类列表
export let reqCatelist=(obj)=>{
    return axios ({
        url:baseUrl +"/api/catelist",
        method:"get",
        params:obj
    })
}

// 商品分类获取
export let reqCateinfo=(obj)=>{
    return axios ({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:obj
    })
}

// 商品分类修改
export let reqCateedit=(obj)=>{
    return axios ({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(obj)
    })
}

// 商品分类删除
export let reqCatedelete=(obj)=>{
    return axios ({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify(obj)
    })
}


// -----------------商品分类管理end------

// -----------------商品规格管理-----
// 商品规格添加
export let reqSpecsadd=(obj)=>{
    return axios ({
        url:baseUrl +"/api/specsadd",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 商品规格总数(用于计算分页)
export let reqSpecscount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get",
        
    })
}

// 商品规格列表(分页)
export let reqSpecslist=(obj)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:obj
    })
}

// 商品规格获取
export let reqSpecsinfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:obj
    })
}
// 商品规格修改
export let reqSpecsedit=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 商品规格的删除
export let reqSpecsdelete=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

// -----------------商品规格管理end----

// -----------------会员管理---------
// 会员列表
export let reqMemberlist=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}
// 会员获取
export let reqMemberinfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:obj
    })
}
// 会员修改
export let reqMemberedit=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ------------------会员管理end----------


// -------------------轮播图管理--------
// 轮播图添加
export let reqBanneradd=(obj)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:dataToFormData(obj)
    })
}
// 轮播图列表
export let reqBannerlist=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get"
    })
}
// 轮播图获取
export let reqBannerinfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:obj
    })
}
// 轮播图修改
export let reqBanneredit=(obj)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFormData(obj)
    })
}
// 轮播图删除
export let reqBannerdelete=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
// -------------------轮播图管理end------


//--------------------商品管理------------
// 商品添加
export let reqGoodsadd=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:dataToFormData(obj)
    })
}

// 商品总数
export let reqGoodscount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get",
    })
}

// 商品列表
export let reqGoodslist=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:obj
    })
}

// 商品获取
export let reqGoodsinfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:obj
    })
}

// 商品修改
export let reqGoodsedit=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:dataToFormData(obj)
    })
}

// 商品删除
export let reqGoodsdelete=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ------------------商品管理end-------


/*-------------------限时秒杀start----------------- */

// 限时秒杀添加
export let reqSeckadd=(obj)=>{
    return axios({
        url:baseUrl +"/api/seckadd",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 限时秒杀列表
export let reqSecklist=()=>{
    return axios ({
        url:baseUrl+"/api/secklist",
        method:"get"
    })
}
// 限时秒杀获取
export let reqSeckinfo=(obj)=>{
    return axios ({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:obj
    })
}

// 限时秒杀修改
export let reqSeckedit=(obj)=>{
    return axios ({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 限时秒杀删除
export let reqSeckdelete=(obj)=>{
    return axios ({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

/*---------------------限时秒杀end------------------- */