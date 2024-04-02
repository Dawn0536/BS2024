<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
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
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  // import { getRoleListByPage } from '@/api/demo/system';

  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from './UserDrawer.vue';
  import { list, deleteuser } from '@/api/sys/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getBasicColumns, getSearchFormConfig } from './user.data';

  const { createMessage } = useMessage();

  defineOptions({ name: 'RoleManagement' });
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: list,
    columns: getBasicColumns(),

    formConfig: getSearchFormConfig(),

    useSearchForm: true,
    striped: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    const flag = 1;
    openDrawer(true, {
      flag,
    });
  }

  function handleEdit(record: Recordable) {
    const flag = 0;
    openDrawer(true, {
      record,
      flag,
    });
  }

  async function handleDelete(record) {
    console.log(`output->record`, record);
    try {
      await deleteuser(record.id);
      createMessage.success('删除成功');
      // 刷新table
      reload();
    } catch (error) {
      createMessage.error('删除失败');
    }
  }

  function handleSuccess() {
    reload();
  }
</script>
./user.data
