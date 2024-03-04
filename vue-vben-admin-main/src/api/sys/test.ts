import { defHttp } from '@/utils/http/axios'; 

export function test(): Promise<object> {
    return defHttp.get(
        { 
            url: `/findById`,
            // method: 'get'     
        
        }
        
        );
  }