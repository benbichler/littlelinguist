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
  selector: 'app-scrambled-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgClass],
  templateUrl: './scrambled-dialog.component.html',
  styleUrl: './scrambled-dialog.component.css',
})
export class ScrambledDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ScrambledDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
