import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { BasicAuthenticationHttp } from '../basic-authentication-http.service';
import { Menu } from "app/core/entity/resources/menu";

@Injectable()
export class MenuService {

  private serverUrl: string = this.appConfig.getConfig("Server").Url + "/resources/menus";
  
  constructor(private http:BasicAuthenticationHttp, private appConfig:AppConfig){
    console.log('MenuService created');
  }

  //获取所有菜单节点(树形)
  getAll(): Promise<Menu[]>{
    return this.http.get(this.serverUrl)
                      .toPromise()
                      .then( response => response.json())   
                      .catch(this.handleError);   
  }

  //获取有权限的菜单树
  getAuthorizedMenuTree(userId:string): Promise<Menu[]>{
    return this.http.get(this.serverUrl+"/authorized/"+userId)
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  save(menu:Menu): Promise<Menu>{
    return this.http.post(this.serverUrl,JSON.stringify(menu))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  delete(menuId:number): Promise<void>{
    return this.http.delete(this.serverUrl + '/' + menuId).toPromise();
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
