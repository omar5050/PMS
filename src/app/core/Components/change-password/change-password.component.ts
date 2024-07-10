import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegxPassword } from '../login/login.component';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(private _CoreService: CoreService, private _ToastrService: ToastrService, private _Router: Router, public _MatDialog: MatDialog, public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  see: boolean = true;
  see_2: boolean = true;
  see_3: boolean = true;
  password_type: string = 'text';
  // password_type: string = 'text';
  password_type_2: string = 'text';
  password_type_3: string = 'text';
  message: string = '"Welcome Again"';

  changePassword: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    confirmNewPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
  });

  handleForm(data: FormGroup): void {
    let userData = data.value;
    this._CoreService.onChangePassword(userData).subscribe({
      next: (response) => {
        console.log(response);
      }, error: (err: any) => {
        console.log(err)
        this._ToastrService.error(err.error.message, 'Error! ');
      }, complete: () => {
        this._ToastrService.success(this.message, 'Done🤙✅');
        this.onNoClick();
        this._Router.navigate(['/core/login'])
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleSee() {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }

  toggleSee_2() {
    this.see_2 = !this.see_2;
    this.password_type_2 = this.see_2 ? 'text' : 'password';
  }

  toggleSee_3() {
    this.see_3 = !this.see_3;
    this.password_type_3 = this.see_3 ? 'text' : 'password';
  }


  routToRegister() {
    this._Router.navigate(['/auth/register'])
  }


}
