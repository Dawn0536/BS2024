import { BasicColumn, FormProps, FormSchema } from '@/components/Table';
import { TreeItem } from '/@/components/Tree/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'code',
      title: '实验编号',
      width: 200,
    },
    {
      dataIndex: 'name',
      title: '实验名称',
      width: 200,
    },
    {
      dataIndex: 'ding',
      title: '丁二酮肟',
      width: 200,
    },
    {
      dataIndex: 'nie',
      title: '氯化镍',
      width: 200,
    },
    {
      dataIndex: 'c',
      title: '氯化碳',
      width: 200,
    },
    {
      dataIndex: 'date',
      title: '实验时间',
      width: 200,
    },
    {
      dataIndex: 'testName',
      title: '实验人',
      width: 200,
    },
  ];
}

export const getSearchFormConfig: FormProps = {
  baseColProps: { sm: 10, md: 8, xl: 6 },
  labelWidth: 100,
  labelAlign: 'right',
  schemas: [
    {
      field: 'code',
      label: '实验编号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'name',
      label: '实验名称',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'testName',
      label: '实验人',
      component: 'Input',
      colProps: { span: 4 },
    },
  ],
};
export const formSchema: FormSchema[] = [
  {
    field: 'code',
    label: '实验编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '实验名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'ding',
    label: '丁二酮肟',
    required: true,
    component: 'Input',
  },
  {
    field: 'nie',
    label: '氯化镍',
    required: true,
    component: 'Input',
  },
  {
    field: 'c',
    label: '氯化碳',
    required: true,
    component: 'Input',
  },
  {
    field: 'date',
    label: '实验时间',
    required: true,
    component: 'DatePicker',
  },
  {
    field: 'testName',
    label: '实验人',
    required: true,
    component: 'Input',
  },
];
// export const treeData: TreeItem[] = {
//   schemas: [
//     {
//       field: 'code',
//       label: '角色编号',
//       component: 'Input',
//       colProps: { span: 4 },
//     },
//     {
//       field: 'name',
//       label: '角色名称',
//       component: 'Input',
//       colProps: { span: 4 },
//     },
//   ],
// };
