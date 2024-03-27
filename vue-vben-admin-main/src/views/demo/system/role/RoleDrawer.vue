<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <!-- <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template> -->
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  // import { BasicTree, TreeItem } from '@/components/Tree';
  import { roledetail, roleadd, updateById } from '@/api/sys/role';

  const emit = defineEmits(['register', 'success']);
  // 定义变量接受父组件传过来的数据
  const record = ref();
  const { createMessage } = useMessage();
  const id = ref();
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  // 弹出层打开
  const [registerDrawer, { closeDrawer }] = useDrawerInner(async (data) => {
    record.value = data;
    console.log(`output->data`, data);
    resetFields();
    if (data.flag === 1) {
      const res = await roledetail(data.record.id);
      console.log(res);
      id.value = res.id;
      setFieldsValue(res);
    } else if (data.flag === 0) {
      console.log('新增');
    }
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      console.log(`output->values`, values);
      if (record.value.flag === 1) {
        console.log(`output->`, id.value, values);
        await updateById(id.value, values);
        console.log('values', values, id.value);
        createMessage.success('修改成功');
      } else if (record.value.flag === 0) {
        await roleadd(values);
        createMessage.success('新增成功');
      }
      closeDrawer();
      emit('success');
      console.log(values);
    } catch (error) {
      createMessage.error('操作失败，请稍后重试');
    }
  }
</script>
