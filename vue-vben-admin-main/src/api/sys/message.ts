import { defHttp } from '@/utils/http/axios';

export function add(data): Promise<Object> {
  return defHttp.request({
    url: `/message/add`,
    method: 'post',
    data: data,
  });
}
export function replay(id, data): Promise<Object> {
  return defHttp.request({
    url: `/message/replay/${id}`,
    method: 'post',
    data: data,
  });
}
export function list(): Promise<Object> {
  return defHttp.request({
    url: `/message/list`,
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
    url: `/testNie/${id}`,
    method: 'get',
  });
}
export function updateById(id, data): Promise<Object> {
  return defHttp.request({
    url: `/testNie/update/${id}`,
    method: 'put',
    data,
  });
}
export function deleteById(id): Promise<Object> {
  return defHttp.request({
    url: `/message/${id}`,
    method: 'delete',
  });
}
export function selectlist(): Promise<Object> {
  return defHttp.request({
    url: `/role/selectlist`,
    method: 'get',
  });
}
