import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import{ User } from './user';

// import {JsonApiService} from "../../shared/api/json-api.service";

@Injectable()
export class UserService {

  // public user: Subject<any>;
  public user: User;

  // constructor(private jsonApiService:JsonApiService) {
  //   this.user = new Subject();
  // }
  constructor(private http:Http){

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
  getLoginInfo(): Promise<User>{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('/api/getuserinfo', JSON.stringify({ id: currentUser.id }))
                .toPromise()
                .then(response => response.json() as User)
                .catch(this.handleError);
  }

  //获取全部用户信息
  getUsers(): Promise<User[]>{
    return this.http.get('/api/getusers')
                      .toPromise()
                      .then( response => response.json() as User[])
                      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('发生一个错误：', error);
    return Promise.reject(error.message || error);
  }

}
