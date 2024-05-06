<template>
  <BasicModal v-bind="$attrs" @register="register" centered title="输入回复信息" @ok="handleOK">
    <BasicForm
      @register="registerForm"
      :labelWidth="100"
      :schemas="schemas"
      :actionColOptions="{ span: 24 }"
      :showActionButtonGroup="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { replay } from '@/api/sys/message';

  const emit = defineEmits(['register', 'success']);
  const pid = ref();
  const schemas: FormSchema[] = [
    {
      field: 'content',
      component: 'InputTextArea',
      label: '内容：',
      labelWidth: 50,
      height: 232,
      colProps: {
        span: 20,
      },
    },
  ];
  const [register, { closeModal, setModalProps }] = useModalInner((data) => {
    console.log(`output`, data);
    pid.value = data.parentid;
  });
  const [registerForm, { validate, resetFields, setFieldsValue, setProps }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    // schemas: getFormSchema(),
    showActionButtonGroup: false,
  });
  async function handleOK() {
    const values = await validate();
    const id = pid.value;
    const re = await replay(id, values);
    console.log(`output->re`, re);
    closeModal();
    emit('success');
    resetFields('');
  }
</script>
