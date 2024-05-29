import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'words', 'lastModified', 'actions'];
  categories: Category[] = [];

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

  addNewCategory(): void {
    this.router.navigate(['/categorynew']);
  }

  editCategory(categoryId: number): void {
    this.router.navigate(['/category', categoryId]);
  }

  deleteCategory(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe((deletionResult) => {
      if (deletionResult) {
        this.categoryService.delete(id).then(() => {
          this.categoryService
            .list()
            .then((result: Category[]) => (this.categories = result));
        });
      }
    });
  }
}
