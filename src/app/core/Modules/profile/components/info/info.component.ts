import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models/iprofile';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  userInfo!: IProfile
  profilePath!: string
  baseUrl: string = 'https://upskilling-egypt.com:3003/'
  defaultImg = '../../../../../../assets/images/avatar.png'
  constructor(private _ProfileService: ProfileService) { }

  ngOnInit(): void {

    this.currentUser()


  }

  currentUser() {
    this._ProfileService.getCurrentuser().subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo = res
      },
      error: (err) => console.log(err)
    })
  }

}
