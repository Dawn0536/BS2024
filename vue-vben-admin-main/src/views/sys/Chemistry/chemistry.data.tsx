import { FormSchema } from '@/components/Table';

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'username',
      label: '用户名',
      component: 'Input',
      colProps: {
        span: 23,
      },
      dynamicDisabled: true,
    },
    {
      field: 'nikeName',
      label: '账号昵称',
      component: 'Input',
      required: true,
      colProps: {
        span: 23,
      },
    },
    {
      field: 'email',
      label: '账号email',
      component: 'Input',
      required: true,
      colProps: {
        span: 23,
      },
      rules: [
        { required: true, message: '请输入邮箱地址' },
        { type: 'email', message: '请输入有效的邮箱地址' },
        {
          pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
          message: '请输入符合格式的邮箱地址',
        },
      ],
    },
    // {
    //   field: 'initPassword',
    //   label: '初始明文密码',
    //   component: 'Input',
    // },
    // {
    //   field: 'expirationTime',
    //   label: '账号过期时间',
    //   component: 'DatePicker',
    // },
  ];
}
