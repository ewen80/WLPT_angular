import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ResourceType } from '../entity/resourcetype';
import { AppConfigService } from '../app-config.service';
import { BasicAuthenticationHttp } from '../basic-authentication-http.service';

@Injectable()
export class ResourceListService {

  public id:number;

  private serverUrl: string = this.appConfig.setting.Server.Url + "/resourcelist";
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfigService){
    console.log('ResourceListService created');
  }

  //获取信息（分页）
  getResourceListWithPage(pageIndex:number,pageSize:number): Promise<{rows:ResourceType[],rowCount:number}>{
        return this.http.get(this.serverUrl+'?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString())
                      .toPromise()
                      .then( response => {
                                let returnData = response.json();
                                return {
                                  rows:returnData.content,
                                  rowCount:returnData.totalElements
                                }
                      })      
  }

  //获取角色信息
  getResourceType(id: number): Promise<ResourceType>{
    return this.http.get(this.serverUrl+'/'+id)
                      .toPromise()
                      .then( response => {
                        //如果找不到，服务器端返回body为空转换json会报错
                        try{
                          return response.json() as ResourceType
                        }catch(err){
                          return null;
                        }
                      })
                      .catch(this.handleError);
  }

  //通过资源名查找资源类型
  getResourceTypesByName(name: string): Promise<ResourceType>{
    return this.http.get(this.serverUrl+'?name='+name)
                      .toPromise()
                      .then( response => {
                        //如果找不到，服务器端返回body为空转换json会报错
                        try{
                          return response.json() as ResourceType
                        }catch(err){
                          return null;
                        }
                      })
                      .catch(this.handleError);
  }

  //保存
  saveResourceType(resourceType:ResourceType): Promise<{sucess:boolean,message:string}>{
    return this.http.post(this.serverUrl,JSON.stringify(resourceType))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  //删除
  deleteResourceTypes(resourceTypes:ResourceType[]): Promise<{sucess:boolean,message:string}>{
    let ids = "";
    for(let i=0;i<resourceTypes.length;i++){
      ids += resourceTypes[i].id + ',';
    }
    ids = ids.substring(0,ids.length-1);
    return this.http.delete(this.serverUrl+ids)
                    .toPromise()
                    // .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
