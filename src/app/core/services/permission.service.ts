import { Injectable } from "@angular/core";

import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from "app/core/services/basic-authentication-http.service";
import { PermissionWrapper } from "app/core/entity/permission-wrapper";


@Injectable()
export class PermissionService {

    private serverUrl: string = this.appConfig.getConfig("Server").Url + "/permissions";

    constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
      console.log('PermissionService created');
    }


    //保存
    save(wrapper: PermissionWrapper): any{
        return this.http.post(this.serverUrl,JSON.stringify(wrapper))
                      .toPromise()
                      .then( response => response.json());
    }
}