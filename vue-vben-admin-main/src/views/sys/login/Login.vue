<template>
  <div :class="prefixCls" class="relative w-full h-full">
    <div>
      <div class="flex h-full">
        <div class="hidden min-h-full xl:flex xl:flex-col xl:w-8/12">
          <div class="my-auto">
            <img :alt="title" src="../../../assets/images/testimg.jpg" class="login-img" />
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-4/12">
          <div
            style="text-align: center"
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <img src="../../../assets/svg/test.svg" alt="" style="" />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import LoginForm from './LoginForm.vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useDesign } from '/@/hooks/web/useDesign';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  // const { t } = useI18n();
  // const localeStore = useLocaleStore();
  // const showLocale = localeStore.getShowPicker;
  const title = computed(() => globSetting?.title ?? '');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      // &::before {
      //   background-image: url('/@/assets/svg/login-bg-dark.svg');
      // }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
      font-size: 12px;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    /* stylelint-disable-next-line media-query-no-invalid */
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      // background-image: url('/@/assets/svg/login-bg.svg');
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: auto 100%;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-xl) {
        min-width: 320px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-lg) {
        min-width: 260px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-md) {
        min-width: 240px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .my-auto {
      position: relative;
      text-align: left;
      /* stylelint-disable-next-line block-no-empty */
      .login-img {
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-position: center;
      }
      /* stylelint-disable-next-line rule-empty-line-before */
      .centered {
        position: absolute;
        top: 80%;
        left: 30%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 30px;
      }
    }
  }
</style>
