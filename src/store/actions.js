// 定义一个状态层的方法，用于获取登录的用户信息
export let actions={
    changeUser(context,obj){
        context.commit("changeUserInfo",obj)
    }
}