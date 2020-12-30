<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update" v-if="user.password">修 改</el-button>
        <el-button type="primary" @click="update" disabled v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqMemberinfo,reqMemberedit} from "../../../utils/http";
import {successalert} from "../../../utils/alert"
export default {
  props: ["info"],
  data() {
    return {
      user: {
        phone: "",
        password: "",
        nickname: "",
        status: 1
      }
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        phone: "",
        password: "",
        nickname: "",
        status: 1
      };
    },
    getOne(uid){
      reqMemberinfo({uid:uid}).then(res=>{
        if(res.data.code===200){
          this.user = res.data.list;
          this.user.uid=uid;
          this.user.password="";
        }
      })
    },
    update(){
      reqMemberedit(this.user).then(res=>{
        if(res.data.code===200){
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      })
    }
  }
};
</script>

<style>
</style>