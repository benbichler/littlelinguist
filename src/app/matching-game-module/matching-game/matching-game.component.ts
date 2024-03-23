import { Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgForOf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { GameInformationService } from '../../services/game-information.service';
import { Language } from '../../shared/model/language';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ExitGameButtonComponent } from '../../exit-game-button/exit-game-button.component';


@Component({
    selector: 'app-matching-game',
    standalone: true,
    templateUrl: './matching-game.component.html',
    styleUrl: './matching-game.component.css',
    imports: [CommonModule, MatIconModule, MatFormFieldModule, MatCardModule, NgIf, NgForOf, RouterModule, ExitGameButtonComponent]
})
export class MatchingGameComponent {


  constructor( private categoryService: CategoryService, private gameInformationService: GameInformationService, private router: Router){}

  currentCategory?: Category;
  shuffledEnglishWords: string[] = [];
  shuffledHebrewWords: string[] = [];

  ngOnInit(): void {
    this.loadCurrentCategory();

}

loadCurrentCategory(): void {
  const currentCategoryId = this.categoryService.getCurrentCategoryId();
  if (currentCategoryId) {
    this.currentCategory = this.categoryService.list().find(category => category.id === +currentCategoryId);
  if(this.currentCategory){
     this.shuffledEnglishWords = this.currentCategory.words.map(word => word.origin).sort(() => Math.random() - 0.5); 
     this.shuffledHebrewWords = this.currentCategory.words.map(word => word.target).sort(() => Math.random() - 0.5);
    }
  }
}

isCorrect() {

}

exit(){
  this.router.navigate(['/cards']);}
  }
