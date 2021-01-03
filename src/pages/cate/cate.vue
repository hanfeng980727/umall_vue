<template>
  <div class="box">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list  @edit="edit($event)"></v-list>
    <v-add :info="info"  ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";

export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      //2.弹框状态
      info: {
        isshow: false,
        //41.用来判断是添加还是编辑打开的摊弹框
        isadd:true
      },
      //20.初始化列表数据
      list: []
    };
  },
  methods: {
    //5.点了添加按钮
    willAdd() {
      this.info.isshow = true;
      //42.是添加
      this.info.isadd=true
    },
    //36.编辑触发
    edit(id){
      //弹框出现
      this.info.isshow=true;

      //43.是编辑
      this.info.isadd=false

      //触发add的getOne()
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.box{
  margin: 20px auto;
}
</style>