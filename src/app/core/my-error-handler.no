import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './user/authentication/authentication.service';

@Injectable()
export class MyErrorHandler extends ErrorHandler {

    private router:Router;
    
    // constructor(private injector:Injector){
    //     super();
    // }

    constructor(private authenticationService:AuthenticationService,private injector:Injector){
        super();
    }

    private gotoLogin(){
        if(!this.router)
            this.router = this.injector.get(Router);
        this.router.navigate(['/login']);
    }

    handleError(error) {
        let handled:boolean = false;
        console.log('this is my error handler! ' + error );
        if(error &&  error.hasOwnProperty('rejection')){
            switch(error.rejection.status){
                //TODO:临时，等处理完getLoginInfo的服务器版本后删除
                case 404:
                    handled = true;
                    break;
                case 401:
                    handled = true;
                    this.authenticationService.redirectUrl = error.rejection._body ? JSON.parse(error.rejection._body).path : '';
                    this.gotoLogin();
                    break;
                case 500:
                    handled = true;
            }
        }

        if(!handled){
            super.handleError(error);
        }
        
    }
}