/*
    created by wenliang 20170214
    用于BasicAuthentication的HTTP服务

*/
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';

import { AuthenticationService } from './user/authentication/authentication.service';

@Injectable()
export class BasicAuthenticationHttp {

    constructor(private http:Http,private authentication:AuthenticationService){

    }

    private headers:Headers = new Headers({
                                            'Content-Type':'application/json',
                                            'Authorization': 'Basic ' + this.authentication.authToken});

    get(url:string):Observable<any>{
        return this.http.get(url,{headers:this.headers});
    }

    put(url:string,body:string):Observable<any>{
        return this.http.put(url,body,{headers:this.headers});
    }

    post(url:string,body:string):Observable<any>{
        return this.http.post(url,body,{headers:this.headers});
    }

    delete(url:string):Observable<any>{
        return this.http.delete(url,{headers:this.headers});
    }
}