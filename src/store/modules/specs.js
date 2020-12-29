import { reqSpecscount, reqSpecslist } from "../../utils/http"
let state = {
    //列表
    list: [],
    //总数
    total: 0,
    //一页的数量
    size: 2,
    //当前的页码
    page: 1
}
let mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}

let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

let actions = {
    // 获取列表
    reqList(context, bool) {
        // 设置成变量主要是用于进行分页的判断，主要用在有二级联动的商品管理页，bool为true时获取全部，为false就分页
        let params = bool ? {} : { page: context.state.page, size: context.state.size };
        reqSpecslist(params).then(res => {
            if (res.data.code == 200) {
                // 当total变化时影响的是list的变化
                // 删除的最后一页的最后一条
                if (res.data.list.length == 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1);
                    context.dispatch("reqList");
                    return;
                }


                // 将字符串转为对象
                let list = res.data.list;
                list.forEach(item => {
                    return item.attrs = JSON.parse(item.attrs)
                });
                context.commit("changeList", list)
            }
        })
    },
    // 获取总条数
    reqTotal(context) {
        reqSpecscount().then(res => {
            if (res.data.code == 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },
    // 修改page
    changePage(context, num) {
        // 通过传参修改页码
        context.commit("changePage", num);
        // 修改页面，就要重新请求新的list
        context.dispatch("reqList");
    }

}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}