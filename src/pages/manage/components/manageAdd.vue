<template>
  <div>
    <el-dialog
      :title="info.change?'添加':'编辑'"
      :visible.sync="info.isshow"
      width="30%"
      @closed="cancle"
    >
      <!-- 内容 -->

      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- v-for的数据 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >{{item.rolename}}</el-option>
          </el-select>
        </el-form-item>
        <!-- {{user}} -->
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <!-- 内容结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="manageAdd()" v-if="info.change">添加</el-button>
        <el-button type="primary" @click="manageUpdate()" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { successalert, erroralert } from "../../../utils/alert";
import {
  reqRolelist,
  reqUseradd,
  reqUserinfo,
  reqUseredit
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: 0,
        username: "",
        password: "",
        status: 1
      },
      list: []
    };
  },
  methods: {
    cancle() {
      //45.编辑清空数据
      if (!this.info.change) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 添加
    manageAdd() {
      this.checkProps().then(()=>{
        reqUseradd(this.user).then(res => {
        if (res.data.code === 200) {
          successalert(res.data.msg);
          // 然后关闭弹窗
          this.cancle();
          //   清空
          this.empty();
          // 重新渲染页面
          this.$emit("init");
        }
      });
      })
    },
    // 清空
    empty() {
      this.user = {
        roleid: 0,
        username: "",
        password: "",
        status: 1
      };
    },
    // 编辑
    addEdit(uid) {
      reqUserinfo({ uid: uid }).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          // 补uid，其实我也不清楚赋值的时候有没有自动加上，预防一手
          // this.user.uid = uid;
          // 如果不去进行密码的修改，便不会进行修改
          this.user.password = "";
        }
      });
    },
    // 修改值
    manageUpdate() {
      this.checkProps().then(() => {
        reqUseredit(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.cancle();
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.roleid === "") {
          erroralert("所属角色不能为空");
          return;
        }

        if (this.user.username === "") {
          erroralert("用户名不能为空");
          return;
        }
        if (this.user.password === "") {
          erroralert("密码不能为空");
          return;
        }

        resolve();
      });
    }
  },
  mounted() {
    reqRolelist().then(res => {
      if (res.data.code === 200) {
        //   let obj = res.data.list;
        this.list = res.data.list;
      }
    });
  }
};
</script>

<style>
</style>