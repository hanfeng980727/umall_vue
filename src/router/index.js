import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 需要用到状态层的信息
import store from "../store/index"

// 因为根据用户的权限不同，所以需要给路由设置路由独享守卫，二级路由比较多，封装一个函数
// 调用的变量值 path，next,to,from
function limitEnter(path,next){
  // 进行判断，进行查找，看用户有没有这个路径，next是来自路由独享守卫的下一步，需要谁调谁
  if(store.state.userInfo.menus_url.includes(path)){
    next();
  }else{
    next("/")
  }
}

export let indexRoutes=[
  {
    path:"menu",
    name:"菜单",
    component:()=>import("../pages/menu/menu.vue"),
    beforeEnter(to,from,next){
      limitEnter("/menu",next)
     }
  },
  {
    path:"role",
    name:"角色",
    component:()=>import("../pages/role/role.vue"),
    beforeEnter(to,from,next){
      limitEnter("/role",next)
     }
  },
  {
    path:"manage",
    name:"管理员管理",
    component:()=>import("../pages/manage/manage.vue"),
    beforeEnter(to,from,next){
      limitEnter("/manage",next)
     }
  },
  {
    path:"cate",
    name:"商品分类",
    component:()=>import("../pages/cate/cate.vue"),
    beforeEnter(to,from,next){
      limitEnter("/cate",next)
     }
  },
  {
    path:"specs",
    name:"商品规格",
    component:()=>import("../pages/specs/specs.vue"),
    beforeEnter(to,from,next){
      limitEnter("/specs",next)
     }
  },
  {
    path:"goods",
    name:"商品管理",
    component:()=>import("../pages/goods/goods.vue"),
    beforeEnter(to,from,next){
      limitEnter("/goods",next)
     }
  },
  {
    path:"member",
    name:"会员",
    component:()=>import("../pages/member/member.vue"),
    beforeEnter(to,from,next){
      limitEnter("/member",next)
     }
  },
  {
    path:"banner",
    name:"轮播图",
    component:()=>import("../pages/banner/banner.vue"),
    beforeEnter(to,from,next){
      limitEnter("/banner",next)
     }
  },
  {
    path:"seckill",
    name:"秒杀",
    component:()=>import("../pages/seckill/seckill.vue"),
    beforeEnter(to,from,next){
      limitEnter("/seckill",next)
     }
  },
]

let router= new Router({
  routes: [
    {
      path:"/login",
      name:"登录",
      component:()=>import("../pages/login/login.vue")
    },
    {
     path:"/",
      //  name:"主页 ",
     component:()=>import("../pages/index/index.vue"),
     children:[
      {
        path:"",
        // name:"首页",
        component:()=>import("../pages/home/home.vue")
      },
      ...indexRoutes
     ]
   },
   {
     path:"*",
     redirect:"/login"
   }
  ]
})

// 制作一个登陆拦截
router.beforeEach((to,from,next)=>{
  // 如果前往的是登陆页，不做拦截
  if(to.path==="/login"){
    next();
    return;
  }
  // 如果不是登录页，判断是否有用户信息
  // 用户信息只有登录以后才会给状态层存储所以获取其中的任意一个值
  if(store.state.userInfo.username){
    next();
    return;
  }
  // 如果判断都不成立,前往登录页
  next("/login");
  
})

export default router