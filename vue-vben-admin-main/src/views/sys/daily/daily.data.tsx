import { BasicColumn, FormProps, FormSchema } from '@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'operation',
      title: '操作名称',
      width: 200,
    },
    {
      dataIndex: 'user',
      title: '操作人',
      width: 200,
    },
    {
      dataIndex: 'time',
      title: '操作时间',
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
      field: 'operation',
      label: '操作名称',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'user',
      label: '操作人',
      component: 'Input',
      colProps: { span: 4 },
    },
  ],
};
export const formSchema: FormSchema[] = [
  {
    field: 'code',
    label: '角色编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
];
