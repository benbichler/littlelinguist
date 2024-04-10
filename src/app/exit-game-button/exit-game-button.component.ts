import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-game-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './exit-game-button.component.html',
  styleUrl: './exit-game-button.component.css',
})
export class ExitGameButtonComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/cards']);
      } else {
        console.log('User decided to stay in the game.');
      }
    });
  }
}
