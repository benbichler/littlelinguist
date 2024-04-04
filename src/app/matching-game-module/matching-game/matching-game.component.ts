import { Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { GameInformationService } from '../../services/game-information.service';
import { Language } from '../../shared/model/language';
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

@Component({
    selector: 'app-matching-game',
    standalone: true,
    templateUrl: './matching-game.component.html',
    styleUrl: './matching-game.component.css',
    imports: [ShowPointsComponent, MatDialogModule, CardWordComponent, CommonModule, MatIconModule, MatFormFieldModule, MatCardModule, NgIf, NgForOf, RouterModule, ExitGameButtonComponent]
})
export class MatchingGameComponent {


  constructor( private categoryService: CategoryService, private dialog: MatDialog, private router: Router, private pointsService: GamePointsService){}
  currentCategory?: Category;
  shuffledEnglishWords: string[] = [];
  shuffledHebrewWords: string[] = [];
  showNotEnoughWords?: boolean;
  englishWordStatus: WordStatus[] = [];
  hebrewWordStatus: WordStatus[] = [];
  private static readonly WORDS_PER_GAME = 5;
  totalPoints: number = 0;
  totalCurrentGamePoints: number = 20;
  totalSuccess: number = 0;
  totalAttempts: number = 0;


  ngOnInit(): void {
    this.loadCurrentCategory();

}


 private loadCurrentCategory(): void {
  const currentCategoryId = this.categoryService.getCurrentCategoryId();
  if (currentCategoryId) {
    this.currentCategory = this.categoryService.list().find(category => category.id === +currentCategoryId);
  if(this.currentCategory){
    this.showNotEnoughWords = this.currentCategory.words.length >= 5;
    if(this.showNotEnoughWords){
    const tempWords = this.currentCategory.words.sort(() => Math.random() - 0.5).slice(0,5);
     this.shuffledEnglishWords = tempWords.map(word => word.origin).sort(() => Math.random() - 0.5);
     this.shuffledHebrewWords = tempWords.map(word => word.target).sort(() => Math.random() - 0.5);
     this.englishWordStatus = Array(MatchingGameComponent.WORDS_PER_GAME).fill(WordStatus.Normal);
     this.hebrewWordStatus = Array(MatchingGameComponent.WORDS_PER_GAME).fill(WordStatus.Normal);
    }
  }
 }
}

handleWordClicked(word: string) {
    if(this.shuffledEnglishWords.includes(word)){
      const englishWordIndex = this.shuffledEnglishWords.findIndex((englishWord) => englishWord === word);
      const currentWordStatus = this.englishWordStatus[englishWordIndex];
      if(currentWordStatus === WordStatus.Selected){
        this.englishWordStatus[englishWordIndex] = WordStatus.Normal;
      } else if(currentWordStatus === WordStatus.Normal){
        this.englishWordStatus = this.englishWordStatus.map(status => status === WordStatus.Selected? WordStatus.Normal : status);
        const currentIndexHebrewWordStatus = this.hebrewWordStatus.findIndex(status => status === WordStatus.Selected);
        if(currentIndexHebrewWordStatus !== -1) {
          const hebrewWord = this.shuffledHebrewWords[currentIndexHebrewWordStatus];
          const hebrewEnglishPair = this.currentCategory?.words.find(wordPair => wordPair.origin === word && wordPair.target === hebrewWord);
          if(hebrewEnglishPair){
            this.englishWordStatus[englishWordIndex] = WordStatus.Disabled;
            this.hebrewWordStatus[currentIndexHebrewWordStatus] = WordStatus.Disabled;
            this.totalPoints+= this.totalCurrentGamePoints;
            this.totalSuccess++;
            this.checkIfAllWordsMarkedDisabled();
            if(this.isGameOver()){
              this.pointsService.addGamePlayed(new GamePlayed(this.currentCategory!.id, 1, this.totalPoints))
            }
            this.openDialog('Success!', 'Great Job!', 'Continue');
          } else {
            this.totalAttempts++;
            this.totalPoints -= 5;
            this.englishWordStatus[englishWordIndex] = WordStatus.Selected;
            this.openDialog('Incorrect', 'Incorrect, give it another try!', 'GOT IT');

          }
        } else{ 
          this.englishWordStatus[englishWordIndex] = WordStatus.Selected;
        }
      }
    } else {
      const hebrewWordIndex = this.shuffledHebrewWords.findIndex((hebrewWord) => hebrewWord === word);
      const currentWordStatus = this.hebrewWordStatus[hebrewWordIndex];
      if(currentWordStatus === WordStatus.Selected){
        this.hebrewWordStatus[hebrewWordIndex] = WordStatus.Normal;
      } else if(currentWordStatus === WordStatus.Normal){
        this.hebrewWordStatus = this.hebrewWordStatus.map(status => status === WordStatus.Selected? WordStatus.Normal : status);
        const currentIndexEnglishWordStatus = this.englishWordStatus.findIndex(status => status === WordStatus.Selected);
        if(currentIndexEnglishWordStatus !== -1) {
          const englishWord = this.shuffledEnglishWords[currentIndexEnglishWordStatus];
          const englishHebrewPair = this.currentCategory?.words.find(wordPair => wordPair.target === word && wordPair.origin === englishWord);
          if(englishHebrewPair){
            this.hebrewWordStatus[hebrewWordIndex] = WordStatus.Disabled;
            this.englishWordStatus[currentIndexEnglishWordStatus] = WordStatus.Disabled;
            this.totalPoints+= this.totalCurrentGamePoints;
            this.totalSuccess++;
            this.checkIfAllWordsMarkedDisabled();
            if(this.isGameOver()){
              this.pointsService.addGamePlayed(new GamePlayed(this.currentCategory!.id, 1, this.totalPoints))
            }
            this.openDialog('Success!', 'Great Job!', 'Continue');
            }
          } else {
            this.hebrewWordStatus[hebrewWordIndex] = WordStatus.Selected;
            this.openDialog('Incorrect', 'Incorrect, give it another try!', 'GOT IT');
            this.totalAttempts++;
            this.totalPoints -= 5 ;
                 }
        } else{ 
          this.hebrewWordStatus[hebrewWordIndex] = WordStatus.Selected;
        }
      }
    }
  
  
    openDialog(title: string, message: string, buttonText: string) {
      return this.dialog.open(MatchingDialogComponent, {
          data: { title, message, buttonText },
          width: '50%',
          height: 'auto',
      });
  }

  
  isGameOver(): boolean {
    return this.checkIfAllWordsMarkedDisabled();
  }

  checkIfAllWordsMarkedDisabled () : boolean {
    for (let i = 0; i < this.englishWordStatus.length; i++) {
      if (this.englishWordStatus[i] !== WordStatus.Disabled || this.hebrewWordStatus[i] !== WordStatus.Disabled) {
        return false;
      }
    }
    return true;
  }


exit(){
  this.router.navigate(['/cards']);}
}



