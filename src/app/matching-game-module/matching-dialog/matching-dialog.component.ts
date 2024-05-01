import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgClass } from '@angular/common';

export interface DialogData {
  dialogType: 'correctWord' | 'wrong' | 'allGuessed';
  title: string;
  message: string;
  buttonText: string;
}

@Component({
  selector: 'app-matching-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgClass],
  templateUrl: './matching-dialog.component.html',
  styleUrl: './matching-dialog.component.css',
})
export class MatchingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MatchingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
