<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
        </el-form-item>

        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUserlogin } from "../../utils/http";
import {mapActions,mapGetters} from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      // 给登录界面定义规则
      rules:{
        // 用户名验证规则
        username:[
          {
            required:true,message:"请输入用户名", trigger:"blur"
          },
          {
            required:true,min:2,max:12,message:"用户名的长度在2-12个字符之间",trigger:"blur"
          }
        ],
        // 密码验证规则
        password:[
           {
            required:true,message:"请输入密码", trigger:"blur"
          },
          {
            required:true,min:2,max:12,message:"密码的长度在2-12个字符之间",trigger:"blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      // 获取状态层的方法
      changeUser:"changeUser"
    }),
    //登录
    login() {
      reqUserlogin(this.user).then(res=>{
        // 当获取成功以后
        if(res.data.code==200){
          // 将用户的信息传递给状态层
          this.changeUser(res.data.list);
          // 然后跳转页面
          this.$router.push("/")
        }
      })
    },
   
  },
  mounted() {}
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.ipt {
  margin: 10px;
}
.center {
  text-align: center;
}
</style>