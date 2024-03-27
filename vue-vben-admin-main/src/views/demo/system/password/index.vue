<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { updatePassword } from '@/api/sys/login';
  import { formSchema } from './pwd.data';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageEnum } from '/@/enums/pageEnum';

  defineOptions({ name: 'ChangePassword' });
  const router = useRouter();

  const { createMessage } = useMessage();
  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const { old_pwd, new_pwd, re_pwd } = values;

      // TODO custom api
      console.log(old_pwd, new_pwd, re_pwd);
      await updatePassword(values);
      createMessage.success('密码修改成功,请重新登录');
      router.push(PageEnum.BASE_LOGIN);
    } catch (error) {
      console.error(error);
    }
  }
</script>
