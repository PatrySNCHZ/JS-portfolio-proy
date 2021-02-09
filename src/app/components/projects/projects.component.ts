import { Component, OnInit } from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Project } from '../../models/project';
import { ProjectService} from '../../services/project.service';
import {global} from '../../services/global'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: String; 
  constructor(
    private _projectService: ProjectService
  ) { 
    this.projects = [];
    this.url = global.url;
  }

  ngOnInit(): void {
      this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response =>{
        if(response){}
            this.projects = response.projects;
      },
      error =>{
          console.log(<any>error);
      }
    );
  }

}
