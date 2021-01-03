<template>
  <div>
    <!-- 注遗漏：未做补充添加以及删除的提示框 -->
    <el-dialog :title="info.flag?'菜单添加':'编辑信息'"  :visible.sync="info.isshow" @closed="cancle">
      <!-- 表单信息 -->

      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="user.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="i in list" :key="i.id" :label="i.title" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="user.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- {{user}} -->
        <el-form-item label="菜单图标" v-if="user.type===1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icon" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name+'-/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取 消</el-button>
        <el-button type="primary" @click="menuAdd" v-if="info.flag">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router";
import { reqMenuadd,reqMenuinfo,reqMenuedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  methods: {
    cancle() {
       if (!this.info.flag) {
        this.empty();
      }
      this.info.isshow = false;
    },
    menuAdd() {
      this.checkProps().then(()=>{
        reqMenuadd(this.user).then(res => {
        if (res.data.code == 200) {
          // 提示
          successalert(res.data.msg);
          // 关闭弹框
          this.cancle();
          //清空信息
          this.empty();
        //   刷新页面
        this.$emit("init")
        }
      });
      })
    },
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    getEdit(id){
        reqMenuinfo({id:id}).then(res=>{
           if(res.data.code==200){
                this.user = res.data.list;
            // 补一个id，有id才能修改
            this.user.id = id;
            }
        })
    },
    update(){
        this.checkProps().then(()=>{
          reqMenuedit(this.user).then(res=>{
            if(res.data.code==200){
                successalert(res.data.msg);
                this.cancle();
                this.empty();
                this.$emit("init")
            }
        })
        })
    },
    changePid(){
      if(this.user.pid==0){
        this.user.type=1;
      }else{
        this.user.type=2;
      }
    },
    checkProps(){
      return new Promise((resolve)=>{
        if(this.user.title==""){
          erroralert("请输入菜单名称");
          return;
        }
        if(this.user.pid==""){
          erroralert("请选择上级菜单");
          return;
        }
        if(this.user.type==1&&this.user.icon==""){
          erroralert("请选择菜单图标");
          return;
        }
        if(this.user.type!=1&&this.user.url===""){
          erroralert("请设置菜单地址");
          return;
        }
        resolve();
      })
    }
  },
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      //   icon
      icon: [
        "el-icon-video-camera",
        "el-icon-s-data",
        "el-icon-s-grid",
        "el-icon-share"
      ],
      indexRoutes: indexRoutes
    };
  }
};
</script>

<style>
</style>