import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from '../../services/core.service';
import { RegxPassword } from '../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  message: string = '';


  hide = true;
  Confirmhide = true;

  constructor(private _CoreService: CoreService, private _ToastrService: ToastrService, private _Router: Router,public dialog: MatDialog,) { }

  ResetForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required, ]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)])
  });


  onSubmit(data:FormGroup){
    this._CoreService.onResetPassword(data.value).subscribe({
      next:(res)=>{
       
      },
      error:(err:any)=>{
        this._ToastrService.error(err.message, 'Error ! ');
      },
      complete:()=>{
        
        this._ToastrService.success('Your Password Changed Successfully','Success')
        this._Router.navigate(['/core/login'])


      }
    })
  }

}
