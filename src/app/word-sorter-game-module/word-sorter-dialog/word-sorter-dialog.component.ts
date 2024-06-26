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
  selector: 'app-word-sorter-dialog',
  standalone: true,
  imports: [MatButtonModule, NgClass, MatDialogModule],
  templateUrl: './word-sorter-dialog.component.html',
  styleUrl: './word-sorter-dialog.component.css',
})
export class WordSorterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WordSorterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
