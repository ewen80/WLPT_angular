import { Injectable } from "@angular/core";

import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from "app/core/services/basic-authentication-http.service";
import { Permission } from "app/core/entity/permission";


@Injectable()
export class PermissionService {

    private serverUrl: string = this.appConfig.getConfig("Server").Url + "/permissions";

    constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
      console.log('PermissionService created');
    }

    getByResourceRangeIdAndRoleId(resourceRangeId:number, roleId:string) {

    }

    //保存
    save(p:Permission): Promise<{sucess:boolean,message:string}>{
        return this.http.post(this.serverUrl,JSON.stringify(p))
                      .toPromise()
                      .then( response => response.json());
    }
}