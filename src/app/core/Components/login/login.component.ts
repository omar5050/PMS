import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../../services/core.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { HelperService } from 'src/app/shared/helper.service';

export const RegxPassword: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,20}$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  message: string = '';
  
  hide = true;

  constructor(private _helper: HelperService, private _CoreService: CoreService, private _ToastrService: ToastrService, private _Router: Router, public dialog: MatDialog,) {
    this._CoreService.onLogOut();
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)])
  })


  onLogin(data: FormGroup) {
    console.log(data);
    this._CoreService.login(data.value).subscribe({
      next: (response) => {

        this.message = response.message;
        localStorage.setItem('userToken', response.token);
        this._CoreService.getProfile();
      }, error: (error) => {

        this._ToastrService.error(error.error.message, 'Error ! ');
      }, complete: () => {
        this._ToastrService.success(`Welcome Again`);
        this._Router.navigate(['/core/dashboard'])
      },
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return

      if (Object.keys(result).length === 0) return

      this._CoreService.onForgotPassword(result).subscribe({
        next: () => {



        }, error: (error) => {
          this._ToastrService.error(error.error.message, 'Error ! ');
          console.log(error);
        }, complete: () => {
          this._ToastrService.success('Email Reset Successfully', 'Success');
          this._Router.navigate(["/core/resetPassword"]);


        }

      })


    });
  }


  getErrorMessageforEmail() {

    return this._helper.getErrorMessageforEmail(this.loginForm, 'email', { required: 'required', email: 'email' })
  }

  getErrorMessageforPasswrod() {
    return this._helper.getErrorMessageforPasswrod(this.loginForm, 'password', { required: 'required', minlength: 'minlength', maxlength: 'maxlength', pattern: 'pattern' })
  }

}
