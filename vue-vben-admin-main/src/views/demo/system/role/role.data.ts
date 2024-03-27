import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色编码',
    dataIndex: 'code',
    width: 200,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '角色编码',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

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
