import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
export function list(params): Promise<Object> {
  return defHttp.request({
    url: `/user/list`,
    method: 'get',
    params: params,
  });
}
export function add(data): Promise<Object> {
  return defHttp.request({
    url: `/user/adduser`,
    method: 'post',
    data,
  });
}
export function getuser(id: string): Promise<Object> {
  return defHttp.request({
    url: `/user/${id}`,
    method: 'get',
  });
}
export function updateuser(id, data): Promise<object> {
  return defHttp.request({
    url: `/user/update/${id}`,
    method: 'PUT',
    data,
  });
}
export function deleteuser(id): Promise<object> {
  return defHttp.request({
    url: `/user/${id}`,
    method: 'delete',
  });
}
export function setRoleStatus(data): Promise<object> {
  return defHttp.request({
    url: `/user/enableuser`,
    method: 'post',
    data,
  });
}
export function updateAvatar(avatarUrl): Promise<object> {
  return defHttp.request({
    url: `/user/updateAvatar?avatarUrl=${encodeURIComponent(avatarUrl)}`,
    method: 'patch',
  });
}
