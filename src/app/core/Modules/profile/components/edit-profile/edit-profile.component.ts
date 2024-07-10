import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models/iprofile';
import { EditProfileService } from './services/edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileImgValue: any
  previewImg: string = ''
  profilePath!: string
  baseUrl: string = 'https://upskilling-egypt.com:3003/'
  defaultImg = '../../../../../../assets/images/avatar.png'
  files: File[] = [];
  hideConfirmPass = true;

  updateProfileForm: FormGroup = new FormGroup({
    userName: new FormControl(null),
    email: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null),
  })

  constructor(private _Router: Router, private _ToastrService: ToastrService, private _EditProfileService: EditProfileService, private _ProfileService: ProfileService) { }

  ngOnInit(): void {
    this.CurrentUser()

  }


  fillForm(res: IProfile) {
    this.updateProfileForm.patchValue({
      userName: res.userName,
      email: res.email,
      country: res.country,
      phoneNumber: res.phoneNumber,
    })
    this.previewImg = this.baseUrl + res.imagePath
  }

  onUpdateProfile(data: FormGroup) {
    console.log(data.value)
    let dataForm = new FormData
    dataForm.append('userName', data.value.userName)
    dataForm.append('email', data.value.email)
    dataForm.append('country', data.value.country)
    dataForm.append('phoneNumber', data.value.phoneNumber)
    dataForm.append('confirmPassword', data.value.confirmPassword)

    if (this.previewImg) {
      dataForm.append('profileImage', this.previewImg)
    } else {
      dataForm.append('profileImage', this.profileImgValue)

    }

    this._EditProfileService.updateProfile(dataForm).subscribe({
      next: (res) => {
        console.log('UpdateDone: ' + res);

        this._ToastrService.success('Your Profile UPdated Now', 'Success')
      },
      error: (err) => this._ToastrService.error(err.error.message, 'Error ! '),
      complete: () => {

        this._Router.navigate(['/core/dashboard'])
        console.log('complete');

      }

    })
  }

  CurrentUser() {
    this._ProfileService.getCurrentuser().subscribe({
      next: (res) => {
        if (res) {
          this.fillForm(res)
        }
      },
      error: (err) => console.log(err)
    })
  }


  get email() {
    return this.updateProfileForm.get('email')
  }
  get country() {
    return this.updateProfileForm.get('country')
  }
  get phoneNumber() {
    return this.updateProfileForm.get('phoneNumber')
  }
  get confirmPassword() {
    return this.updateProfileForm.get('phoneNumber')
  }



  onSelect(event: any) {
    console.log(event.addedFiles[0]);
    this.profileImgValue = event.addedFiles[0]
    this.files.push(...event.addedFiles);
    this.previewImg = ''
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.profileImgValue = false
  }

  removeImg(event: any) {
    event.value = null
  }
}
