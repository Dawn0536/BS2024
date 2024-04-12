<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    title="分配菜单"
    :Height="800"
    :centered="true"
    :width="600"
    @ok="handleOK"
  >
    <BasicTree
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'customTitle' }"
      selectable
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      checkable
    />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree, TreeItem } from '/@/components/Tree/index';
  import { getMenuList, saveRoleMenu, getRoleMenuById } from '@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const treeData = ref<TreeItem[]>([]);
  const idvalue = ref();
  // 用于存储过滤后的树形数据
  const expandedKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);
  const checkedKeys = ref<string[]>([]);
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    console.log(`output->data`, data);
    idvalue.value = data;
    const rawData = (await getMenuList()) as unknown as TreeItem[];
    console.log(`output->1111`, rawData);
    // 过滤数据，只保留名称字段
    treeData.value = flattenTree(rawData);
    console.log(`output->treeData.value`, treeData.value);
    // 获取该角色已分配的菜单列表
    const assignedMenuIds = await getRoleMenuById(idvalue.value.record.id);
    // 根据已分配的菜单列表，更新 checkedKeys 数组
    checkedKeys.value = assignedMenuIds;
  });
  function flattenTree(data: TreeItem[]): TreeItem[] {
    return data.map((item) => {
      // 复制当前项并修改标题
      const modifiedItem: TreeItem = {
        ...item,
        customTitle: `${item.name}`, // 根据需要可以加入其他格式
      };

      // 如果有子项，递归调用此函数
      if (item.children && item.children.length > 0) {
        modifiedItem.children = flattenTree(item.children);
      }
      return modifiedItem;
    });
  }

  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys);
  });
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys);
  });
  watch(checkedKeys, () => {
    console.log('checkedKeys', checkedKeys);
  });

  async function handleOK() {
    const id = idvalue.value.record.id;
    console.log(`output->`, id);
    try {
      const value = checkedKeys.value;
      console.log(`output->value`, value);
      await saveRoleMenu(id, value);
      createMessage.success('分配菜单成功');
    } catch {
      createMessage.error('分配菜单失败');
    }
  }
</script>
