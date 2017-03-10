import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Role } from '../entity/role';
import { AppConfigService } from '../app-config.service';
import { BasicAuthenticationHttp } from '../basic-authentication-http.service';

@Injectable()
export class RoleService {

  public id:number;

  private serverUrl: string = this.appConfig.setting.Server.Url;
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfigService){
    console.log('RoleService created');
  }

  //获取角色信息（分页）
  getRolesWithPage(pageIndex:number,pageSize:number): Promise<{rows:Role[],rowCount:number}>{
        return this.http.get(this.serverUrl+'/roles?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString())
                      .toPromise()
                      .then( response => {
                                let returnData = response.json();
                                return {
                                  rows:returnData.content,
                                  rowCount:returnData.totalElements
                                }
                      })      
  }

  //获取所有角色信息
  getAllRoles(): Promise<Role[]>{
    return this.http.get(this.serverUrl+"/roles/all")
            .toPromise()
            .then( response => response.json() );
  }

  //获取角色通过角色名称
  getRolesByName(name:string):Promise<Role>{
    return this.http.get(this.serverUrl+"/roles/byname/"+name)
            .toPromise()
            .then( response => response.json());
  }

  //获取角色信息
  getRole(id: string): Promise<Role>{
    return this.http.get(this.serverUrl+'/roles/'+id)
                      .toPromise()
                      .then( response => {
                        //如果找不到角色，服务器端返回body为空转换json会报错
                        try{
                          return response.json() as Role
                        }catch(err){
                          return null;
                        }
                      })
                      .catch(this.handleError);
  }

  //保存角色
  saveRole(role:Role): Promise<{sucess:boolean,message:string}>{
    return this.http.post(this.serverUrl+'/roles',JSON.stringify(role))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  //删除角色
  deleteRoles(roles:Role[]): Promise<{sucess:boolean,message:string}>{
    let ids = "";
    for(let i=0;i<roles.length;i++){
      ids += roles[i].id + ',';
    }
    ids = ids.substring(0,ids.length-1);
    return this.http.delete(this.serverUrl+'/roles/'+ids)
                    .toPromise()
                    // .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
