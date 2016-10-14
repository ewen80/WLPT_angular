import {Component, OnInit} from '@angular/core';
import {RecentProjectsService} from "./recent-projects.service";
import {I18nPipe} from "../../../i18n/i18n.pipe";

@Component({
  selector: 'sa-recent-projects',
  templateUrl: 'recent-projects.component.html',
  providers: [RecentProjectsService]
})
export class RecentProjectsComponent implements OnInit {

  projects: Array<any>;

  constructor(private projectsService: RecentProjectsService) {

  }

  ngOnInit() {
    this.projects = this.projectsService.getProjects()
  }

  clearProjects(){
    this.projectsService.clearProjects();
    this.projects = this.projectsService.getProjects()

  }

}
