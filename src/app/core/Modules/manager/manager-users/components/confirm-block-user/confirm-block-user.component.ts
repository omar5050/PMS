import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-block-user',
  templateUrl: './confirm-block-user.component.html',
  styleUrls: ['./confirm-block-user.component.scss']
})
export class ConfirmBlockUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmBlockUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
