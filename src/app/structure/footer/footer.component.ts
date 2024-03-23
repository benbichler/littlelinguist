import { Component } from '@angular/core';
import { MatIconModule} from '@angular/material/icon'
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule,],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor (private router: Router) { }

  navigateToExplanation(): void{
    this.router.navigate(['/explanation']);

  }
}
