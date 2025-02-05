import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ViewApartmentDetailComponent } from './view-apartment-detail/view-apartment-detail.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path:'', component:HomeComponent},
  { path: 'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path: 'apartment-detail/:id', component: ViewApartmentDetailComponent },
  { 
    path: 'create-post',
    component:CreatePostComponent,
    canActivate: [AuthGuard] // Only accessible if the guard passes
  }
];
