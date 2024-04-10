import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import { TranslatedWord } from '../shared/model/translateword';
import { NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgForOf,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.css'],
})
export class FormsDemoComponent implements OnInit {
  currentCategory: Category = new Category(-1, '', new Date());
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}
  @Input() idString?: string;

  ngOnInit(): void {
    if (this.idString) {
      let id: number = parseInt(this.idString);
      const category = this.categoryService.get(id);
      if (category) {
        this.currentCategory = category;
      }
    }
  }

  addNewWord(): void {
    this.currentCategory.words.push(new TranslatedWord('', ''));
  }
  deleteWord(index: number): void {
    this.currentCategory.words.splice(index, 1);
  }

  getErrorMessage(input: NgModel): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    } else if (input.hasError('pattern')) {
      return 'Invalid characters detected';
    }
    return '';
  }
  hasAtLeastOne() {
    return this.currentCategory.words.length !== 0;
  }
  onSubmitRegistration(): void {
    console.log('Form submitted!');
    if (this.idString) {
      this.categoryService.update(this.currentCategory);
    } else {
      this.categoryService.add(this.currentCategory);
    }
    this.router.navigate(['/']);
  }
}
