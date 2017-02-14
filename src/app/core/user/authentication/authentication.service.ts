/*
2016/9/29 created by wenliang 

用户登录和登出操作服务
*/

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';


import { Http, Headers, Response } from '@angular/http';

import { AppConfigService } from '../../app-config.service';
import { BasicAuthenticationHttp } from '../../basic-authentication-http.service';

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  authToken: string;    //登录Token

  constructor(private http: Http,private appConfig: AppConfigService) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser && currentUser.token){
        this.authToken = currentUser.token;
        this.isLoggedIn = true;
    }
  }

  //登录操作,Basic Auth认证方式
  login(userid, password): Observable<boolean> {
      if(!this.isLoggedIn){
          this.authToken = window.btoa(userid + ":" + password);
            //Basic Auth认证方式访问服务器一个单独认证页面，如果能访问表示认证成功
            return this.http.put(this.appConfig.setting.Server.Url+this.appConfig.setting.Server.AuthenticationApi, 
                                    JSON.stringify({userId:userid,authToken:this.authToken}),
                                    {headers:new Headers({'Content-Type':'application/json'})})
                .map((response: Response) => {
                    // login successful if there's a token in the response
                    let authResult = response.json();
                    if (authResult) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ id: userid, token: this.authToken }));

                        // return true to indicate successful login
                        this.isLoggedIn = true;
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                });
      }else{
          Observable.of(true);
      }
        
    }

    //登出操作,清空token
    logout(): void {
        // clear token remove user from local storage to log user out
        this.isLoggedIn = false;
        localStorage.removeItem('currentUser');
    }
}