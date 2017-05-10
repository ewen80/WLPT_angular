import { Injectable } from "@angular/core";

import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from "app/core/services/basic-authentication-http.service";
import { PermissionWrapperDTO } from "app/core/entity/permission-wrapper-dto";


@Injectable()
export class PermissionService {

    private serverUrl: string = this.appConfig.getConfig("Server").Url + "/permissions";

    constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
      console.log('PermissionService created');
    }

    //获取权限
    getByResourceRanges(resourceRangeIds: string[]): Promise<PermissionWrapperDTO> {
        //字符串数组转换为,分割字符串
        var ids = resourceRangeIds.join(',');
        if(ids.length > 0) {
            return this.http.get(this.serverUrl+'/'+ids)
                        .toPromise()
                        .then( response => response.json() as PermissionWrapperDTO);
        } else {
            throw "获取权限时出错：资源范围Id不能为空"
        }
    }

    //保存
    save(wrapper: PermissionWrapperDTO): Promise<number>{
        return this.http.post(this.serverUrl,JSON.stringify(wrapper))
                      .toPromise()
                      .then( response => response.json());
    }
}