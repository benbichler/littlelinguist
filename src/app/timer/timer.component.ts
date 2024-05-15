import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0;
  @Output() timerFinished = new EventEmitter<number>();
  private intervalId?: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.reportTimeLeft(), 1000);
  }

  reportTimeLeft() {
    this.duration--;
    if (this.duration === 0) {
      this.timerFinished.emit(this.duration);
      this.stopTimer();
    }
  }

  private stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
}
