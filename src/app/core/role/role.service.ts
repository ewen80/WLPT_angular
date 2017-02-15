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
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfigService){
    console.log('RoleService created');
  }

  //获取角色信息（分页）
  getRolesWithPage(pageIndex:number,pageSize:number): Promise<{rows:Role[],rowCount:number}>{
        return this.http.get(this.appConfig.setting.Server.Url+'/roles?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString())
                      .toPromise()
                      .then( response => {
                                let returnData = response.json();
                                return {
                                  rows:returnData.content,
                                  rowCount:returnData.totalElements
                                }
                      })
                      
  }

  //获取角色通过角色名称
  getRolesByName(name:string):Promise<Role>{
    return this.http.get(this.appConfig.setting.Server.Url+"/roles/byname/"+name)
            .toPromise()
            .then( response => response.json());
  }

  //获取角色信息
  getRole(id: string): Promise<Role>{
    return this.http.get(this.appConfig.setting.Server.Url+'/roles/'+id)
                      .toPromise()
                      .then( response => response.json() as Role)
                      .catch(this.handleError);
  }

  //添加角色
  addRole(role:Role): Promise<{sucess:boolean,message:string}>{
    return this.http.post('/api/adduser',JSON.stringify(Role))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  //更新角色
  updateRole(role:Role): Promise<{sucess:boolean,message:string}>{
    return this.http.put('/api/updateuser',JSON.stringify(role))
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  //删除角色
  deleteRoles(roles:Role[]): Promise<{sucess:boolean,message:string}>{
    let ids = "";
    for(let i=0;i<roles.length;i++){
      ids += roles[i].id + ',';
    }
    ids = ids.substring(0,ids.length-1);
    return this.http.delete('/api/deleteroles/'+ids)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
