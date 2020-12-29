<template>
  <div>
    <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="rolename" label="所属角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁止</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 一、原来的静态步骤，让分页和表格连接起来，通过slice和数学运算将其实现分页
    设计的为静态，无法根据数据实时更新而渲染页面-->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      @current-change="handleCurrentChange"
      :current-page="page"
      :total="info.total"
    ></el-pagination>-->
  </div>
</template>

<script>
import { reqUserdelete } from "../../../utils/http";
import { successalert, deletealert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      /*      二、初始化数据 
      分页,初始化数据
      page: 1,
      size: 2
      total: this.info.total */
    };
  },
  methods: {
    /*  三、通过点击跳转分页
    handleCurrentChange: function(page) {
      this.page = page;
      console.log(this.page); //点击第几页
    }, */
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除
    del(uid) {
      deletealert()
        .then(() => {
          reqUserdelete({ uid: uid }).then(res => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>