// import { useUserStore } from '@/store/modules/user';

// 获取用户信息，使用 async/await 等待 Promise 解析
// const userInfo = useUserStore();

// 假设 userInfo 包含了一个属性用来表示用户的角色信息，比如 roleName
// const role = userInfo.getUserInfo.roleName;

// // 定义一个空对象用于动态赋值
// const RoleEnum = {};

// // 根据后端返回的角色信息设置不同的枚举值
// switch (role) {
//   case 'admin':
//     RoleEnum[role.toUpperCase()] = 'SUPER';
//     break;
//   case 'user':
//     RoleEnum[role.toUpperCase()] = 'user';
//     break;
//   default:
//     // 如果后端返回的角色信息无法匹配任何枚举值，你可以设置一个默认值或者抛出错误
//     // roleEnumValue = RoleEnum.DEFAULT;
//     throw new Error('Unknown role from backend');
// }

// // 枚举类型定义
// export { RoleEnum };
export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',
}
