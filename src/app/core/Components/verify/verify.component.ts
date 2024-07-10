import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  verifyAccount: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<VerifyComponent>,
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
    return this._helper.getErrorMessageforEmail(this.verifyAccount, 'email', { required: 'required', email: 'email' })
  }

  getErrorMesgOTP() {
    return this._helper.getErrorMessageforEmail(this.verifyAccount, 'code', { required: 'required' })
  }


}
