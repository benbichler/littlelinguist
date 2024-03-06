import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../shared/model/category';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-game-match',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgForOf, NgIf, MatIconModule, MatSelectModule],
  templateUrl: './game-match.component.html',
  styleUrl: './game-match.component.css'
})
export class GameComponent implements OnInit {
  currentCategory?: Category;
  fixedWordIndex: number = 0;
  selectedOptions: string[] = [];
  answerCorrect?: boolean;
  show: boolean = false;


  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.loadCurrentCategory();
    this.changeWord();
    this.show = false
  }

  loadCurrentCategory(): void {
    const currentCategoryId = this.categoryService.getCurrentCategoryId();
    if (currentCategoryId) {
      this.currentCategory = this.categoryService.list().find(category => category.id === +currentCategoryId);
    }
  }

  checkAnswers(): void {
    this.show = false;
    const correctTranslation = this.currentCategory?.words[this.fixedWordIndex].target;
    if (correctTranslation && this.selectedOptions.includes(correctTranslation)) {
      this.answerCorrect = true;
      this.changeWord()
    } else {
      this.answerCorrect = false;
    }
    this.selectedOptions = [];
  }

  changeWord(): void {
    this.show = false;
    if (this.currentCategory && this.currentCategory.words.length > 0) {
      this.fixedWordIndex = Math.floor(Math.random() * this.currentCategory.words.length);
    }
  }

  showWord(): void {
    this.show = !this.show
  }
}
