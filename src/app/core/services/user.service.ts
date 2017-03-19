import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../entity/user';
import { AppConfigService } from '../app-config.service';
import { BasicAuthenticationHttp } from '../basic-authentication-http.service';

// import {JsonApiService} from "../../shared/api/json-api.service";

@Injectable()
export class UserService {

  // public user: Subject<any>;

  // constructor(private jsonApiService:JsonApiService) {
  //   this.user = new Subject();
  // }
  constructor(private http:BasicAuthenticationHttp,private appConfig:AppConfigService){
    console.log('UserService created');
  }

  // getLoginInfo():Observable<any> {
  //   return this.jsonApiService.fetch('/user/login-info.json')
  //     .do((user)=>{
  //       this.userInfo = user;
  //     this.user.next(user)
  //   })
  // }

  //获取登录人信息
  // getLoginInfo(): Observable<any> {
  //       var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //       if(currentUser && currentUser.username){
  //         return this.http.post('/api/getuserinfo', JSON.stringify({ username: currentUser.username }))
  //           .map((response: Response) => {
  //               let body = response.json();
  //               if(body){
  //                 return body.data || body;
  //               }else{
  //                 return {};
  //               }
  //           })
  //           .catch( error => {
  //             console.log(error.message);
  //             return Observable.throw(error.message);
  //           })
  //           .do((user)=>{
  //             this.userInfo = user;
  //           });
  //       }else{
  //         return null;
  //       } 
  //   }
  getLoginUser(): Promise<User>{
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser)
      return this.getUser(currentUser.id)
    else
      return this.handleError("Found no Logged User");
  }

  //获取用户信息（分页）
  getUsersWithPage(pageIndex:number,pageSize:number): Promise<{rows:User[],rowCount:number}>{
        return this.http.get(this.appConfig.setting.Server.Url+'/users?pageIndex='+pageIndex.toString()+"&pageSize="+pageSize.toString())
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

  //获取用户信息
  getUser(id: string): Promise<User>{
    return this.http.get(this.appConfig.setting.Server.Url+'/users/'+id)
                      .toPromise()
                      .then( response => {
                        //如果找不到用户，服务器端返回body为空转换json会报错
                        try{
                          return response.json() as User
                        }catch(err){
                          return null;
                        }
                      })
                      .catch(this.handleError);
                      // .catch(reason => console.log("catch response is" + reason))
  }

  //保存用户
  saveUser(user:User): Promise<{sucess:boolean,message:string}>{
    return this.http.post(this.appConfig.setting.Server.Url+'/users',JSON.stringify(user))
                      .toPromise()
                      .then( response => response.json())
                      .catch(this.handleError);
  }

  //删除用户
  deleteUsers(users:User[]): Promise<{sucess:boolean,message:string}>{
    let ids = "";
    for(let i=0;i<users.length;i++){
      ids += users[i].id + ',';
    }
    ids = ids.substring(0,ids.length-1);
    return this.http.delete(this.appConfig.setting.Server.Url+'/users/'+ids)
                    .toPromise()
                    // .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    // console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}