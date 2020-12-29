<template>
  <div>
      seckill
      <el-button type="primary" @click="willAdd">添加</el-button>
      <v-list></v-list>
      <v-add :info="info"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  components:{
    vAdd,vList
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
      this.info.isshow=true;
      this.info.isadd=true;
    }
  }

}
</script>

<style>

</style>