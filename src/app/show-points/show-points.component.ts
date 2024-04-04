import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-show-points',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './show-points.component.html',
  styleUrl: './show-points.component.css'
})
export class ShowPointsComponent {
  @Input () totalPointsEarned: number = 0;

}
