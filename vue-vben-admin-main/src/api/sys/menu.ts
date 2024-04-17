import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = `/menu/selectlistByRoleId`,
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
export function list(params): Promise<Object> {
  return defHttp.request({
    url: `/menu/list`,
    method: 'get',
    params: params,
  });
}
export function deleteById(id): Promise<Object> {
  return defHttp.request({
    url: `/menu/${id}`,
    method: 'delete',
  });
}

export function add(data): Promise<Object> {
  return defHttp.request({
    url: `/menu/add`,
    method: 'post',
    data,
  });
}
export function getMenuList1(): Promise<Object> {
  return defHttp.request({
    url: `/menu/selectlist`,
    method: 'get',
  });
}
// export function getMenuList(): Promise<Object> {
//   return defHttp.request({
//     url: `/menu/selectlist`,
//     method: 'get',
//   });
// }
export function updateById(id, data): Promise<Object> {
  return defHttp.request({
    url: `/menu/${id}`,
    method: 'put',
    data,
  });
}
export function saveRoleMenu(id, data): Promise<Object> {
  return defHttp.request({
    url: `/role/saveRoleMenu/${id}`,
    method: 'post',
    data: data,
  });
}
export function getRoleMenuById(id): Promise<any> {
  return defHttp.request({
    url: `/role/getRoleMenuById/${id}`,
    method: 'get',
  });
}
export function selectlistByRoleId(): Promise<Object> {
  return defHttp.request({
    url: `/menu/selectlistByRoleId`,
    method: 'get',
  });
}
