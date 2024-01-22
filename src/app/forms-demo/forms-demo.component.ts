import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [FormsModule, MatButtonModule, CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './forms-demo.component.html',
  styleUrl: './forms-demo.component.css'
})
export class FormsDemoComponent implements OnInit {
  @Input() idString?:string;
  currentCategory: Category = new Category(0,'',Language.English, Language.Hebrew)


  constructor(private categoryService: CategoryService, private router: Router){}

  ngOnInit(): void {
    if (this.idString) {
      let id:number = parseInt(this.idString);
      const category = this.categoryService.get(id);
      if (category){
        this.currentCategory = category;
      }
    }
  }

  onSubmitRegistration() {
    console.log("Form submitted!");
    if(this.idString){
      this.categoryService.update(this.currentCategory)}
    
    else{
      this.categoryService.add(this.currentCategory)
    }
    this.router.navigate(['/']);
  }
}

