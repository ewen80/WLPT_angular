import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { BasicAuthenticationHttp } from "./basic-authentication-http.service";
import { ResourceRange } from "../entity/resource-range";

@Injectable()
export class ResourceRangeService{

    private serverUrl: string = this.appConfig.getConfig("Server").Url + "/resourceranges";
    
    constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
        console.log('ResourceRangeService created');
    }

    //获取全部范围
    getAll(): Promise<{rows:ResourceRange[],rowCount:number}>{
        return this.http.get(this.serverUrl)
                    .toPromise()
                    .then( response => {
                            let returnData = response.json();
                            return {
                                rows:returnData.content,
                                rowCount:returnData.totalElements
                            }
                    })   
                    .catch(this.handleError);   
    }

    private handleError(error: any): Promise<any>{
        return Promise.reject(error.message || error);
    }
}