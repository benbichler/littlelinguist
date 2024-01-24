import { Component, Input, OnInit } from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import {TranslatedWord} from "../shared/model/translateword";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgForOf, NgIf, MatIconModule],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.css']
})
export class FormsDemoComponent implements OnInit {
  @Input() idString?: string;
  currentCategory: Category
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
     this.currentCategory = new Category(categoryService.nextId, '' , Language.English, Language.Hebrew);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idString = params['idString'];
      if (idString) {
        let id: number = parseInt(idString);
        this.idString = idString
        const category = this.categoryService.get(id);
        if (category) {
          this.currentCategory = category;
        } else {
          this.currentCategory =  new Category(id,'',Language.English, Language.Hebrew)
        }
      }
    });
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
    return this.currentCategory.words.length !== 0
  }
  onSubmitRegistration() {
    console.log("Form submitted!");
    this.categoryService.updateOrAdd(this.currentCategory);
    this.router.navigate(['/']);
  }
}
