import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../shared/model/category';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
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
})
export class GamePageComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  selectedCategory: Category | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories = this.categoryService.list();
  }

  onCategorySelected(): void {
    this.selectedCategory = this.categories.find(
      (category) => category.id === +this.selectedCategoryId,
    );
  }

  startGame(): void {
    this.categoryService.setCurrentCategoryId(
      this.selectedCategoryId.toString(),
    );
    this.router.navigate([`/game/${this.selectedCategoryId}`]);
  }
}
