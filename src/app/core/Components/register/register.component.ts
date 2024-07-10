import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from '../../services/core.service';
import { RegxPassword } from '../login/login.component';
import { VerifyComponent } from '../verify/verify.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService, RegxPhoneNumber, RegxUserName, confirmPasswordValidator } from 'src/app/shared/helper.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  message: string = '';
  files: File[] = [];
  hidePass = true;
  hideConfirmPass = true;
  profileImgValue: any


  constructor(private _helper: HelperService, public dialog: MatDialog, private _CoreService: CoreService, private _ToastrService: ToastrService, private _Router: Router) {

  }



  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern(RegxUserName), Validators.minLength(4)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(RegxPhoneNumber)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, confirmPasswordValidator]),

  })



  onRegister(data: FormGroup) {
    let registerFormData = new FormData()
    registerFormData.append('profileImage', this.profileImgValue)
    registerFormData.append('userName', data.value.userName)
    registerFormData.append('email', data.value.email)
    registerFormData.append('phoneNumber', data.value.phoneNumber)
    registerFormData.append('password', data.value.password)
    registerFormData.append('confirmPassword', data.value.confirmPassword)
    registerFormData.append('country', data.value.country)
    console.log(data.value);

    console.log(registerFormData);
    this._CoreService.register(registerFormData).subscribe({
      next: (response) => {
        console.log(response);

        this._ToastrService.success(response.message);
      }, error: (error) => {

        this._ToastrService.error(error.error.message, 'Error ! ');
        console.log(error);

      }, complete: () => {
        this.openDialog()
      },
    })
  }

  onSelect(event: any) {
    console.log(event.addedFiles[0]);
    this.profileImgValue = event.addedFiles[0]
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.profileImgValue = false
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      height: '400px',
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return

      if (Object.keys(result).length === 0) return

      this._CoreService.verify(result).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message);
        }, error: (error) => {
          this._ToastrService.error(error.error.message, 'Error ! ');
        }, complete: () => this._Router.navigate(['/core/login'])
      })


    });
  }


  getErrorMessageforName() {
    return this._helper.getErrorMessageforName(this.registerForm, 'userName', { name: 'required', pattern: 'pattern' })
  }

  getErrorMessageforEmail() {

    return this._helper.getErrorMessageforEmail(this.registerForm, 'email', { required: 'required', email: 'email' })
  }

  getErrorMessageForCountry() {
    return this._helper.getErrorMessageforEmail(this.registerForm, 'country', { required: 'required' })
  }


  getErrorMessageforPasswrod() {
    return this._helper.getErrorMessageforPasswrod(this.registerForm, 'password', { required: 'required', minlength: 'minlength', maxlength: 'maxlength', pattern: 'pattern' })
  }

  getErrorMessageForPhoneNumber() {
    return this._helper.getErrorMessageForPhoneNumber(this.registerForm, 'phoneNumber', { required: 'required', pattern: 'pattern' })
  }


  // getErrorMessageForCountry() {
  //   return this._helper.getErrorMessageForPhoneNumber(this.registerForm, 'country', 'required')
  // }


}
