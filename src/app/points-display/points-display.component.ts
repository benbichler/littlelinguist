import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-points-display',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './points-display.component.html',
  styleUrl: './points-display.component.css',
})
export class PointsDisplayComponent {
  @Input() earnedPoints: number = 0;
}
