<template>
  <div class="box">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" @init="init" ref="manageAdd"></v-add>
    <v-list :list="list" :info="info" @edit="edit($event)" @init="init"></v-list>

    <!-- 一、分页
    prev表示上一页，
    next为下一页，
    pager表示页码列表
    total表示总条目数，默认一页10条
    page-size 每一页的数量
    current-change	currentPage 改变时会触发
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import vAdd from "./components/manageAdd";
import vList from "./components/manageList";
import { reqUsercount, reqUserlist } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isshow: false,
        /*  静态：
        四、此为最多能存储的信息数
        total: 50, */
        change: true
      },
      list: [],
      // 二、初始值
      //一页的数量
      pageSize: 2,
      //总数
      total: 0,
      //当前页面
      page: 1
    };
  },
  methods: {
    // 三、请求总数
    getTotal() {
      reqUsercount().then(res => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },
    getList() {
      // size是查询的个数，page是从第几页开始
      reqUserlist({ page: this.page, size: this.pageSize }).then(res => {
        if (res.data.code === 200) {
          /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if (res.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }
          this.list = res.data.list;
        }
      });
    },
    init() {
      //四、获取总数
      this.getTotal();

      //获取列表
      this.getList();
    },
    // 修改了页码
    changePage(e) {
      this.page = e;
      // 再次取list
      this.getList();
    },

    willAdd() {
      this.info.isshow = true;
      this.info.change = true;
    },
    // 传值编辑
    edit(uid) {
      this.info.isshow = true;
      this.info.change = false;
      this.$refs.manageAdd.addEdit(uid);
    }
  },
  mounted() {
    /*     reqUsercount().then(res => {
      if (res.data.code === 200) {
        this.info.total = res.data.list[0].total;
      }
    }); */
    this.init();
  }
};
</script>

<style scoped>
.box {
  margin: 20px auto;
}
</style>