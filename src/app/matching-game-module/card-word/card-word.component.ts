import { Component, Input } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { WordStatus } from '../shared/model/wordstatus';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-card-word',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatIconModule ],
  templateUrl: './card-word.component.html',
  styleUrl: './card-word.component.css'
})
export class CardWordComponent {

  @Input()  word? : string;
  @Input() status?: WordStatus;


  }


