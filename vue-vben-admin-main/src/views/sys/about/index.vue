<template>
  <Button @click="test111">test</Button>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag, Button} from 'ant-design-vue';
  import { test } from '@/api/sys/test'
  
 async function test111(){
      await test();
  }
</script>
