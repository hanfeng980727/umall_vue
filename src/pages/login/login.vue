<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="ipt">
        <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
      </div>
      <div class="ipt">
        <el-input v-model="user.password" placeholder="请输入密码" show-password clearable></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUserlogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录
    login() {
      this.init();
    },
    init() {
      reqUserlogin({
        username: this.user.username,
        password: this.user.password
      }).then(res => {
        if (res.data.code == 200) {
          this.$router.push("/");
        }
        // 如果登录错误提示报错信息

      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>