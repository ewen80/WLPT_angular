/*
    created by wenliang on 2016-9-26
    模拟web后台服务，为前台提供数据支持

*/

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, ConnectionBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from '../../core/user/user';


const allUsers = [
    {
        "id":"test",
        "name":"测试用户",
        "password":"test",
        "picture": "/assets/img/avatars/sunny.png"
    },
    {
        "id":"user1",
        "name":"用户1",
        "password":"111111"
    },
    {
        "id":"user2",
        "name":"用户2",
        "password":"111111"
    }
];

export function httpFactory(backend: MockBackend, options: BaseRequestOptions){
    // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // fake authenticate api end point
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());

                    // check user credentials and return fake token if valid
                    for(let i=0; i<allUsers.length; i++){
                        let user = allUsers[i];
                        if(params.userid === user.id && params.password === user.password){
                            connection.mockRespond(new Response(
                                new ResponseOptions({ status: 200, body: { token: 'fake-authenticate-token' } })
                            ));
                            break;
                        }
                    }
                    connection.mockRespond(new Response(
                                new ResponseOptions({ status: 200 })
                            ));
                }

                // fake users api end point
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake authenticate token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-authencate-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: allUsers })
                        ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }

                //获取单个用户信息,/api/getuserinfo
                if(connection.request.url.endsWith('/api/getuserinfo') && connection.request.method === RequestMethod.Post ){
                    let params = JSON.parse(connection.request.getBody());
                    for(let i=0; i<allUsers.length; i++){
                        if(params.id === allUsers[i].id){
                            connection.mockRespond(new Response(
                            new ResponseOptions({ status:200, body: allUsers[i]})
                        ));
                            break;
                        }
                    }
                }

                //获取所有用户信息,/api/getusers
                if(connection.request.url.endsWith('/api/getusers') && connection.request.method === RequestMethod.Get ){
                    connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200,body: allUsers })
                        ));
                }
                

            }, 500);

        });

        return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: httpFactory,
    deps: [MockBackend, BaseRequestOptions]
};