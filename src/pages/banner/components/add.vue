<template>
  <div>
    <el-dialog :title="info.isadd?'添加分类':'编辑分类'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->
      {{user}}
      <el-form :model="user">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { erroralert, successalert } from "../../../utils/alert";
import {
  reqBanneradd,
  reqBannerinfo,
  reqBanneredit
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  methods: {
    // 弹框消失
    cancel() {
         if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      this.user = {
        title: "",
        img: null,
        status: 1
      };
      this.imageUrl = "";
    },
    // 对图片进行处理
    changeImg(e) {
      // 传的这个值时change改变图片时触发的点击信息
      //   console.log(e);
      let file = e.raw;
      // 对上传图片的大小进行限制
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      // 将其生成为一个url地址
      this.imgUrl = URL.createObjectURL(file);
      //  之后赋值给user.img
      this.user.img = file;
    },
    // 添加
    add() {
      reqBanneradd(this.user).then(res => {
        if (res.data.code === 200) {
          // 成功的弹窗
          successalert(res.data.msg);
          // 消除弹窗
          this.cancel();
          // 清空数据
          this.empty();
          this.$emit("init");
        }
      });
    },
    // ref传值
    getOne(id){
        reqBannerinfo({id:id}).then(res=>{
            if(res.data.code===200){
                this.user = res.data.list;
                // 对图片的处理
                this.imgUrl=this.$pre+this.user.img;
                // 补id
                this.user.id=id;
            }
        })
    },
    // 修改
    update() {
        reqBanneredit(this.user).then(res=>{
            
            if(res.data.code===200){
                // 成功弹窗
                successalert(res.data.msg);
                // 弹框消失
                this.cancel();
                this.empty();
                this.$emit("init");
            }
        })
    }
  }
};
</script>

<style scoped >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>