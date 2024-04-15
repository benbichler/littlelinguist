import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { TranslatedWord } from '../shared/model/translateword';
import { CategoryService } from '../services/category.service';
import { GamePointsService } from '../services/game-points.service';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameButtonComponent } from '../exit-game-button/exit-game-button.component';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { GameSummaryComponent } from '../game-summary/game-summary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PointsDisplayComponent } from '../points-display/points-display.component';
@Component({
  selector: 'app-scrambled-game-module',
  standalone: true,
  imports: [
    ExitGameButtonComponent,
    MatIconModule,
    NgIf,
    MatFormFieldModule,
    GameSummaryComponent,
    MatProgressBarModule,
    PointsDisplayComponent,
    FormsModule,
  ],
  templateUrl: './scrambled-game-module.component.html',
  styleUrl: './scrambled-game-module.component.css',
})
export class ScrambledGameModuleComponent implements OnInit {
  @Input() currentCategoryId?: string;
  currentCategory?: Category;
  currentWordShownIndex: number = 0;
  currentWord: TranslatedWord[] = [];
  totalPoints: number = 0;
  scrambledWord: string = '';
  userGuess: string = '';

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private gamePointsService: GamePointsService
  ) {}

  ngOnInit(): void {
    if (this.currentCategoryId) {
      this.currentCategory = this.categoryService.get(
        parseInt(this.currentCategoryId)
      );
    }
    this.scrambledWord = this.mixUpLetters(
      this.currentCategory?.words[0].origin.toLowerCase()!
    );
  }

  mixUpLetters(word: string): string {
    let scrambledLetters = word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    return scrambledLetters;
  }

  isGameOver(): boolean {
    return this.currentWordShownIndex === this.currentCategory?.words.length;
  }

  verifyGuess(): void {}

  clearGuess(): void {}
}
