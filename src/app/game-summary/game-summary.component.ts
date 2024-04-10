import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../shared/model/translateword';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-game-summary',
  standalone: true,
  imports: [NgFor],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.css',
})
export class GameSummaryComponent implements OnInit {
  ngOnInit(): void {}

  @Input() currentCategoryName?: string;
  @Input() chosenWords: TranslatedWord[] = [];
  @Input() numberOfAttempts: number = 0;
  @Input() totalPointsEarned: number = 0;
}
