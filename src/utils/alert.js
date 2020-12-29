import Vue from "vue";
let vm =new Vue();

// 如果成功态
export let successalert =(msg) =>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}

// 如果失败了
export let erroralert =(msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
}

// 删除的提示框
export let deletealert=()=>{
  return vm.$confirm("你确定要删除吗?", "删除", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning"
  })
}