import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router,private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.getUser();
    const userRole = user;
    console.log("userRole",userRole,this.authService.isAuthenticated())

    if (this.authService.isAuthenticated() && user) {
      return true;
    }
    // alert("Not Authrized Please login first")
    this.router.navigate(['/login']);
    return false;
  }
}
