import { Component, Input } from '@angular/core';
import { TranslatedWord } from '../../shared/model/translateword';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-word-sorter-summary',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './word-sorter-summary.component.html',
  styleUrl: './word-sorter-summary.component.css',
})
export class WordSorterSummaryComponent {
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
