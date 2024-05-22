import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translateword';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { GamePointsService } from '../../services/game-points.service';
import { ExitGameButtonComponent } from '../../exit-game-button/exit-game-button.component';
import { PointsDisplayComponent } from '../../points-display/points-display.component';
import { WordSorterSummaryComponent } from '../word-sorter-summary/word-sorter-summary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WordSorterDialogComponent } from '../word-sorter-dialog/word-sorter-dialog.component';
import { GamePlayed } from '../../shared/model/gameplayed';
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-word-sorter-game',
  standalone: true,
  templateUrl: './word-sorter-game.component.html',
  styleUrl: './word-sorter-game.component.css',
  imports: [
    NgFor,
    ExitGameButtonComponent,
    PointsDisplayComponent,
    NgIf,
    WordSorterSummaryComponent,
    MatProgressBarModule,
    TimerComponent,
  ],
})
export class WordSorterGameComponent implements OnInit {
  readonly timeGivenForGame: number = 180;
  timeLeftForGame: number = this.timeGivenForGame;
  timerFinished: boolean = false;
  @Input() currentCategoryId?: string;
  currentCategory?: Category;
  randomCategory?: Category;
  currentWordIndex: number = 0;
  totalPoints: number = 0;
  totalAttempts: number = 0;
  isGameOver: boolean = false;
  currentWord?: TranslatedWord;
  displayWords: TranslatedWord[] = [];
  wordsGuessed: number = 0;
  userGuesses: { index: number; guess: string; isCorrect: boolean }[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private gamePointsService: GamePointsService
  ) {}

  ngOnInit(): void {
    this.loadCurrentCategory();
    this.timeLeftForGame = this.timeGivenForGame;
  }

  loadCurrentCategory(): void {
    if (this.currentCategoryId) {
      const categoryId = parseInt(this.currentCategoryId);
      if (!isNaN(categoryId)) {
        const category = this.categoryService.get(categoryId);
        if (category) {
          this.currentCategory = category;
          this.retrieveExtraWords();
        } else {
          console.error(`No category found with ID ${categoryId}`);
          // Handle the error appropriately, maybe redirect or show a message
        }
      } else {
        console.error('Invalid category ID:', this.currentCategoryId);
        // Handle invalid ID appropriately
      }
    }
  }

  retrieveExtraWords(): void {
    if (this.currentCategory) {
      // Select 3 words from the current category
      this.displayWords = this.pickRandomWords(this.currentCategory, 3);

      // Get all categories and select a random one, excluding the current category
      const allCategories = this.categoryService.list();
      const otherCategories = allCategories.filter(
        (cat) => cat && cat.id !== this.currentCategory?.id
      );
      if (otherCategories.length > 0) {
        this.randomCategory =
          otherCategories[Math.floor(Math.random() * otherCategories.length)];
        if (this.randomCategory) {
          this.displayWords = this.displayWords.concat(
            this.pickRandomWords(this.randomCategory, 3)
          );
          this.shuffleDisplayWords();
        }
      }
    }
  }

  pickRandomWords(category: Category, count: number): TranslatedWord[] {
    if (category.words.length < count) {
      return category.words;
    }
    return category.words.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  shuffleDisplayWords(): void {
    this.displayWords = this.displayWords.sort(() => 0.5 - Math.random());
    if (this.displayWords.length > 0) {
      this.currentWord = this.displayWords[this.currentWordIndex];
    }
  }

  verifyGuess(userGuessBelongsToCategory: boolean): void {
    if (!this.currentCategory || !this.currentWord) {
      console.error('Current category or current word is undefined.');
      return;
    }

    const isWordFromCurrentCategory = this.currentCategory.words.includes(
      this.currentWord
    );

    const guessWasCorrect =
      userGuessBelongsToCategory === isWordFromCurrentCategory;

    this.userGuesses.push({
      index: this.currentWordIndex,
      guess: this.currentWord!.origin,
      isCorrect: guessWasCorrect,
    });

    if (guessWasCorrect) {
      this.goodGuessDialog(); // Open the success dialog
      this.totalPoints += this.calculatePoints();
      this.wordsGuessed++;
    } else {
      this.showWrongDialog(); // Open the failure dialog
    }
    this.moveToNextWord();
    this.totalAttempts++;
  }

  calculatePoints(): number {
    const calculation = 100 / this.displayWords.length;
    return Math.round(calculation);
  }

  progressValue(): number {
    const progress = (this.currentWordIndex / this.displayWords.length) * 100;
    return progress;
  }

  moveToNextWord(): void {
    this.currentWordIndex++;

    if (this.currentWordIndex < this.displayWords.length) {
      this.currentWord = this.displayWords[this.currentWordIndex];
    } else {
      this.isGameOver = true;
      this.GameIsOver();
      if (this.currentCategory) {
        this.gamePointsService.addGamePlayed(
          new GamePlayed(
            this.currentCategory.id,
            3,
            new Date(),
            this.totalPoints,
            this.timeGivenForGame,
            this.timeLeftForGame
          )
        );
      }
    }
  }

  getIsGameOver(): boolean {
    return this.isGameOver || this.timerFinished;
  }

  handleTimer(): void {
    this.timeLeftForGame--;
    console.log('Time left:', this.timeLeftForGame);
  }

  handleTimerFinished(): void {
    console.log('Game over! Timer finished');
    this.timeLeftForGame--;
    if (this.timeLeftForGame === 0) {
      // הצגת מסך סיכום המשחק
    this.timerFinished = true;
  }

  private goodGuessDialog(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'WELL DONE!',
        message:
          'You matched the word to the correct category! Next challenge awaits!',
        buttonText: 'NEXT WORD',
        dialogType: 'correctWord',
      },
    });
  }

  private GameIsOver(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'GAME OVER!',
        message: `You've completed matching all words from ${this.currentCategory?.name}.`,
        buttonText: 'SHOW SUMMARY',
        dialogType: 'allGuessed',
      },
    });
  }

  private showWrongDialog(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'TRY AGAIN!',
        message: 'You missed the match. Keep trying for the next one!',
        buttonText: 'NEXT WORD!',
        dialogType: 'wrong',
      },
    });
  }

  openDialog(
    title: string,
    message: string,
    buttonText: string,
    dialogType: string
  ) {
    return this.dialog.open(WordSorterDialogComponent, {
      data: { title, message, buttonText, dialogType }, // Pass dialogType along with other data
      width: '50%',
      height: 'auto',
    });
  }
}
