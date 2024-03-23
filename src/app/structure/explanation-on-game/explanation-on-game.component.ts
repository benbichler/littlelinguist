import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-explanation-on-game',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './explanation-on-game.component.html',
  styleUrl: './explanation-on-game.component.css'
})
export class ExplanationOnGameComponent {
  constructor (private router: Router) { }

  moveToHome(): void {
    this.router.navigate(['/cards']);
  }

}
