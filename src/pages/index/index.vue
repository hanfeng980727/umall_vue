<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <!-- 侧边导航栏 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#4b1e2f"
          text-color="#d8e3e7"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 用一个单独的块级元素包裹起来，因为v-for和v-if不能一起使用
              而且需要去判断菜单下是否有目录
          -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 如果只有一个菜单，但没有子级目录 -->
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <!-- 如果有菜单也有目录的时候 -->
            <el-submenu v-if="item.children" :index="item.id+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <!-- 这是目录 -->
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
          <!--    
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> 
          -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <div id="qian"></div>
          <div>
             <!-- 当登录进来以后，需要从状态层获取用户信息 -->
          <strong>欢迎您，{{userInfo.username}}</strong>
          <!-- 给退出登录绑定事件，当退出的时候，将状态层的obj变为空，当为空的时候也会将存储的数据删除
           -->
          <el-button type="warning" @click="exit">退出登录</el-button>
          </div>
         
          
        </el-header>
        <el-main>
          <!-- 内容 -->
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  // 获取用户登录信息
  computed: {
    ...mapGetters({
      // 数据在sessionStore中有存储
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),
    //退出登录
    exit(){
      // 给状态层传一个空信息
      this.changeUser({});
      // 然后返回到登录页面
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
.index {
  width: 100vw;
  height: 100vh;
}
.el-aside {
  height: 100vh;
  background: #4b1e2f;
}
.el-header {
  background-color: #3b818c;
  
  overflow: hidden;
  display: flex;
}
.el-header strong{
  font: 24px/60px "微软雅黑";
  flex: 1;
}
#qian{
  width: 100px;
}
</style>