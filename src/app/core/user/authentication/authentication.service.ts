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

import { AppConfig } from '../../app-config.service';

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  token: string;    //登录令牌

  constructor(private http: Http,private appConfig: AppConfig) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;  //当前用户对象和用户的令牌属性必须都有值
    if(this.token){
        this.isLoggedIn = true;
    }
  }

  //登录操作,Basic Auth认证方式，post请求'/api/authenticate'路径,写入token
  login(userid, password): Observable<boolean> {
        let authToken = window.btoa(userid + ":" + password);

        //Basic Auth认证方式访问服务器一个单独认证页面，如果能访问表示认证成功
        return this.http.put(this.appConfig.setting.Server.Url+this.appConfig.setting.Server.AuthenticationApi, JSON.stringify({userId:userid, authToken:authToken}), {headers:new Headers({'Content-Type':'application/json'})})
            .map((response: Response) => {
                // login successful if there's a token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ id: userid, token: token }));

                    // return true to indicate successful login
                    this.isLoggedIn = true;
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    //登出操作,清空token
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem('currentUser');
    }
}