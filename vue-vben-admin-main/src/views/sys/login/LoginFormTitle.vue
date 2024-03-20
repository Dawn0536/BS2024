<template>
  <div>
    <!-- <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ getFormTitle }}
  </h2> -->
    <h3 class="mb-3 px-4 font-medium text-center xl:text-2xl enter-x xl:text-left">{{
      t('sys.login.signInTitle')
    }}</h3>
    <!-- <h3 class="mb-3 px-4 font-medium text-center xl:text-2xl enter-x xl:text-left">{{
      t('sys.login.signInDesc')
    }}</h3> -->
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
</script>
