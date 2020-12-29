<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt />
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
          <el-button type="danger" @click="del(scope.row.id)">取消</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert, deletealert } from "../../../utils/alert";
import { reqBannerdelete} from "../../../utils/http"
export default {
props:["list"],
  methods:{
    edit(id){
      this.$emit("edit",id);
    },
        del(id) {
      deletealert()
        .then(() => {
          reqBannerdelete({ id: id }).then(res => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              //   刷新页面
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>