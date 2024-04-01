import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { MatchingGameComponent } from './matching-game-module/matching-game/matching-game.component';
import { ExplanationOnGameComponent } from './structure/explanation-on-game/explanation-on-game.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

export const routes: Routes = [
    {path: '', component:DashboardViewComponent},
    {path: 'admin', component: CategoryListComponent},
    {path: 'category/:idString', component: FormsDemoComponent},
    {path: 'categorynew', component: FormsDemoComponent},
    {path: 'matchingame/:idString', component: MatchingGameComponent},
    {path: 'cards', component: CategoryViewComponent},
    {path: 'explanation', component:ExplanationOnGameComponent}
];
