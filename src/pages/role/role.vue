<template>
  <div class="box">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" ref="roleadd"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/roleadd.vue";
import vList from "./components/rolelist.vue";
import { reqRolelist } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isshow: false,
        ischange:true
      },
      list: []
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
       this.info.ischange=true;
    },
    init() {
      reqRolelist().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.ischange=false;
      this.$refs.roleadd.addEdit(id);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.box {
  margin: 20px auto;
}
</style>