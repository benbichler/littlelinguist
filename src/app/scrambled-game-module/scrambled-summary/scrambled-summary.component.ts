import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TranslatedWord } from '../../shared/model/translateword';
@Component({
  selector: 'app-scrambled-summary',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './scrambled-summary.component.html',
  styleUrl: './scrambled-summary.component.css',
})
export class ScrambledSummaryComponent {
  @Input() earnedPoints: number = 0;
  @Input() totalAttempts: number = 0;
  @Input() currentWord: TranslatedWord[] = [];
  @Input() currentCategoryName?: string;
  @Input() wordsGuessed: number = 0;
  @Input() userGuesses: { index: number; guess: string; isCorrect: boolean }[] =
    [];

  wasCorrectGuess(index: number): boolean {
    const foundGuess = this.userGuesses.find((g) => g.index === index);
    return foundGuess ? foundGuess.isCorrect : false;
  }
}
