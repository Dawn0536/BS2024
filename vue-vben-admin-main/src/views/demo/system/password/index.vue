<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar> </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template> </BasicTable
  ></div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  // import { getRoleListByPage } from '@/api/demo/system';

  import { list, deleteById } from '@/api/sys/role';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import { getBasicColumns, getSearchFormConfig } from './pwd.data';

  const { createMessage } = useMessage();

  const [registerTable, { reload, getForm }] = useTable({
    api: list,
    title: '角色管理',
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    columns: getBasicColumns(),
    formConfig: getSearchFormConfig, // 搜索的表单项数据源
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
    handleSearchInfoFn: (e) => {
      console.log(`output->e`, e);
    },
  });
  async function exportData() {
    const data = getForm().getFieldsValue();
    await list(data);
    reload();
  }
  async function handleDelete(record) {
    console.log(`output->record`, record);
    try {
      await deleteById(record.id);
      createMessage.success('删除成功');
      // 刷新table
      reload();
    } catch (error) {
      createMessage.error('删除失败');
    }
  }
</script>

<style scoped></style>
