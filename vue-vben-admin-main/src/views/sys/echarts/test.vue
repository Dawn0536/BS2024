<template>
  <div class="es">
    <div class="x1">
      <div ref="chartRef" id="main" :style="{ height, width }"></div>
    </div>
    <div class="x2">
      <div ref="chartRefs" id="main" :style="{ height, width }"></div>
    </div>
    <div class="x3">
      <div ref="chartRefss" id="main" c :style="{ height, width }"></div>
    </div>

    <div class="x4">
      <div ref="chartRefsss" id="main" :style="{ height, width }"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { esList } from '@/api/sys/testph';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '100%',
    },
  });
  //ph
  const ph2qcl: any = ref([]);
  const ph3qcl: any = ref([]);
  const ph4qcl: any = ref([]);
  const ph5qcl: any = ref([]);
  //催化剂
  const chj10qcl: any = ref([]);
  const chj20qcl: any = ref([]);
  const chj30qcl: any = ref([]);
  const chj40qcl: any = ref([]);
  const chj50qcl: any = ref([]);
  //重铬酸钾
  const cgsj10qcl: any = ref([]);
  const cgsj20qcl: any = ref([]);
  const cgsj30qcl: any = ref([]);
  const cgsj40qcl: any = ref([]);
  const cgsj50qcl: any = ref([]);
  //温度

  const wd20qcl: any = ref([]);
  const wd30qcl: any = ref([]);
  const wd40qcl: any = ref([]);
  const wd50qcl: any = ref([]);

  const chartRef = ref<HTMLDivElement | null>(null);
  const chartRefs = ref<HTMLDivElement | null>(null);
  const chartRefss = ref<HTMLDivElement | null>(null);

  const chartRefsss = ref<HTMLDivElement | null>(null);

  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
  const { setOptions: set } = useECharts(chartRefs as Ref<HTMLDivElement>);
  const { setOptions: sett } = useECharts(chartRefss as Ref<HTMLDivElement>);
  const { setOptions: settt } = useECharts(chartRefsss as Ref<HTMLDivElement>);

  onMounted(async () => {
    const data = await esList();
    console.log(`output->data`, data);
    //ph
    const searchString = 'phtest';
    const searchchj = 'chjtest';
    const searchcgsj = 'zgsjtest';
    const searchwd = 'wdtest';
    //ph
    const filteredData = data.filter((item) => item.code.includes(searchString) && item.ph === '2');
    const filteredData3 = data.filter(
      (item) => item.code.includes(searchString) && item.ph === '3',
    );
    const filteredData4 = data.filter(
      (item) => item.code.includes(searchString) && item.ph === '4',
    );
    const filteredData5 = data.filter(
      (item) => item.code.includes(searchString) && item.ph === '5',
    );
    const ph2 = filteredData.map((item) => item.qcl);
    const ph3 = filteredData3.map((item) => item.qcl);
    const ph4 = filteredData4.map((item) => item.qcl);
    const ph5 = filteredData5.map((item) => item.qcl);
    ph2qcl.value = ph2;
    ph3qcl.value = ph3;
    ph4qcl.value = ph4;
    ph5qcl.value = ph5;
    //催化剂
    const filteredchj1 = data.filter(
      (item) => item.code.includes(searchchj) && item.catalyst === '10mg',
    );
    const filteredchj2 = data.filter(
      (item) => item.code.includes(searchchj) && item.catalyst === '20mg',
    );
    const filteredchj3 = data.filter(
      (item) => item.code.includes(searchchj) && item.catalyst === '30mg',
    );
    const filteredchj4 = data.filter(
      (item) => item.code.includes(searchchj) && item.catalyst === '40mg',
    );
    const filteredchj5 = data.filter(
      (item) => item.code.includes(searchchj) && item.catalyst === '50mg',
    );
    const chj10 = filteredchj1.map((item) => item.qcl);
    const chj20 = filteredchj2.map((item) => item.qcl);
    const chj30 = filteredchj3.map((item) => item.qcl);
    const chj40 = filteredchj4.map((item) => item.qcl);
    const chj50 = filteredchj5.map((item) => item.qcl);
    chj10qcl.value = chj10;
    chj20qcl.value = chj20;
    chj30qcl.value = chj30;
    chj40qcl.value = chj40;
    chj50qcl.value = chj50;
    console.log(`output->`, filteredchj1);
    //重铬酸钾
    const filteredcgsj1 = data.filter(
      (item) => item.code.includes(searchcgsj) && item.copd === '10mg/l',
    );
    const filteredcgsj2 = data.filter(
      (item) => item.code.includes(searchcgsj) && item.copd === '20mg/l',
    );
    const filteredcgsj3 = data.filter(
      (item) => item.code.includes(searchcgsj) && item.copd === '30mg/l',
    );
    const filteredcgsj4 = data.filter(
      (item) => item.code.includes(searchcgsj) && item.copd === '40mg/l',
    );
    const filteredcgsj5 = data.filter(
      (item) => item.code.includes(searchcgsj) && item.copd === '50mg/l',
    );
    const cgsj10 = filteredcgsj1.map((item) => item.qcl);
    const cgsj20 = filteredcgsj2.map((item) => item.qcl);
    const cgsj30 = filteredcgsj3.map((item) => item.qcl);
    const cgsj40 = filteredcgsj4.map((item) => item.qcl);
    const cgsj50 = filteredcgsj5.map((item) => item.qcl);
    cgsj10qcl.value = cgsj10;
    cgsj20qcl.value = cgsj20;
    cgsj30qcl.value = cgsj30;
    cgsj40qcl.value = cgsj40;
    cgsj50qcl.value = cgsj50;
    //温度
    const filteredwd1 = data.filter(
      (item) => item.code.includes(searchwd) && item.temperature === '20',
    );
    const filteredwd2 = data.filter(
      (item) => item.code.includes(searchwd) && item.temperature === '30',
    );
    const filteredwd3 = data.filter(
      (item) => item.code.includes(searchwd) && item.temperature === '40',
    );
    const filteredwd4 = data.filter(
      (item) => item.code.includes(searchwd) && item.temperature === '50',
    );

    const wd20 = filteredwd1.map((item) => item.qcl);
    const wd30 = filteredwd2.map((item) => item.qcl);
    const wd40 = filteredwd3.map((item) => item.qcl);
    const wd50 = filteredwd4.map((item) => item.qcl);

    wd20qcl.value = wd20;
    wd30qcl.value = wd30;
    wd40qcl.value = wd40;
    wd50qcl.value = wd50;

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
        text: 'PH的影响',
        textStyle: {
          fontSize: 30,
          color: 'rgba(203, 82, 82, 1)',
          fontSize: 16,
        },
      },
      legend: {
        data: ['PH=2', 'PH=3', 'PH=4', 'PH=5'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        // max: 140,
        // min: 0,
        data: ['0', '20', '40', '60', '80', '100', '120', '140'],
        axisLine: {
          // symbol: 'none',

          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        boundaryGap: false,
        name: '分钟',
        offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          // length: 6,
          alignWithLabel: true,
          lineStyle: {
            // type: 'dashed',
            // ...
          },
        },
        type: 'category',
        // boundaryGap: false,
      },
      yAxis: {
        data: ['0', '20', '40', '60', '80', '100'],
        name: '六价铬去除率',
        type: 'value',
        // offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            type: 'dashed',
            // ...
          },
          show: true,
        },
        axisLine: {
          show: true,
          onZero: true,
        },
        minorTick: {
          show: true,
        },
      },
      series: [
        {
          name: 'PH=2',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          stack: 'Total',
          data: ph2qcl.value,
        },
        {
          name: 'PH=3',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: ph3qcl.value,
        },
        {
          name: 'PH=4',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: ph4qcl.value,
        },
        {
          name: 'PH=5',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: ph5qcl.value,
        },
      ],
    });
    set({
      backgroundColor: '#100c2a',
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
        text: '催化剂的量的影响',
        textStyle: {
          fontSize: 30,
          color: 'rgba(203, 82, 82, 1)',
          fontSize: 16,
        },
      },
      legend: {
        data: ['10mg', '20mg', '30mg', '40mg', '50mg'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        // max: 140,
        // min: 0,
        data: ['0', '20', '40', '60', '80', '100', '120', '140'],
        axisLine: {
          // symbol: 'none',

          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        boundaryGap: false,
        name: '分钟',
        offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          // length: 6,
          alignWithLabel: true,
          lineStyle: {
            // type: 'dashed',
            // ...
          },
        },
        type: 'category',
        // boundaryGap: false,
      },
      yAxis: {
        data: ['0', '20', '40', '60', '80', '100'],
        name: '六价铬去除率',
        type: 'value',
        // offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            type: 'dashed',
            // ...
          },
          show: true,
        },
        axisLine: {
          show: true,
          onZero: true,
        },
        minorTick: {
          show: true,
        },
      },
      series: [
        {
          name: '10mg',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          stack: 'Total',
          data: chj10qcl.value,
        },
        {
          name: '20mg',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: chj20qcl.value,
        },
        {
          name: '30mg',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: chj30qcl.value,
        },
        {
          name: '40mg',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: chj40qcl.value,
        },
        {
          name: '50mg',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: chj50qcl.value,
        },
      ],
    });
    sett({
      backgroundColor: '#100c2a',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#89b8e6',
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
        text: '初始重铬酸钾浓度的影响',
        textStyle: {
          fontSize: 30,
          color: 'rgba(203, 82, 82, 1)',
          fontSize: 16,
        },
      },
      legend: {
        data: ['10mg/l', '20mg/l', '30mg/l', '40mg/l', '50mg/l'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        // max: 140,
        // min: 0,
        data: ['0', '20', '40', '60', '80', '100', '120', '140'],
        axisLine: {
          // symbol: 'none',

          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        boundaryGap: false,
        name: '分钟',
        offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          // length: 6,
          alignWithLabel: true,
          lineStyle: {
            // type: 'dashed',
            // ...
          },
        },
        type: 'category',
        // boundaryGap: false,
      },
      yAxis: {
        data: ['0', '20', '40', '60', '80', '100'],
        name: '六价铬去除率',
        type: 'value',
        // offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            type: 'dashed',
            // ...
          },
          show: true,
        },
        axisLine: {
          show: true,
          onZero: true,
        },
        minorTick: {
          show: true,
        },
      },
      series: [
        {
          name: '10mg/l',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          stack: 'Total',
          data: cgsj10qcl.value,
        },
        {
          name: '20mg/l',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: cgsj20qcl.value,
        },
        {
          name: '30mg/l',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: cgsj30qcl.value,
        },
        {
          name: '40mg/l',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: cgsj40qcl.value,
        },
        {
          name: '50mg/l',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: cgsj50qcl.value,
        },
      ],
    });
    settt({
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
        text: '温度的影响',
        textStyle: {
          fontSize: 30,
          color: 'rgba(203, 82, 82, 1)',
          fontSize: 16,
        },
      },
      legend: {
        data: ['20℃', '30℃', '40℃', '50℃'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        // max: 140,
        // min: 0,
        data: ['0', '20', '40', '60', '80', '100', '120', '140'],
        axisLine: {
          // symbol: 'none',

          lineStyle: {
            type: 'dashed',
            // ...
          },
        },
        boundaryGap: false,
        name: '分钟',
        offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          // length: 6,
          alignWithLabel: true,
          lineStyle: {
            // type: 'dashed',
            // ...
          },
        },
        type: 'category',
        // boundaryGap: false,
      },
      yAxis: {
        data: ['0', '20', '40', '60', '80', '100'],
        name: '六价铬去除率',
        type: 'value',
        // offset: 0, // 设置 x 轴刻度与 y 轴重合
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            type: 'dashed',
            // ...
          },
          show: true,
        },
        axisLine: {
          show: true,
          onZero: true,
        },
        minorTick: {
          show: true,
        },
      },
      series: [
        {
          name: '20℃',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          stack: 'Total',
          data: wd20qcl.value,
        },
        {
          name: '30℃',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: wd30qcl.value,
        },
        {
          name: '40℃',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: wd40qcl.value,
        },
        {
          name: '50℃',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 5,
          data: wd50qcl.value,
        },
      ],
    });
  });
