import { defHttp } from '@/utils/http/axios';

export function login(data): Promise<object> {
  return defHttp.request({
    url: `/user/login`,
    method: 'post',
    data: data,
  });
}
