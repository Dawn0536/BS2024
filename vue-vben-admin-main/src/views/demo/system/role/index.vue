<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
        <!-- <a-button type="primary" @click="exportData"> 数据导出 </a-button> -->
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
  import RoleDrawer from './RoleDrawer.vue';
  import { list, deleteById } from '@/api/sys/role';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getBasicColumns, getSearchFormConfig } from './role.data';

  const { createMessage } = useMessage();

  defineOptions({ name: 'RoleManagement' });
  const [registerDrawer, { openDrawer }] = useDrawer();
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
  // async function exportData() {
  //   const data = getForm().getFieldsValue();
  //   await list(data);
  //   reload();
  // }
  function handleCreate() {
    const flag = 0;
    openDrawer(true, {
      flag,
    });
  }

  function handleEdit(record: Recordable) {
    const flag = 1;
    openDrawer(true, {
      record,
      flag,
    });
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

  function handleSuccess() {
    reload();
  }
</script>
