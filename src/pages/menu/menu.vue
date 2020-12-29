<template>
  <div class="box">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" :list="list" @init="init" ref="menuAdd"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/menuAdd.vue";
import vList from "./components/menuList.vue";
import {reqMenulist} from "../../utils/http"
export default {
components:{
  vAdd,
  vList
},
data(){
  return {
    info:{
      isshow: false,
      flag:true
    },
    list:[]
  }
},
methods:{
  willAdd(){
    this.info.isshow=true;
    this.info.flag=true;
  },
  // 因为列表页会多次刷新,所以将其封装成一个函数
  init(){
    reqMenulist().then(res=>{
      if(res.data.code==200){
        this.list=res.data.list;
      }
    })
  },
  edit(id){
    // 打开弹窗
    this.info.isshow=true;
    this.info.flag=false;
    // 借助同一个父组件，两个无联系的子组件联系起来(list有id，add没有id)
    this.$refs.menuAdd.getEdit(id);
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