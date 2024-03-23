import { Component, Input } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-card-word',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './card-word.component.html',
  styleUrl: './card-word.component.css'
})
export class CardWordComponent {

  @Input()  category? : Category;

}
