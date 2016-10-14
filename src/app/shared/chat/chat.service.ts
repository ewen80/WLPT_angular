import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";
import {JsonApiService} from "../api/json-api.service";

@Injectable()
export class ChatService {

  url: string;

  public messageToSubject: Subject<any>;
  public newMessage: Subject<any>;


  constructor(private jsonApiService: JsonApiService) {
    this.url = '/chat/chat.json';
    this.messageToSubject = new Subject();
    this.newMessage = new Subject();
  }


  getChatState()  {
    return this.jsonApiService.fetch(this.url)

  }

  messageTo(user){
    this.messageToSubject.next(user)
  }

  sendMessage(message){
    this.newMessage.next(message)

  }



}
