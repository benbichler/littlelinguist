import { Component, OnInit, Input } from '@angular/core';
import { TranslatedWord } from '../shared/model/translateword';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-game-summary',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, NgFor, RouterLink],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.css'
})
export class GameSummaryComponent implements OnInit {
  categoryId: any;
  gameId: any;
  ngOnInit(): void {
  }
  @Input() totalPoints: number = 0;
  @Input() attempts: number = 0;
  @Input() selectedWords: TranslatedWord[] = [];
}

