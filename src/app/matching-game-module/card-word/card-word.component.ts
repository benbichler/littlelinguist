import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { WordStatus } from '../shared/model/wordstatus';

@Component({
  selector: 'app-card-word',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './card-word.component.html',
  styleUrl: './card-word.component.css',
})
export class CardWordComponent {
  @Input() word?: string;
  @Input() status?: WordStatus;
  WordStatus = WordStatus;
}
