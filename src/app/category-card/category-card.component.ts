import { Component, Input } from '@angular/core';
import { Category } from '../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {


  @Input()  category? : Category;
  
}