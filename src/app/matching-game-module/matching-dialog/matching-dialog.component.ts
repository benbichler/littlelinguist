import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgClass } from '@angular/common';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
