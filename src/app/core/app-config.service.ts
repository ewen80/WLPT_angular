import { OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppConfig {

    //配置存放类
    public setting:any;

    constructor(private http:Http){
        this.readConfig();
    }

    //读取json配置文件
    private readConfig(){
        this.http.get('/app.config.json')
            .toPromise()
            .then( response => this.setting = response.json())
    }
}