import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-exit-game-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './exit-game-dialog.component.html',
  styleUrl: './exit-game-dialog.component.css'
})
export class ExitGameDialogComponent {

  constructor(private dialogRef: MatDialogRef<ExitGameDialogComponent>) { }

  confirmExit(): void {
    this.dialogRef.close(true);
}

}
