// 登录界面，要从仓库中存取数据，可以方便组件的取值。所以需要准备同步本地存储和状态层
export let state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}

export let mutations={
    changeUserInfo(state,obj){
        state.userInfo=obj;
        // 同时进行本地存储,加一个判断如果obj中有值就是获取，
        // 没有值就是删除
        if(obj.username){
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }
        else{
            sessionStorage.removeItem("userInfo");
        }
    }
}

export let getters={
    userInfo(state){
        return state.userInfo;
    }
}