

import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";

import {RecentProjectsComponent} from "./recent-projects/recent-projects.component";
import {FullScreenComponent} from "./full-screen/full-screen.component";
import {CollapseMenuComponent} from "./collapse-menu/collapse-menu.component";

import {ActivitiesComponent} from "./activities/activities.component";
import {ActivitiesMessageComponent} from "./activities/activities-message/activities-message.component";
import {ActivitiesNotificationComponent} from "./activities/activities-notification/activities-notification.component";
import {ActivitiesTaskComponent} from "./activities/activities-task/activities-task.component";
import {HeaderComponent} from "./header.component";

import {UtilsModule} from "../../utils/utils.module";
import {I18nModule} from "../../i18n/i18n.module";
import {DropdownModule} from "ng2-bootstrap/ng2-bootstrap";
import { SpeechButtonComponent } from './speech-button/speech-button.component';
import {FormsModule} from "@angular/forms";
import {UserModule} from "../../user/user.module";
import {PopoverModule} from "ng2-popover/src/index";


@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    DropdownModule,

    UtilsModule, I18nModule, UserModule, PopoverModule
  ],
  declarations: [
    ActivitiesMessageComponent,
    ActivitiesNotificationComponent,
    ActivitiesTaskComponent,
    RecentProjectsComponent,
    FullScreenComponent,
    CollapseMenuComponent,
    ActivitiesComponent,
    HeaderComponent,
    SpeechButtonComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
