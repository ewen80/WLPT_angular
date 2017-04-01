import {Component, OnInit, Input} from '@angular/core';
import {ChatService} from "../chat.service";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'chat-form',
  templateUrl: './chat-form.component.html',
})
export class ChatFormComponent implements OnInit {

  public message: string = '';

  public user: any;

  public enterToSend: boolean = false;

  constructor(private chatService: ChatService, private userService: UserService) { }


  ngOnInit() {
    /**暂时注释 因为这里使用了smartadmin的userService，此service已被改写所以导致程序出错 */
    // this.chatService.messageToSubject.subscribe((user)=>{
    //   this.message += (user.username + ', ');
    // });

    // this.user = this.userService.userInfo;
    // this.userService.user.subscribe((user)=>{
    //   this.user = user
    // })
  }

  sendMessage(){
    if(this.message.trim() == '') return;
    this.chatService.sendMessage({
      body: this.message,
      user: this.user,
      date: new Date()
    });
    this.message = ''

  }

  sendMessageEnter(){
    if(this.enterToSend){
      this.sendMessage()
    }
  }

}
