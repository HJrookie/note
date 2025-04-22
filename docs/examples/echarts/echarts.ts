// 两条折线图
const getOption = (allData = {}, color = ["#00DCEC", "#1890FF", "#EF6D6C", "#8E42FF", "#13C2C2", "#F7B500"]) => {
  const option = {
    tooltip: {
      trigger: "axis",
      // axisPointer: { type: 'cross' }
      // formatter: function (params) {
      //   // 时间
      //   let tiem1 = convertSeconds(+params[0].axisValue) + '<br/>';
      //   let tiem2 = convertSeconds(+params[1].axisValue) + '<br/>';
      //   // 人名 + 语速
      //   const texts2 = params.map((item) => {
      //     return item.marker + `${item.seriesName}:` + (item.value);
      //   });

      //   return tiem1 + texts2[0] + '<br/>' + tiem2 + texts2[1];
      // }
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    yAxis: [
      {
        type: "value",
        name: "降水量",
        min: 0,
        max: 250,
        // position: 'right',
        axisLabel: {
          formatter: "{value} ml",
        },
      },
      {
        type: "value",
        name: "温度",
        min: 0,
        max: 25,
        // position: 'left',
        axisLabel: {
          formatter: "{value} °C",
        },
      },
    ],
    series: [
      {
        name: "降水量",
        type: "line",
        yAxisIndex: 0,
        data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 44, 22, 77, 11],
      },
      {
        name: "温度",
        type: "line",
        smooth: true,
        yAxisIndex: 1,
        data: [6.0, 10.2, 10.3, 11.5, 10.3, 13.2, 14.3, 16.4, 18.0, 16.5, 12.0, 5.2],
      },
    ],
  };
  return option;
};



// 正常  显示的柱状图
export const getSaleOption = (xAxisData: any[], seriesData: any[], activeIndex: number) => {
    return {
        xAxis: {
            type: "category",
            data: [...xAxisData],
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: { color: "white" }, //x轴文字的颜色
                interval: 0,
            },
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false, // 分割线
            },
            axisLabel: {
                textStyle: { color: "white" }, //y轴坐标系 文字的颜色
                interval: 0,
            },
        },
        grid: {
            top: "10%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        series: [
            {
                data: [...seriesData],
                type: "bar",
                showBackground: true, // 设置柱子 整体背景颜色
                backgroundStyle: {
                    color: "#182d51",
                },
                barWidth: "8px", // 柱状图 柱子宽度
                markPoint: {
                    data: [
                        {
                            coord: [activeIndex, seriesData[activeIndex] ?? 0],
                        },
                    ],
                },
                // 柱状图渐变色
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0,
                            [
                                {
                                    offset: 0,
                                    color: "#73f6fb", // 0% 处的颜色
                                },
                                {
                                    offset: 0.5,
                                    color: "#5ec4f9", // 50% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#4f95f8", // 100% 处的颜色
                                },
                            ],
                            false
                        ),
                    },
                },
            },
        ],
    };
};

// 调转方向的柱状图
export const getSaleResultTop15Option = (
    yAxisData: any[],
    seriesData: any[],
    activeIndex: number
) => {
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: function (info) {
                let prefix = '<div class="tooltip-title">',
                    suffix = "</div>";
                let date = info?.[0]?.axisValue ?? "";
                // 函数 f 用来渲染 每一条数据 展示时的效果  small-block 的 class 需要在别的地方定义
                const f = (item) => `<div style="width:130px;">
                                        <div class="small-block" >
                                          ${item.marker} ${item?.seriesName ?? ""
                    }    &nbsp;&nbsp;&nbsp;${((item?.data ?? 0) * 100).toFixed(2) + "%"}
                                        </div>
                                    </div>`;
                return prefix + date + `</br>` + info.reduce((prev, cur) => (prev += f(cur)), "") + suffix;
            },
        },
        grid: {
            top: "3%",
            left: "3%",
            right: "4%",
            bottom: "6%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            axisLabel: {
                //x 轴
                show: false,
                textStyle: { color: "white" },
                interval: 0,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: [
            {
                type: "category",
                splitLine: {
                    // 分隔线
                    show: false,
                },
                axisTick: {
                    // 坐标轴
                    show: false,
                },
                axisLine: {
                    //细小的坐标点 间隔
                    show: false,
                },
                axisLabel: {
                    // y轴文字的配置
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                    },
                },
                data: [...yAxisData],
            },
            {
                //  让文字右对齐
                type: "category",
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12",
                    },
                },
                data: [...seriesData],
            },
        ],
        series: [
            {
                type: "bar",
                data: [...seriesData],
                showBackground: true, // 柱子 全部高度的背景颜色
                backgroundStyle: {
                    color: "#358fff1a",
                },
                barWidth: "8px", // 柱子宽度
                markPoint: {
                    // 标记点
                    data: [
                        {
                            coord: [seriesData[activeIndex], activeIndex],
                        },
                    ],
                },
                itemStyle: {
                    // 柱子渐变色
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            1,
                            0,
                            0,
                            0,
                            [
                                {
                                    offset: 0,
                                    color: "#7dfbcf", // 0% 处的颜色
                                },
                                {
                                    offset: 0.5,
                                    color: "#77f8e6", // 50% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#73f7f9", // 100% 处的颜色
                                },
                            ],
                            false
                        ),
                    },
                },
            },
        ],
    };
};
