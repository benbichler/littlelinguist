import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../shared/model/category';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';
import { ShowPointsComponent } from '../show-points/show-points.component';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [
    ShowPointsComponent,
    CategoryCardComponent,
    CommonModule,
    RouterModule,
    MatButtonModule,
    CategoryDialogComponent,
    FormsModule,
  ],
  templateUrl: './category-view.component.html',
  styleUrl: './category-view.component.css',
})
export class CategoryViewComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  selectedCategory: Category | undefined;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService
      .list()
      .then((result: Category[]) => (this.categories = result));
  }

  onCategorySelected(): void {
    const selectedCategoryId = this.selectedCategoryId; // Convert to number
    this.selectedCategory = this.categories.find(
      (category) => category.id.toString() === selectedCategoryId.toString()
    );
  }

  startGame(id: string): void {
    this.dialog.open(CategoryDialogComponent, {
      data: id,
    });
  }
}
