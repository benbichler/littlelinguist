import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameButtonComponent } from '../../exit-game-button/exit-game-button.component';
import { CardWordComponent } from '../card-word/card-word.component';
import { WordStatus } from '../shared/model/wordstatus';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatchingDialogComponent } from '../matching-dialog/matching-dialog.component';
import { GamePointsService } from '../../services/game-points.service';
import { GamePlayed } from '../../shared/model/gameplayed';
import { ShowPointsComponent } from '../../show-points/show-points.component';
import { TranslatedWord } from '../../shared/model/translateword';
import { MatButtonModule } from '@angular/material/button';
import { GameSummaryComponent } from '../../game-summary/game-summary.component';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  imports: [
    MatButtonModule,
    ShowPointsComponent,
    MatDialogModule,
    CardWordComponent,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    NgIf,
    NgForOf,
    RouterModule,
    ExitGameButtonComponent,
    GameSummaryComponent,
  ],
})
export class MatchingGameComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router,
    private GamePointsService: GamePointsService
  ) {}
  currentCategory?: Category;
  chosenWordsEnglish: TranslatedWord[] = [];
  chosenWordsHebrew: string[] = [];
  showMessageAtEnd?: string;
  englishWordStatus: WordStatus[] = [];
  hebrewWordStatus: WordStatus[] = [];
  private static readonly WORDS_PER_GAME = 5;
  showDisWords?: boolean;
  totalPoints: number = 0;
  totalCurrentGamePoints: number = 20;
  totalSuccess: number = 0;
  totalAttempts: number = 0;
  @Input() currentCategoryId?: string;

  ngOnInit(): void {
    this.loadCurrentCategory();
    console.log('Loaded categories:', this.categoryService.list());
  }

  private loadCurrentCategory(): void {
    if (this.currentCategoryId) {
      this.currentCategory = this.categoryService.get(
        parseInt(this.currentCategoryId)
      );
      console.log('Current Category:', this.currentCategory);
      if (this.currentCategory) {
        this.processCategoryWords();
      }
    }
  }

  private processCategoryWords(): void {
    console.log('processCategoryWords called');

    // Check explicitly if this.currentCategory is not undefined before proceeding.
    if (
      this.currentCategory !== undefined &&
      this.hasEnoughWords(this.currentCategory)
    ) {
      console.log('Enough words, initializing game...');
      this.initializeGameWords(this.currentCategory);
    } else {
      console.log('Not enough words, setting message...');
      this.showMessageAtEnd =
        'This category does not have enough words to start the game.';
    }
  }

  private hasEnoughWords(category: Category): boolean {
    this.showDisWords =
      category.words.length < MatchingGameComponent.WORDS_PER_GAME;
    return !this.showDisWords;
  }

  private initializeGameWords(category: Category): void {
    // Select the first 'count' words directly without shuffling
    const tempWords = this.selectRandomWords(
      category.words,
      MatchingGameComponent.WORDS_PER_GAME
    );
    console.log('Selected words:', tempWords);
    // Assign English words directly
    this.chosenWordsEnglish = tempWords.map((word) => ({
      origin: word.origin,
      target: word.target,
    }));
    // Shuffle only the Hebrew translations using Math.random() - 0.5
    this.chosenWordsHebrew = tempWords
      .map((word) => word.target)
      .sort(() => Math.random() - 0.5);

    console.log('English words:', this.chosenWordsEnglish);
    console.log('Hebrew words:', this.chosenWordsHebrew);
    // Initialize the word statuses
    this.englishWordStatus = Array(MatchingGameComponent.WORDS_PER_GAME).fill(
      WordStatus.Normal
    );
    this.hebrewWordStatus = Array(MatchingGameComponent.WORDS_PER_GAME).fill(
      WordStatus.Normal
    );
  }

  private selectRandomWords(
    words: TranslatedWord[],
    count: number
  ): TranslatedWord[] {
    // This function just takes the first 'count' words from the list
    return words.slice(0, count);
  }

  private updateWordStatusToSelected(
    index: number,
    wordStatus: WordStatus[]
  ): void {
    const selectedIndex = wordStatus.findIndex(
      (status) => status == WordStatus.Selected
    );
    if (selectedIndex > -1) {
      wordStatus[selectedIndex] = WordStatus.Normal;
    }
    wordStatus[index] = WordStatus.Selected;
  }

  private updateWordStatusToDisabled(
    index: number,
    wordStatus: WordStatus[]
  ): void {
    wordStatus[index] = WordStatus.Disabled;
  }

  private calculatePoints(isCorrect: boolean): void {
    if (isCorrect) {
      this.totalPoints += this.totalCurrentGamePoints;
    } else {
      this.totalPoints -= 2;
    }
  }

  private completedGameDialog(): void {
    this.openDialog(
      'WELL DONE!',
      `You managed to match ${MatchingGameComponent.WORDS_PER_GAME} pairs of words and you've finished the game!`,
      'SHOW GAME SUMMARY',
      'gameover'
    );
  }

  private showMatchingDialog(): void {
    this.openDialog(
      'MATCHED!',
      `You have matched ${this.totalSuccess} words.`,
      'CONTINUE',
      'matched'
    );
  }

  private showWrongDialog(): void {
    this.openDialog(
      'WRONG!',
      `You failed matching the words. You have ${this.totalAttempts} attempts so far.`,
      'TRY AGAIN!',
      'wrong'
    );
  }

  handleWordClicked(index: number): void {
    const hebrewWordIndex = this.hebrewWordStatus.findIndex(
      (status) => status == WordStatus.Selected
    );

    if (this.englishWordStatus[index] !== WordStatus.Disabled) {
      this.updateWordStatusToSelected(index, this.englishWordStatus);

      if (hebrewWordIndex !== -1) {
        const chosenWordInEnglish = this.chosenWordsEnglish[index].target;
        const chosenWordInHebrew = this.chosenWordsHebrew[hebrewWordIndex];

        if (chosenWordInEnglish !== chosenWordInHebrew) {
          this.totalAttempts++;
          this.calculatePoints(false);
          this.showWrongDialog();
          this.englishWordStatus[index] = WordStatus.Normal;
          this.hebrewWordStatus[hebrewWordIndex] = WordStatus.Normal;
        } else {
          this.updateWordStatusToDisabled(index, this.englishWordStatus);
          this.updateWordStatusToDisabled(
            hebrewWordIndex,
            this.hebrewWordStatus
          );
          this.calculatePoints(true);
          this.totalSuccess++;
          this.showMatchingDialog();
          if (this.isGameOver()) {
            this.completedGameDialog();
            this.GamePointsService.addGamePlayed(
              new GamePlayed(this.currentCategory!.id, 1, this.totalPoints)
            );
          }
        }
      }
    }
  }

  handleHebrewWordClicked(index: number): void {
    const englishWordIndex = this.englishWordStatus.findIndex(
      (status) => status == WordStatus.Selected
    );

    if (this.hebrewWordStatus[index] !== WordStatus.Disabled) {
      this.updateWordStatusToSelected(index, this.hebrewWordStatus);

      if (englishWordIndex !== -1) {
        const chosenWordInEnglish =
          this.chosenWordsEnglish[englishWordIndex].target;
        const chosenWordInHebrew = this.chosenWordsHebrew[index];

        if (chosenWordInHebrew !== chosenWordInEnglish) {
          this.totalAttempts++;
          this.calculatePoints(false);
          this.showWrongDialog();
          this.hebrewWordStatus[index] = WordStatus.Normal;
          this.englishWordStatus[englishWordIndex] = WordStatus.Normal;
        } else {
          this.updateWordStatusToDisabled(
            englishWordIndex,
            this.englishWordStatus
          );
          this.updateWordStatusToDisabled(index, this.hebrewWordStatus);
          this.calculatePoints(true);
          this.totalSuccess++;
          this.showMatchingDialog();
          if (this.isGameOver()) {
            this.completedGameDialog();
            this.GamePointsService.addGamePlayed(
              new GamePlayed(this.currentCategory!.id, 1, this.totalPoints)
            );
          }
        }
      }
    }
  }

  openDialog(
    title: string,
    message: string,
    buttonText: string,
    dialogType: string
  ) {
    return this.dialog.open(MatchingDialogComponent, {
      data: { title, message, buttonText, dialogType }, // Pass dialogType along with other data
      width: '50%',
      height: 'auto',
    });
  }

  isGameOver(): boolean {
    return this.checkIfAllWordsMarkedDisabled();
  }

  checkIfAllWordsMarkedDisabled(): boolean {
    for (let i = 0; i < this.englishWordStatus.length; i++) {
      if (
        this.englishWordStatus[i] !== WordStatus.Disabled ||
        this.hebrewWordStatus[i] !== WordStatus.Disabled
      ) {
        return false;
      }
    }
    return true;
  }

  exit() {
    this.router.navigate(['/cards']);
  }
}
