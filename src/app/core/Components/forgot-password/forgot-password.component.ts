import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from '../../services/core.service';
import { HelperService } from 'src/app/shared/helper.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _CoreService: CoreService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _helper: HelperService

  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessageforEmail() {
    return this._helper.getErrorMessageforEmail(this.forgotPasswordForm, 'email', { required: 'required', email: 'email' })
  }


}



