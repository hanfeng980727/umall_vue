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
      time:[time,"00:00:00"],
      dateTime:""
    };
  },
  methods: {
    //   时间点击事件
    dateTimes(time){
        this.user.begintime=time[0];
        this.user.endtime=time[1];
    },
    // 关闭弹窗
    cancel() {
      this.info.isshow = false;
    },
    // 清空
    empty() {},
    add() {}
  },
  mounted() {},
  computed: {}
};
</script>

<style>
</style>