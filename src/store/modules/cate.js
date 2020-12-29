import {reqCatelist} from "../../utils/http"
// 1.搭了架子
let state={
    // 3.1 初始值
    list:[]
}
let mutations={
    //3.2 修改list
    changeList(state,arr){
        state.list=arr;
    }
}
let getters={
    // 3.3 导出list
    list(state){
        return state.list;
    }
}
let actions={
    // 3.4 处理list的逻辑
    reqList(context){
        //发请求 成功之后 修改
        reqCatelist({istree:true}).then(res=>{
            if(res.data.code==200){
                context.commit("changeList",res.data.list)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    //命名空间
    namespaced:true
}