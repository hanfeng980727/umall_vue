<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoledelete } from "../../../utils/http";
import { successalert, deletealert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    del(id) {
      deletealert()
        .then(() => {
          reqRoledelete({ id: id }).then(res => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              //   刷新页面
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
    edit(id) {
      this.$emit("edit", id);
    }
  }
};
</script>

<style>
</style>