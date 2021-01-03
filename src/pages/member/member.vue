<template>
  <div class="box">
      <v-edit :info="info" ref="upd" @init="init"></v-edit>
      <v-list :list="list" @edit="edit"></v-list>
  </div>
</template>

<script>
import vEdit from "./components/edit.vue";
import vList from "./components/list.vue";
import {reqMemberlist} from "../../utils/http"
export default {
components:{
  vEdit,
  vList
},
data(){
  return{
    list:[],
    info:{
      isshow:false,
      isadd:true
    }
  }
},
methods:{
  init(){
    reqMemberlist().then(res=>{
      if(res.data.code===200){
        this.list=res.data.list
      }
    })
  },
  edit(uid){
    this.info.isshow=true;
    this.$refs.upd.getOne(uid);
  }
},
mounted(){
  this.init()
}
}
</script>

<style scoped>
.box{
  margin: 20px auto;
}
</style>