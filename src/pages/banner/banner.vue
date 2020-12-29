<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" ref="add" @init="init"></v-add>
    <v-list :list="list" @edit="edit" @init="init"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import {reqBannerlist} from "../../utils/http"
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
      },
      list:[]
    }
  },
  methods:{
    willAdd(){
      this.info.isshow=true;
      this.info.isadd=true;
    },
    init(){
      reqBannerlist().then(res=>{
        if(res.data.code===200){
          this.list=res.data.list
        }
      })
    },
    edit(id){
      this.info.isshow=true;
      this.info.isadd=false;
      this.$refs.add.getOne(id);
    }
  },
  mounted(){
    this.init()
  }

}
</script>

<style>

</style>