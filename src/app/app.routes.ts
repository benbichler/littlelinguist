import { Routes } from '@angular/router';
import { table } from './table/table.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';

export const routes: Routes = [
    {path: '', component: CategoryListComponent},
    {path: 'category/:idString', component: FormsDemoComponent},
    {path: 'newcategory', component: FormsDemoComponent},
    
];
