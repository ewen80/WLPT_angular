/*
    created by wenliang on 2016-9-26
    模拟web后台服务，为前台提供数据支持

*/

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, ConnectionBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from 'app/shared/entity/user';

let allUsers = new Array<User>();

function createUsers(){
    for(let i=0;i<100;i++){
        let user = new User();
        user.id = "test"+i.toString();
        user.name="测试用户"+i.toString();
        user.password="test";
        user.picture="/assets/img/avatars/sunny.png";
        allUsers.push(user);
    }
}

createUsers();


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
                // if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                //     // check for fake authenticate token in header and return test users if valid, this security is implemented server side
                //     // in a real application
                //     if (connection.request.headers.get('Authorization') === 'Bearer fake-authencate-token') {
                //         connection.mockRespond(new Response(
                //             new ResponseOptions({ status: 200, body: allUsers })
                //         ));
                //     } else {
                //         // return 401 not authorised if token is null or invalid
                //         connection.mockRespond(new Response(
                //             new ResponseOptions({ status: 401 })
                //         ));
                //     }
                // }

                //获取单个用户信息,/api/users/:id
                if(connection.request.url.match(/\/api\/users\/\w+$/)  && connection.request.method === RequestMethod.Get ){
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = urlParts[urlParts.length - 1];
                    let matchedUsers = allUsers.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                }

                //获取所有用户信息,/api/getusers
                if(connection.request.url.match(/\/api\/getusers\?.+$/) && connection.request.method === RequestMethod.Get ){
                    const urlSplit = connection.request.url.split('?');
                    const params = urlSplit[1].split('&');
                    let startPage,endPage;

                    for(let i=0;i<params.length;i++){
                        let kv = params[i].split('=');
                        switch(kv[0]){
                            case 'startPage':
                                startPage = kv[1];
                                break;
                            case 'endPage':
                                endPage = kv[1];
                                break;
                        }
                    }
                    
                    connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200,body: {
                                rows:allUsers.slice(startPage,endPage),
                                rowCount:allUsers.length
                            }})
                        ));
                }
                
                //添加新用户,/api/adduser
                if(connection.request.url.endsWith('/api/adduser') && connection.request.method === RequestMethod.Post){
                    let userDetail = JSON.parse(connection.request.getBody());
                    let user = new User();
                    user.id = userDetail.id;
                    user.name = userDetail.name;
                    user.password = userDetail.password;
                    allUsers.push(user);
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status:200,body:{sucess:true, message:'保存成功'}})
                    ))
                }

                //修改用户,/api/updateuser
                if(connection.request.url.endsWith('/api/updateuser') && connection.request.method === RequestMethod.Put){
                    let userDetail = JSON.parse(connection.request.getBody()) as User;
                    let found =false;
                    for(let i=0; i<allUsers.length; i++){
                        if(allUsers[i].id === userDetail.id){
                            allUsers[i].name = userDetail.name;
                            allUsers[i].password = userDetail.password;

                            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: {sucess:true, message:'保存成功'} })));
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        connection.mockRespond(new Response(new ResponseOptions({ status: 404, body: {sucess:false, message:'用户不存在'} })));
                    }
                }

                if(connection.request.url.match(/\/api\/deleteusers\/.+$/) && connection.request.method === RequestMethod.Delete){
                   // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let ids = urlParts[urlParts.length - 1];
                    let newUsers = new Array<User>();
                    let existIndexs = ids.split(',');
                    
                    for(let k=0;k<allUsers.length;k++){
                        if(existIndexs.indexOf(allUsers[k].id) < 0){
                            newUsers.push(allUsers[k]);
                        }
                    }

                    allUsers = newUsers;
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: {sucess:true, message:'删除成功'} })));
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