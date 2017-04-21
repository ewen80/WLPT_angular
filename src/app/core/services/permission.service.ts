import { Injectable } from "@angular/core";

import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from "app/core/services/basic-authentication-http.service";


@Injectable()
export class PermissionService {

    private serverUrl: string = this.appConfig.getConfig("Server").Url + "/permissions";

    constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
      console.log('PermissionService created');
    }
}