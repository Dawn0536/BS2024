import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormProps, FormSchema } from '@/components/Table';
// import { setRoleStatus } from '@/api/sys/role';
import { setRoleStatus } from '@/api/sys/user';
import { reactive, h } from 'vue';
import { Switch } from 'ant-design-vue';
import EyeOpenSVG from '/@/assets/svg/显示密码.svg';
import EyeClosedSVG from '@/assets/svg/不显示密码.svg';
import { useMessage } from '/@/hooks/web/useMessage';
// import { FormProps, BasicColumn, FormSchema } from '/@/components/Table';

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
// export const deptMap = (() => {
//   const pDept = ['华东分部', '华南分部', '西北分部'];
//   const cDept = ['研发部', '市场部', '商务部', '财务部'];

//   return pDept.reduce((map, p, pIdx) => {
//     map[pIdx] = p;

//     cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

//     return map;
//   }, {});
// })();

type CheckedType = boolean | string | number;

export function getBasicColumns(): BasicColumn[] {
  const state = reactive({});
  const togglePasswordVisibility = (record) => {
    state[record.id] = !state[record.id];
  };
  return [
    {
      dataIndex: 'userName',
      title: '学号/教师工号',
      width: 200,
    },
    {
      dataIndex: 'nikeName',
      title: '姓名',
      width: 200,
    },

    {
      dataIndex: 'email',
      title: '账号email',
      width: 200,
    },
    {
      dataIndex: 'roleName',
      title: '角色名称',
      width: 200,
    },
    {
      dataIndex: 'sex',
      title: '性别',
      width: 200,
    },
    {
      dataIndex: 'initPassword',
      title: '初始密码明文',
      width: 200,
      customRender: ({ text, record }) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ flexGrow: 1, textAlign: 'center' }}>
              {state[record.id] ? text : '******'}
            </span>
            <span
              class="eye-icon"
              onClick={() => togglePasswordVisibility(record)}
              style={{ cursor: 'pointer' }}
            >
              {state[record.id] ? (
                <img src={EyeOpenSVG} alt="Open Eye" width="24" height="24" />
              ) : (
                <img src={EyeClosedSVG} alt="Closed Eye" width="24" height="24" />
              )}
            </span>
          </div>
        );
      },
    },
    {
      dataIndex: 'isEnable',
      title: '是否启用',
      width: 200,
      customRender: ({ record }) => {
        // console.log('deparValue', record);
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.isEnable === true,
          checkedChildren: '启用',
          unCheckedChildren: '停用',
          loading: record.pendingStatus,
          onChange(checked: CheckedType) {
            record.pendingStatus = true;
            const newStatus = checked ? true : false;
            const { createMessage } = useMessage();

            const data = { id: record.id, isEnable: newStatus };
            setRoleStatus(data)
              .then((res) => {
                console.log('newStatus', res);
                record.isEnable = newStatus;
                console.log('newStatus', record);
                createMessage.success(`已成功修改用户状态`);
              })
              .catch(() => {
                createMessage.error('修改用户状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          },
        });
      },
    },
    {
      dataIndex: 'isUserPassword',
      title: '是否修改过密码',
      width: 200,
      customRender: ({ text }) => {
        return text !== undefined ? (text ? '是' : '否') : '未知';
      },
    },
    // {
    //   dataIndex: 'expirationTime',
    //   title: '账号过期时间',
    //   width: 200,
    //   edit: true,
    //   editComponent: 'DatePicker',
    //   editComponentProps: {
    //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
    //     format: 'YYYY-MM-DD HH:mm:ss',
    //   },
    // },
  ];
}
export function getSearchFormConfig(): Partial<FormProps> {
  return {
    baseColProps: { sm: 10, md: 8, xl: 6 },
    labelWidth: 100,
    labelAlign: 'right',
    schemas: [
      {
        field: 'userName',
        label: '学号/教师工号',
        component: 'Input',
        colProps: { span: 4 },
      },
      {
        field: 'nikeName',
        label: '姓名',
        component: 'Input',
        colProps: { span: 4 },
      },
      {
        field: 'email',
        label: '账号email',
        component: 'Input',
        colProps: { span: 4 },
      },
      // {
      //   field: 'roleName',
      //   label: '角色名称',
      //   component: 'Select',
      //   colProps: { span: 4 },
      // },
    ],
  };
}
export function getFormSchema(options): FormSchema[] {
  return [
    {
      field: 'roleName',
      label: '角色名称',
      component: 'Select',
      required: true,
      componentProps: {
        changeOnSelect: true,
        options: options,
      },
    },
    {
      field: 'userName',
      label: '学号/教师工号',
      component: 'Input',
      required: true,
    },
    {
      field: 'nikeName',
      label: '姓名',
      component: 'Input',
      required: true,
    },
    {
      field: 'sex',
      label: '性别',
      component: 'Select',
      // required: true,
      componentProps: {
        changeOnSelect: true,
        options: [
          { value: '男', label: '男' },
          { value: '女', label: '女' },
        ],
      },
    },
    {
      field: 'email',
      label: '账号email',
      component: 'Input',
      required: true,
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

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve();
            isAccountExist(value)
              .then(resolve)
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'roleName',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
