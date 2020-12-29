import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export let indexRoutes=[
  {
    path:"menu",
    name:"菜单",
    component:()=>import("../pages/menu/menu.vue")
  },
  {
    path:"role",
    name:"角色",
    component:()=>import("../pages/role/role.vue")
  },
  {
    path:"manage",
    name:"管理员管理",
    component:()=>import("../pages/manage/manage.vue")
  },
  {
    path:"cate",
    name:"商品分类",
    component:()=>import("../pages/cate/cate.vue")
  },
  {
    path:"specs",
    name:"商品规格",
    component:()=>import("../pages/specs/specs.vue")
  },
  {
    path:"goods",
    name:"商品管理",
    component:()=>import("../pages/goods/goods.vue")
  },
  {
    path:"member",
    name:"会员",
    component:()=>import("../pages/member/member.vue")
  },
  {
    path:"banner",
    name:"轮播图",
    component:()=>import("../pages/banner/banner.vue")
  },
  {
    path:"seckill",
    name:"秒杀",
    component:()=>import("../pages/seckill/seckill.vue")
  },
]

export default new Router({
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
