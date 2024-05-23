import { defHttp } from '@/utils/http/axios';

export function roleadd(data): Promise<Object> {
  return defHttp.request({
    url: `/testPh/add`,
    method: 'post',
    data: data,
  });
}
export function list(params): Promise<Object> {
  return defHttp.request({
    url: `/testPh/list`,
    method: 'get',
    params: params,
  });
}
export function esList(): Promise<Object> {
  return defHttp.request({
    url: `/testPh/esList`,
    method: 'get',
  });
}
// export function roledetail(id): Promise<{ id: number }> {
//   return defHttp.request({
//     url: `/role/detail?id=${id}`,
//     method: 'get',
//   });
// }

export function roledetail(id): Promise<{ id: number }> {
  return defHttp.request({
    url: `/testPh/${id}`,
    method: 'get',
  });
}
export function updateById(id, data): Promise<Object> {
  return defHttp.request({
    url: `/testPh/update/${id}`,
    method: 'put',
    data,
  });
}
export function deleteById(id): Promise<Object> {
  return defHttp.request({
    url: `/testPh/${id}`,
    method: 'delete',
  });
}
