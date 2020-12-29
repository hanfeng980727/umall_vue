<template>
  <div>
    <el-dialog :title="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel" @opened="opened">
      <el-form :model="user">
        <div>user:{{user}}</div>
        <el-form-item label="一级分类" label-width="100px">
          <!-- 给一级分类绑定事件触发二级,使用唯一键，当改变时清除二级分类数据 -->
          <el-select v-model="user.first_cateid" @change="firstId">
            <el-option value label="--请选择--" disabled></el-option>
            <!-- 少一个遍历 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option value label="--请选择--" disabled></el-option>
            <!-- 少一个遍历 -->
            <el-option
              v-for="item in cateList_Second"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <!-- 通过规格去获取子集的规格属性 -->
          <el-select v-model="user.specsid" @change="specsId">
            <el-option value label="--请选择--" disabled></el-option>
            <!-- 少一个遍历 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <!-- 因为返回的一个数组总是在报错，所以需要加一个multiple -->
          <el-select v-model="user.specsattr" multiple>
            <el-option value label="--请选择--" disabled></el-option>
            <!-- 少一个遍历 -->
            <el-option v-for="item in specsList_attr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
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
  import E from "wangeditor"
import { mapActions, mapGetters } from "vuex";
import {
  reqGoodsadd,
  reqGoodsinfo,
  reqGoodsedit,
  reqCatelist
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      // 二级分类是基于一级分类基础上获取的
      // 是一级分类的子数组集合
      //通过对一级分类的操作实现选项卡获取二级
      cateList_Second: [],
      // 获取商品规格下的商品属性
      specsList_attr: [],
      //   在设置上传图片
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      // 导出商品分类的list
      cateList: "cate/list",
      // 导出商品规格
      specsList: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      // 首先获取一级列表项
      reqcatelist: "cate/reqList",
      // 获取商品规格
      reqspecslist: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal"
    }),
    // 通过一级分类获取二级分类
    firstId() {
      // 清空二级分类的数据
      this.user.second_cateid = "";
      // 获取二级分类的数据
      this.secondList();
    },
    secondList() {
      // 要获取的是pid 需要重新调用catelist
      reqCatelist({ pid: this.user.first_cateid }).then(res => {
        // 获取到了子集下的二级分类
        if (res.data.code === 200) {
          this.cateList_Second = res.data.list;
        }
      });
    },
    specsId() {
      this.user.specsattr = [];
      // 获取子集的数据
      this.specs_child();
    },
    specs_child() {
      // 当子集和父级id相同时
      let obj = this.specsList.find(item => item.id == this.user.specsid); //找到了，返回哪条数据，没找到，返回undefined
      this.specsList_attr = obj ? obj.attrs : [];
    },
    // 上传文件
    changeImg(ev) {
      let file = ev.target.files[0];
      // 进行判断
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      let extname = file.name.slice(file.name.lastIndexOf("."));
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some(item => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      (this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      }),
        // 二级分类是基于一级分类基础上获取的
        // 是一级分类的子数组集合
        //通过对一级分类的操作实现选项卡获取二级
        (this.cateList_Second = []),
        // 获取商品规格下的商品属性
        (this.specsList_attr = []),
        //   在设置上传图片
        (this.imgUrl = "");
    },
    //点了添加
    add() {

        //取出富文本编辑器的内容，赋值给user
      this.user.description = this.editor.txt.html();

      // 因为里面有对象文件所以需要进行拷贝
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };
      // 发送请求
      reqGoodsadd(data).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.empty();
          this.cancel();
          // 刷新页面
          this.reqList();
          this.reqTotal();
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqGoodsinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 此时要重新获取二级分类否则没有二级
          this.secondList();
          // 展示图片,在网址上展示需要http路径
          this.imgUrl = this.$pre + this.user.img;
          // 同理获取子集的商品规格属性
          this.specs_child();
          // 还要将其从字符串转成对象，才能在页面中显示
          this.user.specsattr = JSON.parse(this.user.specsattr);
          //   之后补id,update修改中需要id
          this.user.id=id;

          //将user.desctiption赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    //修改
    update() {
        //取出富文本编辑器的内容，赋值给user
      this.user.description = this.editor.txt.html();

        // 再将specsattr转成字符串
        let data={
            ...this.user,
            specsattr:JSON.stringify(this.user.specsattr)
        }
        // 发送请求
        reqGoodsedit(data).then(res=>{
            if(res.data.code==200){
                successalert(res.data.msg);
                this.cancel();
                this.empty();
                this.reqList();
            }
        })
    },
    //创建富文本编辑器
    opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.user.description);
    }
  },
  mounted() {
    //   商品分类的数据，可以在加一个判断
    if(this.cateList.length==0){
    this.reqcatelist();
    }
    // 商品规格的数据,在vuex中封装了一个bool类型，当为true获取所有，false为当前页的
    this.reqspecslist(true);
  }
};
</script>

<style scoped>
/* 原生js的样式 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>