import { BasicColumn, FormProps, FormSchema } from '@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'code',
      title: '角色编号',
      width: 200,
    },
    {
      dataIndex: 'name',
      title: '角色名称',
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
      label: '角色编号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'name',
      label: '角色名称',
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
