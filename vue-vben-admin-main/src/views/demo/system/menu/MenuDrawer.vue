<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, getMenuList, updateById } from '@/api/sys/menu';
  // import { getMenuList } from '@/api/demo/system';
  import { useMessage } from '/@/hooks/web/useMessage';

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const idValue = ref();
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    idValue.value = data;
    console.log(`output->idValue.value`, idValue.value);
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      if (isUpdate.value == false) {
        await add(values);
        createMessage.success('新增成功');
      } else {
        console.log(`编辑`);
        const id = idValue.value.record.id;
        console.log(`output->id`, id);
        console.log(`output->values`, values);
        await updateById(id, values);
        console.log(`output`);
        createMessage.success('修改成功');
      }

      closeDrawer();
      emit('success');
    } catch {
      // setDrawerProps({ confirmLoading: false });

      createMessage.error('操作失败');
    }
  }
</script>
