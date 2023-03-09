<template>
  <div class="ketang">
    <div class="title">课堂</div>
    <hr />

    <!--    <el-checkbox-group :value="years" @input="handleYearChange">-->
    <!--      <el-checkbox-button v-for="item in allYears" :label="item" :key="item">{{ item }}</el-checkbox-button>-->
    <!--    </el-checkbox-group>-->

    <el-row style="margin-top: 15px">
      <el-checkbox-group :value="weeks" @input="handleWeekChange">
        <el-checkbox-button v-for="item in allWeeks" :label="item" :key="item">{{ item }}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>

    <el-row style="margin-top: 15px">
      <el-checkbox-group :value="days" @input="handleDayChange">
        <el-checkbox-button v-for="item in allDays" :label="item" :key="item">{{ item }}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>

    <!--    <el-row style="margin-top: 15px">-->
    <!--      <el-date-picker :value="date" @input="handleDatec" type="date" placeholder="日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>-->
    <!--      <el-button style="margin-left: 10px" @click="filterByDate">查询</el-button>-->
    <!--    </el-row>-->

    <div id="main-4" />

    <!--    <hr/>-->

    <!--    <el-button @click="addNewLine" style="margin-top: 15px">新增</el-button>-->
    <el-table :data="tableData" class="tbl1" @row-click="handleRowClick">
      <el-table-column label="任务日期" prop="task_day">
        <template scope="scope">
          <span>{{ scope.row.task_day }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" prop="task_no" width="80">
        <template scope="scope">
          <span>{{ scope.row.task_no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务名称" prop="task_name" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.task_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务得分" prop="student_score">
        <template scope="scope">
          <el-input-number v-if="scope.row.isEditing" v-model="scope.row.student_score" :min="0" :max="10"></el-input-number>

          <span v-else>{{ scope.row.student_score }}</span>
          <!--          <span v-else>{{ getScore(scope) }}</span>-->
        </template>
      </el-table-column>

      <el-table-column label="技术模块" prop="task_module">
        <template scope="scope">
          <span>{{ scope.row.task_module }}</span>
        </template>
      </el-table-column>

      <el-table-column label="能力目标" prop="target_capability">
        <template scope="scope">
          <span>{{ scope.row.target_capability }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template scope="scope">
          <template v-if="scope.row.isEditing">
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确认保存？" @confirm="saveRow(scope.$index, scope.row)">
              <el-button size="small" slot="reference">保存</el-button>
            </el-popconfirm>
          </template>

          <el-button size="small" type="primary" v-else @click="editRow(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="primary" v-if="scope.row.isEditing" style="margin-left: 10px" @click="cancelRow(scope.$index, scope.row)">取消 </el-button>

          <!--          <template v-else>-->
          <!--            <el-popconfirm confirm-button-text="删除" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除？" @confirm="handleDelete(scope.$index, scope.row)">-->
          <!--              <el-button size="small" style="margin-left: 10px" type="danger" slot="reference">删除</el-button>-->
          <!--            </el-popconfirm>-->
          <!--          </template>-->
        </template>
      </el-table-column>
    </el-table>

    <!--    <div>{{ props }}</div>-->
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import { setToken } from "@/utils/auth";
import { getketangData, updateketang, deleteketang, addketang } from "@/api/user";
import * as echarts from "echarts";
import { isValid } from "@/utils";

export default {
  name: "ketang",
  props: {
    props: {
      type: Object,
    },
  },
  data() {
    return {
      chart: undefined,
      rawData: [], // 原始数据
      tableData: [], // 原始数据
      years: [], // 年
      allYears: [], // 年
      weeks: [], //教学周
      allWeeks: [], //教学周
      days: [],
      allDays: [], //日期

      filter: {
        week: true,
        day: false,
      },
      date: undefined, // 日期
    };
  },
  watch: {},
  created() {},
  beforeDestroy() {
    this.$EventBus.$off("getData");
  },
  mounted() {
    this.$nextTick(() => {
      var chartDom = document.getElementById("main-4");
      this.chart = echarts.init(chartDom);
      this.$EventBus.$on("getData", (data) => {
        if (!this.props.userid) {
          this.tableData = [];
          this.chart = echarts.init(chartDom);
          return;
        }
        this.chart.showLoading();
        this.init(data).finally(() => {
          this.chart.hideLoading();
        });
      });

      this.chart.on("click", (params) => {
        if (this.filter.day || this.filter.week) {
          this.filterByDate(params.dataIndex);
        } else {
          this.chart.showLoading();
          this.init(undefined, params.dataIndex).finally(() => {
            this.chart.hideLoading();
          });
        }
      });
    });
  },
  methods: {
    getScore(scope) {
      return `${scope.row.student_score ?? "-"}/${scope.row.target_score ?? "-"}`;
    },
    handleDelete(index, row) {
      if (row.id) {
        deleteketang({ id: row.id }).then((res) => {
          this.init().finally(() => {
            this.chart.hideLoading();
          });
        });
      } else {
        this.tableData.splice(index, 1);
      }
    },
    saveRow(index, row) {
      l(index, row);
      if (row.id) {
        const data = {
          student_score: row.student_score,
          id: row.id,
        };
        updateketang(data).then((res) => {
          this.$set(row, "isEditing", false);
          this.init().finally(() => {
            this.chart.hideLoading();
          });
        });
      }
      // else {
      //   const data = {
      //     ...commonData,
      //     userid: this.props.userid,
      //   };
      //   addketang(data).then((res) => {
      //     this.$set(row, "isEditing", false);
      //     this.init().finally(() => {
      //       this.chart.hideLoading();
      //     });
      //   });
      // }
    },
    editRow(index, row) {
      this.$set(row, "isEditing", true);
    },
    cancelRow(index, row) {
      this.$set(row, "isEditing", false);
      if (!row.id) {
        this.tableData.splice(index, 1);
      }
    },
    addNewLine() {
      this.tableData.push({
        "work_date": "",
        "check_type": "",
        "time_result": "",
        "user_check_time": "",
        "procInst_id": "",
        "stage_date_name": "",
        "isEditing": true,
      });
    },
    handleRowClick(row, column, event) {},
    init(data, activeIndex = 0) {
      const _data = data ? data : { ...this.props };
      this.chart.showLoading();

      return getketangData(_data).then((res) => {
        let arr = res?.result?.result ?? [];
        this.rawData = arr;
        // 最后一天
        let _acIndex = arr?.length ? arr.length - 1 : 0;
        let lastDay = arr?.[_acIndex] ?? {};
        let lastday = lastDay.task_day.slice(0, 10);
        if (!this.days.length) {
          this.days = [lastday];
        }

        const { xAxisdata, seriesData, years, weeks, days, tblData } = arr.reduce(
          (prev, cur) => {
            let year = cur.task_day.slice(0, 4);
            let week = cur.stage_date_name;
            let day = cur.task_day.slice(0, 10);
            // 默认只放最后一天的数据
            if (this.days.includes(day)) {
              prev.xAxisdata.push(cur.task_no);
              prev.seriesData.push(cur.student_score);
              prev.tblData.push(cur);
            }

            prev.years.add(year);
            prev.weeks.add(week);
            prev.days.add(day);
            return prev;
          },
          {
            xAxisdata: [],
            tblData: [],
            seriesData: [],
            years: new Set(),
            weeks: new Set(),
            days: new Set(),
          }
        );
        this.chart.hideLoading();
        l(99, tblData, activeIndex);
        const option = this.getOptions(xAxisdata, seriesData, activeIndex);
        this.tableData = [tblData[activeIndex]];
        this.allYears = [...years];
        this.allDays = [...days];
        this.allWeeks = [...weeks];

        this.years = [lastDay.task_day.slice(0, 4)];
        this.weeks = [lastDay.stage_date_name];
        let _days = [...days];
        // this.days = [_days[_days.length - 1]];
        this.chart.setOption(option);
      });
    },

    handleYearChange(v, a, b) {
      l("eee", v, a, b);
      this.years = v;
      this.filter = {
        year: true,
        week: false,
      };
      this.filterByYearOrWeek();
    },
    handleDatec(v) {
      this.date = v;
      this.filterByDate();
    },
    handleWeekChange(v) {
      l("v", v);
      this.weeks = v;
      this.filter = {
        week: true,
        day: false,
      };
      this.filterByDate();
    },
    handleDayChange(v) {
      this.days = v;
      this.filter = {
        day: true,
        week: false,
      };
      this.filterByDate();
    },
    filterByDate(activeIndex = 0) {
      // 没有的话 默认最后一天
      // if (!this.days.length) {
      //   let lasyDay = (this.rawData[this.rawData.length - 1] ?? {})?.task_day.slice(0, 10);
      //   this.days = [lasyDay];
      // }
      const { xAxisdata, seriesData, days, weeks, tblData } = this.rawData.reduce(
        (prev, cur) => {
          let year = cur.task_day.slice(0, 4);
          let week = cur.stage_date_name;
          let day = cur.task_day.slice(0, 10);
          if ((this.filter.week && this.weeks.includes(week)) || (this.filter.day && this.days.includes(day))) {
            // if (this.days && this.days?.includes(day)) {
            prev.xAxisdata.push(cur.task_no);
            prev.seriesData.push(cur.student_score);
            prev.tblData.push(cur);
            prev.days.add(day);
            prev.weeks.add(week);
          }
          return prev;
        },
        {
          xAxisdata: [],
          seriesData: [],
          days: new Set(),
          weeks: new Set(),
          tblData: [],
        }
      );
      this.days = [...days];
      this.weeks = [...weeks];
      this.tableData = [tblData[activeIndex]];
      const option = this.getOptions(xAxisdata, seriesData, activeIndex);
      this.chart.setOption(option);
    },
    getOptions(xAxisdata, seriesData, activeIndex = 0) {
      let zoom = {
        show: true,
        start: 0,
        // 最少 25 个
        end: xAxisdata.length > 25 ? Math.round((100 * 25) / xAxisdata.length) : 100,
      };
      return {
        xAxis: [
          {
            type: "category",
            data: [...xAxisdata],
            // axisLabel: {
            //   interval: 0,
            //   rotate: -45, //倾斜度 -90 至 90 默认为0
            //   margin: 2,
            //   textStyle: {
            //     color: "#000000",
            //   },
            // },
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "15%",
          left: "1%",
          right: "10%",
          containLabel: true,
        },
        dataZoom: [zoom],
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [...seriesData],
            type: "bar",
            smooth: true,
            label: {
              show: true,
              position: "inside",
              formatter: (params) => {
                return params?.value ?? "";
              },
            },
            markPoint: {
              data: [
                {
                  coord: [activeIndex, seriesData[activeIndex] ?? 0],
                },
              ],
            },
          },
        ],
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ketang {
  #main-4 {
    width: 100%;
    min-height: 300px;
    height: 300px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }
}

.tbl1 {
  margin-top: 10px;
}
</style>
