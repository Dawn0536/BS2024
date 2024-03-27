<template>
  <div class="myself"
    ><a-row>
      <a-col :span="10" class="list">
        <div
          ><a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
            <template #icon>
              <AntDesignOutlined />
            </template> </a-avatar
        ></div>
      </a-col>
      <a-col :span="14" class="content">col-12</a-col>
    </a-row></div
  >
</template>

<script setup lang="ts">
  import { AntDesignOutlined } from '@ant-design/icons-vue';
</script>
<style lang="less" scoped>
  .myself {
    width: 100%;
    height: 100vh;
    padding: 16px;
    background-color: red;

    .list {
      width: 100vh;
      height: 100vh;
      background-color: #ccc;
    }

    .content {
      width: 100vh;
      height: 100vh;
      background-color: #fff;
    }
  }
</style>
