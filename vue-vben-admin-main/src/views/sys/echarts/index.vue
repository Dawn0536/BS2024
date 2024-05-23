<template>
  <div class="css"> <div ref="chartRef" :style="{ height, width }" id="main"></div></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { esList } from '@/api/sys/testnie';

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
  const cvalue: any = ref([]);
  const dingvalue: any = ref([]);
  const nievalue: any = ref([]);
  const ndvalue: any = ref([]);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(async () => {
    const data = await esList();
    console.log(`output->data`, data);
    data.forEach((obj) => {
      cvalue.value.push(obj.c);
    });
    data.forEach((obj) => {
      dingvalue.value.push(obj.ding);
    });
    data.forEach((obj) => {
      nievalue.value.push(obj.nie);
    });
    data.forEach((obj) => {
      ndvalue.value.push(obj.concentration);
    });

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
        text: '石墨相氮化碳实验',
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
        data: ndvalue.value,
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
          data: dingvalue.value,
        },
        {
          name: '氯化碳',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: cvalue.value,
        },
        {
          name: '氯化镍',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: nievalue.value,
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
