<template>
  <div id="main"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    })
  },
  mounted() {
    // 发请求
    this.reqList();
  },
  watch: {
    list: {
      // 深度监听
      handler() {
       if(this.list.length>0){
          // 画图
        var myChart = require("echarts").init(document.getElementById("main"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "分类数量"
          },
          tooltip: {},
          legend: {
            data: ["分类数量"]
          },
          color:['#2486b9',
            '#e0c8d1'
          ],
          xAxis: {
             type: 'category',
            data: this.list.map(item => item.catename)
          },
          yAxis: {},
          // series:数据
          series: [
            {
              name: "分类数量",
              type: "bar",
              data: this.list.map(item =>
                item.children ? item.children.length : 0
              )
            }
          ]
        };
        myChart.setOption(option);
       }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#main {
  width: 70%;
  height: 500px;
  border: 1px solid orange;
  margin: 20px auto;
}
</style>