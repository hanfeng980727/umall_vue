<template>
  <div class="box">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  components: {
    vAdd,
    vList
  },
  data(){
    return{
      info:{
        isshow:false,
        isadd:true
      }
    }
  },
  methods:{
    willAdd(){
      this.info.isadd=true;
      this.info.isshow=true;
    },
    edit(id){
      this.info.isshow=true;
      this.info.isadd=false;
      this.$refs.add.getOne(id);
    }
  },
  mounted(){}
};
</script>

<style scoped>
.box{
  margin: 20px auto;
}
</style>