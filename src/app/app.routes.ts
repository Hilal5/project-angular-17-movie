import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';


export const routes: Routes = [
    { path: 'detail/:id', component: DetailComponent }
];
