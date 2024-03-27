<template>
  <div> 11</div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const table = ref();
  const data = {
    name: '222',
    age: '2',
  };
  table.value = data;
</script>
