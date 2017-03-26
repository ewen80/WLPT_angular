import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig{
    private config: Object = null;

    constructor(private http: Http){}

    getConfig(key: any){
        return this.config[key];
    }
    public load(): Promise<any>{
        return new Promise((resolve, reject) => {
            this.http.get('/app.config.json')
                .map( res => res.json())
                .catch( err => {
                    console.error('读取系统配置文件 app.config.json 出错');
                    reject(err);
                    return Observable.throw(err.json().error || 'read app config error');
                })
                .subscribe( (responseData) => {
                    this.config = responseData;
                    resolve(true);
                })

        });
    }
}