<template>
  <div>
    <el-dialog :title="info.ischange?'菜单添加':'编辑信息'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 数据 -->
      {{user}}
      <!-- {{list}} -->
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="user.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1, 2]"
            :default-checked-keys="[4]"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <!-- 数据end -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="roleAdd()" v-if="info.ischange">添加</el-button>
        <el-button type="primary" @click="roleUpdate()" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleadd,
  reqMenulist,
  reqRoleinfo,
  reqRoleedit
} from "../../../utils/http.js";
import { successalert, erroralert } from "../../../utils/alert";
import {mapGetters,mapActions} from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title"
      },
      user: {
        rolename: "",
        menus: [],
        status: 1
      },
      list: []
    };
  },
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    roleAdd() {
      //   getCheckedKeys若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组(符合接口要求)
      console.log(this.$refs.tree.getCheckedKeys());
      // 之后把值传给menus，还得转字符串
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.checkProps().then(() => {
        reqRoleadd(this.user).then(res => {
          if (res.data.code === 200) {
            successalert(res.data.msg);
            this.$emit("init");
            this.cancel();
            this.empty();
          }
        });
      });
    },
    // 清空数据
    empty() {
      this.user = {
        rolename: "",
        menus: [],
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 关闭弹窗
    cancel() {
      if (!this.info.ischange) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // ref调用
    addEdit(id) {
      // 获取一条数据因为要添加修改操作，所以要补id
      reqRoleinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          // 将值赋值给user
          this.user = res.data.list;
          // 补id
          this.user.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    // 角色修改
    roleUpdate() {
      //先取出树形控件的数据给menus，再发请求
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.checkProps().then(() => {
        reqRoleedit(this.user).then(res => {
          if (res.data.code === 200) {
            successalert(res.data.msg);

            // 如果修改的是当前的角色，就要自动退出登录，重新登陆
            if(this.user.id==this.userInfo.roleid){
              // 首先关闭用户信息
              this.changeUser({});
              this.$router.push("/login");
              return;
            }

            // 修改成功关闭弹窗
            this.cancel();
            // 清除数据
            this.empty();
            // 刷新页面
            this.$emit("init");
          }
        });
      });
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.rolename === "") {
          erroralert("请输入角色名称");
          return;
        }
        if (this.$refs.tree.getCheckedKeys().length===0) {
          erroralert("请选择角色权限");
          return;
        }
        resolve();
      });
    }
  },
  mounted() {
    reqMenulist().then(res => {
      if (res.data.code === 200) {
        this.list = res.data.list;
      }
    });
  }
};
</script>

<style>
</style>