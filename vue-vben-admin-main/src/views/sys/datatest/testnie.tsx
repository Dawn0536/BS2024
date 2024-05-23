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
      dataIndex: 'ph',
      title: 'PH',
      width: 200,
    },
    {
      dataIndex: 'catalyst',
      title: '催化剂',
      width: 200,
    },
    {
      dataIndex: 'copd',
      title: '重铬酸钾浓度',
      width: 200,
    },
    {
      dataIndex: 'temperature',
      title: '温度',
      width: 200,
    },
    {
      dataIndex: 'citric',
      title: '柠檬酸',
      width: 200,
    },
    {
      dataIndex: 'min',
      title: '分钟',
      width: 200,
    },
    {
      dataIndex: 'qcl',
      title: '六价铬去除率',
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
    field: 'ph',
    label: 'PH',
    required: true,
    component: 'Input',
  },
  {
    field: 'catalyst',
    label: '催化剂',
    required: true,
    component: 'Input',
  },
  {
    field: 'copd',
    label: '重铬酸钾浓度',
    required: true,
    component: 'Input',
  },
  {
    field: 'temperature',
    label: '温度',
    required: true,
    component: 'Input',
  },
  {
    field: 'citric',
    label: '柠檬酸',
    required: true,
    component: 'Input',
  },
  {
    field: 'min',
    label: '分钟',
    required: true,
    component: 'Input',
  },
  {
    field: 'qcl',
    label: '六价铬去除率',
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
