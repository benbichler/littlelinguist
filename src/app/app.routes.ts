import { Routes } from '@angular/router';
import { table } from './table/table.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';
import {GamePageComponent} from "./game/game.component";
import {GameComponent} from "./game-match/game-match.component";

export const routes: Routes = [
    {path: '', component: CategoryListComponent},
    {path: 'category/:idString', component: FormsDemoComponent},
    {path: 'categorynew', component: FormsDemoComponent},
    {path: 'game', component: GamePageComponent},
    {path: 'game/:idString', component: GameComponent},
];
