<template>
  <BasicDrawer
    v-bind="$attrs"
    width="500px"
    @register="registerDrawer"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getFormSchema } from './user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { selectlist } from '@/api/sys/role';
  import { add, getuser, updateuser } from '@/api/sys/user';

  const emit = defineEmits(['register', 'success']);
  // 定义变量接受父组件传过来的数据
  const record = ref();
  const id = ref();
  const [registerForm, { validate, resetFields, setFieldsValue, setProps }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    // schemas: getFormSchema(),
    showActionButtonGroup: false,
  });
  // const selectedRoleId = ref();
  const { createMessage } = useMessage();
  let propertyValues = [] as any;
  function getPropertyValues() {
    return propertyValues;
  }
  function clearPropertyValues() {
    propertyValues = []; // 清空propertyValues数组
  }
  // 弹出层打开
  const [registerDrawer, { closeDrawer }] = useDrawerInner(async (data) => {
    record.value = data;
    // console.log(`output->record.value`, record.value);
    resetFields();
    clearPropertyValues();
    const options = await selectlist();
    // console.log(`output->rolelist`, options);
    options.forEach((item) => {
      propertyValues.push({ id: item.id, label: item.name, value: item.name });
    });
    console.log(`output->name`, propertyValues);
    setProps({ schemas: getFormSchema(propertyValues) });
    if (data.flag === 0) {
      const res = await getuser(data.record.id);
      // console.log(res);
      id.value = res.id;
      // console.log(id.value);
      setFieldsValue(res);
    } else if (data.flag === 1) {
      console.log('新增');
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const rolesid = getPropertyValues();
      const selectedRoleName = values.roleName;
      const selectedRoleId = propertyValues.find((item) => item.label === selectedRoleName)?.id;
      const roleId = parseInt(selectedRoleId);
      console.log(`output->roleId`, typeof roleId);
      console.log(`output->111`, rolesid);
      if (record.value.flag === 0) {
        console.log(`output->id.value`, id.value);
        console.log(typeof id.value);
        console.log(`output->values`, values);
        console.log(`output->selectedRoleId`, typeof selectedRoleId);
        await updateuser(id.value, { ...values, roleId: selectedRoleId });
        console.log('values', values, id.value);
        createMessage.success('修改成功');
      } else if (record.value.flag === 1) {
        console.log(`output->`, values);
        await add({ ...values, roleId: selectedRoleId });
        createMessage.success('新增成功');
      }
      closeDrawer();
      emit('success');
      console.log(values);
    } catch (error) {
      // 如果验证或者 API 调用失败，显示错误提示
      console.error('操作失败', error);
      createMessage.error('操作失败，请稍后重试');
    }
  }
</script>
