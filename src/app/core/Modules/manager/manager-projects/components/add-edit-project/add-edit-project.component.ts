import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IProjectById } from '../../../models/projects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {


  // constructor(private _ProjectService: ProjectService, private _Router: Router) { }
  ProjectById: IProjectById | any;
  viewUserId: number = 0;
  urlPath: any;

  constructor(private _ProjectService: ProjectService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) {
    this.viewUserId = _ActivatedRoute.snapshot.params['id'];
    console.log(this.viewUserId)

  }

  ngOnInit(): void {
    if (this.viewUserId > 0) {
      this.getProjectById(this.viewUserId);
    }
  }


  projectForm = new (FormGroup)({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  })


  onSubmit(data: FormGroup) {
    if(this.viewUserId){
      this._ProjectService.onEditProject(this.viewUserId,data.value).subscribe({
        next: (res) => {
          console.log(res);
  
        }, error: () => {
          this._ToastrService.error('error in this process')
  
        }, complete: () => {
          this._Router.navigate(['/core/dashboard/manager/projects']);
          this._ToastrService.success('Project Updated Successfully')
  
        }
      })
    } else{
      this._ProjectService.onAddProject(data.value).subscribe({
        next: (res) => {
          console.log(res);
  
        }, error: () => {
          this._ToastrService.error('error in this process')
  
        }, complete: () => {
          this._Router.navigate(['/core/dashboard/manager/projects']);
          this._ToastrService.success('Project Added Successfully')
  
        }
      })
      
    }
    
  }



  getProjectById(id: number) {
    this._ProjectService.getProjectById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.ProjectById = response;
        console.log(this.ProjectById)
      }, error: (error) => {
        // this._ToastrService.error('error in edit process')
      }, complete: () => {
        this.projectForm.patchValue({
          title: this.ProjectById.title,
          description: this.ProjectById.description
        });
        // this._ToastrService.success('edit process success')

      }
    })
  }
}
