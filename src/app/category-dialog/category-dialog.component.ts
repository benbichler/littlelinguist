import { Component, Inject, } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../shared/model/category';
import { GameProfile } from '../shared/model/gameprofile';
import { GameInformationService } from '../services/game-information.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css',
})
export class CategoryDialogComponent {
  public games: GameProfile[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  selectedCategory: Category | undefined;
  selectedGame?: GameProfile;

  constructor(
    private gameInformationService: GameInformationService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
  ) {
    this.games = this.gameInformationService.list();
  }
}
