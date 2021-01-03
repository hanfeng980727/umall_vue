<template>
  <div>
    <el-dialog :title="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <div>user:{{user}}</div>
        <div>attrsArr:{{attrsArr}}</div>
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { reqSpecsadd, reqSpecsinfo, reqSpecsedit } from "../../../utils/http";
import { successalert,erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: [],
        status: 1
      },
      attrsArr: [{ value: "" }]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:"specs/reqTotal"
    }),
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //新增属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    //删除属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    //清空
    empty() {
      (this.user = {
        specsname: "",
        attrs: "[]",
        status: 1
      }),
        this.attrsArr = [{ value: "" }];
    },
    //点了添加
    add() {
      // 首先要转换成字符串attrs是字符串格式
      this.user.attrs = JSON.stringify(this.attrsArr.map(item => item.value));
      // console.log(this.user.attrs);
      // 进行添加操作
     this.checkProps().then(()=>{
        reqSpecsadd(this.user).then(res => {
        if (res.data.code == 200) {
          // console.log(1);
          // 关闭弹窗
          this.cancel();
          // 清除数据
          this.empty();
          successalert(res.data.msg);
          // 刷新
          this.reqList();
          this.reqTotal();
        }
      });
     })
    },
    //获取一条数据
    getOne(id) {
      reqSpecsinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          // 要展示出来的是数组
          this.user.attrs=JSON.parse(this.user.attrs)
          this.attrsArr = this.user.attrs.map(item => ({ value: item }));
        }
      });
    },
    //修改
    update() {
      // 要修改的值需要传递给后端
      this.user.attrs=JSON.stringify(this.attrsArr.map(item=>{
        return item.value
      }));
     this.checkProps().then(()=>{
        // 发送请求
      reqSpecsedit(this.user).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg);
          this.empty();
          this.cancel();
          // 刷新
          this.reqList();
        }
      })
     })
    },
    // 封装一个验证
    checkProps() {
        // 如果需要的话需要对每一个规格属性都要进行验证,利用some迭代
        // let arrs = this.attrsArr.some((item)=>item.value===""
        // )
        // console.log(arrs);
        

      return new Promise((resolve, reject) => {

        if (this.user.specsname === "") {
          erroralert("规格名称不能为空");
          return;
        }

        if (this.attrsArr.some((item)=>item.value===""
        )) {
          erroralert("请选择规格属性");
          return;
        }

        resolve();
      });
    }
  },
  mounted() {
    // this.reqList()
    // console.log(this.attrsArr);
  }
};
</script>

<style scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>