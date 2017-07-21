import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { BasicAuthenticationHttp } from "./basic-authentication-http.service";
import { ResourceRange } from "app/shared/entity/resource-range";

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

    //根据类名和角色名获取范围
    getByClassName(className:string):Promise<{rows:any[]}>{
        return this.http.get(this.serverUrl+"?resourceclassname="+className)
                    .toPromise()
                    .then( response =>{
                                let returnData = response.json();
                                return {
                                    rows:returnData,
                                }
                    })
                    .catch(this.handleError);
    }

    //根据资源类型id和角色获取范围
    getByResourceId(resourceId:number):Promise<{rows:any[]}>{
        return this.http.get(this.serverUrl+"?resourceId="+resourceId)
                    .toPromise()
                    .then( response =>{
                                let returnData = response.json();
                                return {
                                    rows:returnData,
                                }
                    })
                    .catch(this.handleError);
    }

    //保存
    save(range:any): any{
        return this.http.post(this.serverUrl,JSON.stringify(range))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
    }

    //删除
    delete(ranges:ResourceRange[]): Promise<{sucess:boolean,message:string}>{
        var arrIds = [];
        for(let i=0;i<ranges.length;i++){
            arrIds.push(ranges[i].id);
        }
        return this.http.delete(this.serverUrl, arrIds)
                        .toPromise()
                        // .then(response => response.json())
                        .catch(this.handleError);
  }

    private handleError(error: any): Promise<any>{
        return Promise.reject(error.json() || error);
    }
}