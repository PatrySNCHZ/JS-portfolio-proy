import { Component, OnInit } from '@angular/core';
import { AttachSession } from 'protractor/built/driverProviders';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
      public title: string;
      public project: Project;
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
      this.title = "Crear proyecto";
      this.project = new Project('','','','',2020,'','');
      this.status = '';
      this.filesToUpload = [];
      this. save_project= '';
      this.url =global.url;
   }



  ngOnInit(): void {
  }


    onSubmit(form: any){

      // guardar los datos
      this._ProjectService.saveProject(this.project).subscribe(
        response => {
            if(response){
          
              // subir la imagen
              if(this.filesToUpload){
                this._UploadService.makeFileRequest(global.url+'upload-image/'+ response.project._id, [], this.filesToUpload, 'image')
                .then((result:any)=>{
                  this.save_project = response.project;
                });
                this.status = "success";
                form.reset();
              }else{
                this.save_project= response.project;
                this.status = "success";
              }
            }else{
              this.status = "failed";
            }
        },
        error =>{
          console.log(<any>error);
         
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
