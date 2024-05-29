import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translateword';
import { CategoryService } from '../../services/category.service';
import { GamePointsService } from '../../services/game-points.service';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameButtonComponent } from '../../exit-game-button/exit-game-button.component';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GameSummaryComponent } from '../../matching-game-module/game-summary/game-summary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PointsDisplayComponent } from '../../points-display/points-display.component';
import { MatButtonModule } from '@angular/material/button';
import { ScrambledSummaryComponent } from '../scrambled-summary/scrambled-summary.component';
import { ScrambledDialogComponent } from '../scrambled-dialog/scrambled-dialog.component';
import { GamePlayed } from '../../shared/model/gameplayed';
import { TimerComponent } from '../../timer/timer.component';
@Component({
  selector: 'app-scrambled-game-module',
  standalone: true,
  templateUrl: './scrambled-game.component.html',
  styleUrl: './scrambled-game.component.css',
  imports: [
    ScrambledSummaryComponent,
    MatButtonModule,
    ExitGameButtonComponent,
    MatIconModule,
    NgIf,
    MatFormFieldModule,
    GameSummaryComponent,
    MatProgressBarModule,
    PointsDisplayComponent,
    FormsModule,
    TimerComponent,
  ],
})
export class ScrambledGameModuleComponent implements OnInit {
  @Input() currentCategoryId?: string;
  readonly timeGivenForGame: number = 180;
  timeLeftForGame: number = 0;
  timerFinished: boolean = false;
  currentCategory?: Category;
  currentWordShownIndex: number = 0;
  currentWord: TranslatedWord[] = [];
  totalPoints: number = 0;
  scrambledWord: string = '';
  userGuess: string = '';
  totalAttempts: number = 0;
  wordsGuessed: number = 0;
  userGuesses: { index: number; guess: string; isCorrect: boolean }[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private gamePointsService: GamePointsService
  ) {}

  private goodGuessDialog(): void {
    this.dialog.open(ScrambledDialogComponent, {
      data: {
        title: 'WELL DONE!',
        message:
          'You successfully guessed the correct word! Continue onto the next word!',
        buttonText: 'NEXT WORD',
        dialogType: 'correctWord', // Ensure your dialog component handles this appropriately
      },
    });
  }

  private GameIsOver(): void {
    this.dialog.open(ScrambledDialogComponent, {
      data: {
        title: 'GAME OVER!',
        message: `You are done guessing all of the words from ${this.currentCategory?.name}.`, // Using optional chaining for safety
        buttonText: 'SHOW SUMMARY',
        dialogType: 'allGuessed', // This should be handled in the dialog component for different styling or actions
      },
    });
  }

  private showWrongDialog(): void {
    this.dialog.open(ScrambledDialogComponent, {
      data: {
        title: 'WRONG!',
        message:
          'You failed guessing the word. Better luck with the next word!',
        buttonText: 'NEXT WORD!',
        dialogType: 'wrong', // This should be handled in the dialog component for different styling or actions
      },
    });
  }

  ngOnInit(): void {
    this.timeLeftForGame = this.timeGivenForGame;

    if (this.currentCategoryId) {
      this.categoryService.get(this.currentCategoryId).then((category) => {
        if (this.currentCategory) {
          this.scrambledWord = this.mixUpLetters(
            this.currentCategory.words[0].origin.toLowerCase()
          );
          console.log('Initial scrambled word:', this.scrambledWord);
        }
      });
    }
  }

  mixUpLetters(word: string): string {
    const scrambledLetters = word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    return scrambledLetters;
  }

  verifyGuess(): void {
    if (!this.currentCategory) {
      console.error('Category data is not loaded.');
      return;
    }
    const currentWord = this.currentCategory.words[this.currentWordShownIndex];
    const isCorrectGuess =
      currentWord &&
      this.userGuess.toLowerCase() === currentWord.origin.toLowerCase();
    console.log('Guess:', this.userGuess, 'Correct:', isCorrectGuess);

    this.userGuesses.push({
      index: this.currentWordShownIndex,
      guess: this.userGuess.toLowerCase(),
      isCorrect: isCorrectGuess,
    });

    this.currentWord.push({
      origin: currentWord.origin,
      target: currentWord.target,
    });

    this.totalAttempts++;
    if (isCorrectGuess) {
      this.totalPoints += this.calculatePoints();
      this.wordsGuessed++;
    }

    this.currentWordShownIndex++;

    if (this.isGameOver()) {
      if (this.currentCategory) {
        this.gamePointsService.addGamePlayed(
          new GamePlayed(
            this.currentCategory.id,
            '2',
            new Date(),
            this.totalPoints,
            this.timeGivenForGame,
            this.timeLeftForGame
          )
        );
      }
      this.GameIsOver();
    } else {
      if (isCorrectGuess) {
        this.goodGuessDialog();
      } else {
        this.showWrongDialog();
      }
      this.prepareNextWord();
    }

    this.userGuess = '';
  }

  calculatePoints(): number {
    const calculation = (1 / this.currentCategory!.words.length) * 100;
    return Math.round(calculation);
  }

  isGameOver(): boolean {
    return (
      this.currentWordShownIndex === this.currentCategory?.words.length ||
      this.timerFinished
    );
  }

  prepareNextWord(): void {
    if (
      this.currentCategory &&
      this.currentCategory.words.length > this.currentWordShownIndex
    ) {
      const word = this.currentCategory.words[this.currentWordShownIndex];
      this.scrambledWord = this.mixUpLetters(word.origin.toLowerCase());
    } else {
      console.error('Invalid category data or index out of bounds');
    }
  }

  clearGuess(): void {
    this.userGuess = '';
  }

  progressValue(): number {
    const progress =
      (this.currentWordShownIndex / this.currentCategory!.words.length) * 100;
    console.log('Progress Value:', progress); // Check the console for this output
    return progress;
  }

  handleTimerFinished(): void {
    console.log('Game over! Timer finished');
    this.timerFinished = true;
  }

  handleTimer(): void {
    this.timeLeftForGame--;
    console.log('Time left:', this.timeLeftForGame);
  }

  openDialog(
    title: string,
    message: string,
    buttonText: string,
    dialogType: string
  ) {
    return this.dialog.open(ScrambledDialogComponent, {
      data: { title, message, buttonText, dialogType }, // Pass dialogType along with other data
      width: '50%',
      height: 'auto',
    });
  }
}
