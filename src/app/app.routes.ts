import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path:'', component:AppComponent},
  { path: 'user', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
];
