import { reqSecklist } from "../../utils/http"

let state = {
    list: []
}
let mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
let getters = {
    list(state) {
        return state.list
    }
}
let actions = {
    reqList(context) {
        // 发请求
        reqSecklist().then(res => {
            if (res.data.code == 200) {
                let list = res.data.list;
                context.commit("changeList", list)
            }
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}