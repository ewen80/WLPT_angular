import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Resource } from '../entity/resource';
import { AppConfig } from '../app.config';
import { BasicAuthenticationHttp } from './basic-authentication-http.service';
import { SerializationHelper } from "../../shared/helper/serialize/serialization-helper";

@Injectable()
export class ResourceService {

  private serverUrl: string = this.appConfig.getConfig("Server").Url + "/resourcetype";
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
    console.log('ResourceService created');
  }

  //获取信息（分页）
  getResourcesWithPage(pageIndex:number,pageSize:number): Promise<{rows:Resource[],rowCount:number}>{
    //分解filterModel形成query string
    var filterString:string = "";
    // if(filterModel && Object.keys(filterModel).length>0){
    //     let filterNameArray = Object.keys(filterModel); //过滤条件数组
    //     filterNameArray.forEach( (value) => {
    //       console.log(filterModel[value]); //value字段名,filterModel[value]字段值
    //       filterString += 
    //     });
    //   // if(filterModel.className){
    //   //   //全限定名过滤
    //   //   filterString += 
    //   // }
    //   // if(filterModel.name){
    //   //   //资源名过滤
    //   // }
    //   // if(filterModel.deleted){
    //   //   //删除标记过滤
    //   // }
    // }
    return this.http.get(this.serverUrl+'?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString())
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

  //获取角色信息
  getResource(className: string): Promise<Resource>{
    return this.http.get(this.serverUrl+'/'+className)
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
                      .catch(this.handleError);
  }

  //删除
  delete(resources:Resource[]): Promise<{sucess:boolean,message:string}>{
    let classNames = "";
    for(let i=0;i<resources.length;i++){
      classNames += resources[i].className + ',';
    }
    classNames = classNames.substring(0,classNames.length-1);
    return this.http.delete(this.serverUrl+"/"+classNames)
                    .toPromise()
                    // .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
