import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-matching-dialog',
  standalone: true,
  imports: [MatDialogModule,],
  templateUrl: './matching-dialog.component.html',
  styleUrl: './matching-dialog.component.css'
})
export class MatchingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MatchingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

