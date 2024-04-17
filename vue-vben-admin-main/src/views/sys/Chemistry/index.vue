<template>
  <div class="h-full mt-12">
    <a-steps class="step" :current="current" :items="items" />
    <div class="steps-content">
      <!-- {{ steps[current].content }} -->
      <Step1 v-show="current == 0" />
      <Step2 v-show="current == 1" />
      <Step3 v-show="current == 2" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        完成
      </a-button>
      <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">上一步</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import Step1 from './step1.vue';
  import Step2 from './step2.vue';
  import Step3 from './step3.vue';

  const current = ref<number>(0);
  const next = () => {
    current.value++;
  };
  const prev = () => {
    current.value--;
  };
  const steps = [
    {
      title: '丁二酮肟乙醇溶液制备',
      content: 'First-content',
    },
    {
      title: '氯化镍水溶液制备',
      content: 'Second-content',
    },
    {
      title: '滴定法制备配合物',
      content: 'Last-content',
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
</script>
<style scoped>
  .step {
    width: 50%;
    margin: 0 auto; /* 使用auto将元素水平居中 */
  }

  .steps-content {
    width: calc(100% - 32px);
    height: 90%;
    min-height: 200px;
    margin-top: 16px;
    margin-right: 16px;
    margin-left: 16px;
    padding-top: 30px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #eceaea;

    /* background-color: #fafafa; */

    /* text-align: center; */
  }

  .steps-action {
    margin-top: 15px;
    margin-left: 16px; /* 右侧边距设为 16px */

    /* margin-left: auto; 将左侧边距设为自动以使其位于右侧 */
  }

  [data-theme='dark'] .steps-content {
    border: 1px dashed #404040;
    background-color: #2f2f2f;
  }
</style>