</script>
<style lang="less" scoped>
  .es {
    display: flex;
    flex-wrap: wrap; /* 让子元素自动换行 */
    width: 100%;
    height: 100%;
    margin: 16px;
    // background-color: #f3efef;

    .x1 {
      width: calc(50% - 16px); /* 设置宽度为50%，减去间隔的宽度 */
      height: calc(50% - 16px); /* 设置高度为50%，减去间隔的高度 */
      margin: 8px; /* 创建间隔 */
      border-radius: 10px; /* 例如，这里是10像素的圆角 */
      background-color: #fff;
    }

    .x2 {
      width: calc(50% - 16px); /* 设置宽度为50%，减去间隔的宽度 */
      height: calc(50% - 16px); /* 设置高度为50%，减去间隔的高度 */
      margin: 8px; /* 创建间隔 */
      border-radius: 10px; /* 例如，这里是10像素的圆角 */
      background-color: #fff;
    }

    .x3 {
      width: calc(50% - 16px); /* 设置宽度为50%，减去间隔的宽度 */
      height: calc(50% - 16px); /* 设置高度为50%，减去间隔的高度 */
      margin: 8px; /* 创建间隔 */
      border-radius: 10px; /* 例如，这里是10像素的圆角 */
      background-color: #fff;
    }

    .x4 {
      width: calc(50% - 16px); /* 设置宽度为50%，减去间隔的宽度 */
      height: calc(50% - 16px); /* 设置高度为50%，减去间隔的高度 */
      margin: 8px; /* 创建间隔 */
      border-radius: 10px; /* 例如，这里是10像素的圆角 */
      background-color: #fff;
    }
  }
</style>
