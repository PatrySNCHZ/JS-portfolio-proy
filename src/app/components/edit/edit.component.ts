import { Component, OnInit } from '@angular/core';
import { AttachSession } from 'protractor/built/driverProviders';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})

export class EditComponent implements OnInit {
  public title: string;
  public project!: Project;
  public save_project: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

constructor(
  private _ProjectService : ProjectService,
  private _UploadService : UploadService,
  private _route: ActivatedRoute,
  private _router: Router
) {
  this.title = "Editar proyecto";
  this.status = '';
  this.filesToUpload = [];
  this. save_project= '';
  this.url=global.url;
}

ngOnInit(): void {
  this._route.params.subscribe(params =>
    {
      let id=params.id;
      this.getProject(id);
    
    });
}


getProject(id: any){
  this._ProjectService.getProject(id).subscribe(
    response => {
      this.project = response.project;
    },
    error => {
      console.log(<any>error);
    }
  )
}

onSubmit(){
  this._ProjectService.editProject(this.project).subscribe(
    response =>{
      if(response.project){
          
        // subir la imagen sólo si hay algo que subir
        if(this.filesToUpload){
          this._UploadService.makeFileRequest(global.url+'upload-image/'+ response.project._id, [], this.filesToUpload, 'image')
          .then((result:any)=>{
            this.save_project = result.project;
            this.status = "success";
          });
        }else{
          this.save_project= response.project;
          this.status = "success";
        }
      }else{
        this.status = "failed";
      }
    },
    error => {
      console.log(<any>error);
    }

  )
}

fileChangeEvent(fileInput: any){
  this.filesToUpload = <Array<File>>fileInput.target.files;
}


}
