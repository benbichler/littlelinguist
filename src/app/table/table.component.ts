
import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../shared/model/category';


@Component({
    selector: 'app-table',
    styleUrl: './table.component.css',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatButtonModule],
  }) 
 export class table{
[x: string]: any;
    categories = [
        { name: 'Fruits', words: [30], lastModified: new Date() },
        { name: 'Our Body', words: [20], lastModified:'' },
        { name: '', words: [''],lastModified:'' }
      ];      
      
      displayedColumns: string[] = ['name', 'words', 'lastModified', 'edit'];

      constructor() { }

      ngOnInit(): void {
      }
    
      editCategory(): void {
      
        console.log(`Editing category: ${Category.name}`);
      }

      getTodayDateAsString(): string {
        const today = new Date();
        return today.toLocaleDateString();
        }
deletecategory(){
  
}

 }