<template>
  <div class="css"> <div ref="chartRef" :style="{ height, width }" id="main"></div></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { list } from '@/api/sys/testnie';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 78px)',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333',
          },
        },
      },
      // 高亮样式。
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: 'blue',
        },
        label: {
          show: true,
          // 高亮时标签的文字。
          // formatter: 'This is a emphasis label.',
        },
      },
      title: {
        text: 'Stacked Line',
        textStyle: {
          fontSize: 30,
          color: 'rgba(203, 82, 82, 1)',
          fontSize: 16,
        },
      },
      legend: {
        data: ['丁二酮肟', '氯化镍', '氯化碳'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        data: ['10%', '20%', '30%', '40%', '50%', '60%', '70%'],
        axisLine: {
          symbol: 'none',

          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        name: 'g-C3N4浓度',
        axisTick: {
          length: 6,
          alignWithLabel: true,
          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        type: 'category',
        // boundaryGap: false,
      },
      yAxis: {
        name: 'g',
        min: 0,
        max: 1,
        type: 'value',
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
          onZero: true,
        },
        minorTick: {
          show: true,
        },
        // splitLine: { show: false },
        // axisLine: {
        //   lineStyle: {
        //     color: '#ccc',
        //   },
        // },
        // axisTick: {
        //   length: 6,
        //   lineStyle: {
        //     type: 'dashed',
        //     // ...
        //   },
        // },
        data: [
          '0.05',
          '0.10',
          '0.15',
          '0.20',
          '0.25',
          '0.30',
          '0.35',
          '0.40',
          '0.45',
          '0.50',
          '0.55',
        ],
      },
      series: [
        {
          name: '丁二酮肟',
          type: 'line',
          // smooth: true,
          // showAllSymbol: 'auto',
          // symbol: 'emptyCircle',
          symbolSize: 15,
          stack: 'Total',
          data: ['0.0353', '0.0706', '0.1059', '0.1412', '0.1764', '0.2109', '0.2471'],
        },
        {
          name: '氯化碳',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: ['0.5', '0.5', '0.5', '0.5', '0.5', '0.5', '0.5'],
        },
        {
          name: '氯化镍',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: ['0.035', '0.0723', '0.1084', '0.1445', '0.1806', '0.2159', '0.2529'],
        },
        // {
        //   name: 'bar',
        //   type: 'bar',
        //   barWidth: 10,
        //   itemStyle: {
        //     borderRadius: 5,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: '#14c8d4' },
        //       { offset: 1, color: '#43eec6' },
        //     ]),
        //   },
        //   data: barData,
        // },
        // {
        //   name: 'line',
        //   type: 'bar',
        //   barGap: '-100%',
        //   barWidth: 10,
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: 'rgba(20,200,212,0.5)' },
        //       { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
        //       { offset: 1, color: 'rgba(20,200,212,0)' },
        //     ]),
        //   },
        //   z: -12,
        //   data: lineData,
        // },
        // {
        //   name: 'dotted',
        //   type: 'pictorialBar',
        //   symbol: 'rect',
        //   itemStyle: {
        //     color: '#0f375f',
        //   },
        //   symbolRepeat: true,
        //   symbolSize: [12, 4],
        //   symbolMargin: 1,
        //   z: -10,
        //   data: lineData,
        // },
      ],
    });
  });
</script>
<style lang="less" scoped>
  .css {
    height: 95%;
    margin: 16px;
  }
</style>
