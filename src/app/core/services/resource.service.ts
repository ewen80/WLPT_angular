import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Resource } from 'app/shared/entity/resource';
import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from './basic-authentication-http.service';
import { SerializationHelper } from "../../shared/helper/serialize/serialization-helper";

@Injectable()
export class ResourceService {

  private serverUrl: string = this.appConfig.getConfig("Server").Url + "/resourcetypes";
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
    console.log('ResourceService created');
  }

  // //获取信息（分页）
  // getResourcesWithPage(pageIndex:number,pageSize:number,serialization:SerializationHelper): Promise<{rows:Resource[],rowCount:number}>{
  //   var queryString:string = this.serverUrl+'?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString();
  //   var filterString = serialization.serialize();
  //   if(filterString){
  //     queryString += "&filter=" + filterString;
  //   }
  //   // console.log(queryString);
  //   return this.http.get(queryString)
  //                     .toPromise()
  //                     .then( response => {
  //                               let returnData = response.json();
  //                               return {
  //                                 rows:returnData.content,
  //                                 rowCount:returnData.totalElements
  //                               }
  //                     })   
  //                     .catch(this.handleError);   
  // }

  getResources(): Promise<Resource[]>{
    return this.http.get(this.serverUrl)
                      .toPromise()
                      .then( response => {
                        return response.json();
                      })
                      .catch(this.handleError);
  }
  //获取单个资源信息
  getResource(className: string): Promise<Resource>{
    //将className的.替换为$
    return this.http.get(this.serverUrl+'/'+className.replace(/\./g,"$"))
                      .toPromise()
                      .then( response => {
                        //如果找不到，服务器端返回body为空转换json会报错
                        try{
                          return response.json() as Resource
                        }catch(err){
                          return null;
                        }
                      })
                      .catch(this.handleError);
  }

  //保存
  save(resource:Resource): Promise<{sucess:boolean,message:string}>{
    return this.http.post(this.serverUrl,JSON.stringify(resource))
                      .toPromise()
                      .then( response => response.json())
                      .catch( response => this.handleError(response));
  }

  //删除
  delete(resources:Resource[]): Promise<{sucess:boolean,message:string}>{
    var arrIds = [];
    for(let i=0;i<resources.length;i++){
      arrIds.push(resources[i].id);
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
