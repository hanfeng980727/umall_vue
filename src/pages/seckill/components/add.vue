<template>
  <div>
    <el-dialog :title="info.isadd?'添加分类':'编辑分类'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        {{user}}
        <p></p>
        {{dateTime}}
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="time"
            value-format="timestamp"
            @change="dateTimes(dateTime)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择分类--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondList">
            <el-option label="--请选择分类--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择商品--" value disabled></el-option>
            <el-option
              v-for="item in thirdGoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { mapGetters, mapActions } from "vuex";
import {
  reqCatelist,
  reqGoodslist,
  reqSeckadd,
  reqSeckinfo,
  reqSeckedit
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
// 时间戳
let date = new Date();
console.log(date, date.getTime());
var hour = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
console.log(hour, minutes, seconds);
function zero(val) {
  return val < 10 ? "0" + val : val;
}
let time = zero(hour) + ":" + zero(minutes) + ":" + zero(seconds);
console.log(time);
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      //   日期时间
      time: [time, "00:00:00"],
      dateTime: [],
      //   二级分类
      secondCateList: [],
      //   三级分类
      thirdGoodsList: []
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqList: "seckill/reqList"
    }),
    //   时间点击事件
    dateTimes(time) {
      this.user.begintime = time[0];
      this.user.endtime = time[1];
    },
    // 一级分类的二级联动事件
    changeFirstCateId() {
      // 首先清空二级分类
      this.user.second_cateid = "";
      this.getSecondList();
    },
    // 二级事件的触发条件
    getSecondList() {
      reqCatelist({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSecondList() {
      // 清空商品编号
      this.user.goodsid = "";
      this.getThirdList();
    },

    // 三级事件触发条件
    getThirdList() {
      reqGoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        if (res.data.code == 200) {
          this.thirdGoodsList = res.data.list;
        }
      });
    },

    // 关闭弹窗
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      //   日期时间
      (this.time = [time, "00:00:00"]),
        (this.dateTime = ""),
        //   二级分类
        (this.secondCateList = []),
        //   三级分类
        (this.thirdGoodsList = []);
    },
    // 添加
    add() {
      reqSeckadd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          // 关弹框
          this.cancel();
          // 清数据
          this.empty();
          // 刷新页面
          this.reqList();
        }
      });
    },
    // 编辑
    getOne(id) {
      reqSeckinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 获取时间
          this.dateTime = [this.user.begintime, this.user.endtime];
          //   重新获取二级分类和三级商品
          this.getSecondList();
          this.getThirdList();
          // 补id
          this.user.id = id;
        }
      });
    },
    // 修改
    update() {
      reqSeckedit(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    }
  },
  mounted() {
    //   this.getThirdList();
    this.reqCateList();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      list: "seckill/list"
    })
  }
};
</script>

<style>
</style>