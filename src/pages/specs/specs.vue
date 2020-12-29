<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <v-add :info="info" ref="add"></v-add>
      <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import {reqSpecslist,reqSpecscount} from "../../utils/http"
export default {
components:{
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
  this.info.isshow=true;
  this.info.isadd=true;
},
edit(id){
  this.info.isshow=true;
  this.info.isadd=false;
  this.$refs.add.getOne(id);
}
},
mounted(){

}
}
</script>

<style>

</style>