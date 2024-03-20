import { defHttp } from '@/utils/http/axios';

export function login(data): Promise<string> {
  return defHttp.request({
    url: `/user/login`,
    method: 'post',
    data: data,
  });
}

export function getUserInfo(): Promise<object> {
  return defHttp.request({
    url: `/user/userInfo`,
    method: 'get',
  });
}
