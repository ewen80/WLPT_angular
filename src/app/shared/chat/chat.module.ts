import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import {SmartadminWidgetsModule} from "../widgets/smartadmin-widgets.module";
import {DropdownModule} from "ng2-bootstrap/ng2-bootstrap";
import {ChatService} from "./chat.service";
import { ChatComponent } from './chat/chat.component';
import { ChatUsersComponent } from './chat/chat-users.component';
import { ChatBodyComponent } from './chat/chat-body.component';
import { ChatFormComponent } from './chat/chat-form.component';
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "../utils/utils.module";
import {UserModule} from "../user/user.module";
import { AsideChatComponent } from './aside-chat/aside-chat.component';
import { AsideChatUserComponent } from './aside-chat-user/aside-chat-user.component';
import {PopoverModule} from "ng2-popover/src/index";

@NgModule({
  imports: [
      PopoverModule,
    CommonModule, FormsModule, DropdownModule, UtilsModule, UserModule, SmartadminWidgetsModule],
  declarations: [ChatWidgetComponent, ChatComponent, ChatUsersComponent, ChatBodyComponent, ChatFormComponent, AsideChatComponent, AsideChatUserComponent],
  exports: [ChatWidgetComponent, AsideChatComponent, AsideChatUserComponent ],
  providers: [ChatService]

})
export class ChatModule{}
