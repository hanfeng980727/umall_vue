<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
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

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { reqSpecsdelete } from "../../../utils/http";
import { successalert,deletealert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
      changePage: "specs/changePage"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      deletealert()
        .then(() => {
          reqSpecsdelete({ id: id }).then(res => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              this.reqList();
              this.reqTotal();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    // 渲染页面
    this.reqList();
    // 获取总数
    this.reqTotal();
  }
};
</script>

  <style scoped>
</style>