import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
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
