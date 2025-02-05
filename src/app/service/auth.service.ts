import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interface/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedIn= false;
  private currentUserSubject: BehaviorSubject<any> | undefined;
  public currentUser: Observable<any> | undefined;
  private authenticate = new BehaviorSubject(false); // 0 is the initial value

  constructor(private http: HttpClient, private router: Router) {}

  // Registration method
  register(username: string, password: string,role:string,favorites:Array<any>): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password,role,favorites });
  }

  // Login method
 login(username: string|any, password: string|any): Observable<any> {
    let params = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    return this.http.get<any>(`${this.apiUrl}`, { params })
      .pipe(
       catchError((err) => {
        throw err;
      })
    );
  }
  setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log("localStorage",user)
    if(user){
      this.loggedIn = true;
      this.authenticate?.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      console.log("success",this.isAuthenticated())

    }
    this.currentUserSubject?.next(user);
  }
  getUser():any{ 
    try{
      const user = localStorage.getItem("currentUser");
      if(user){
        this.authenticate?.next(true);
        return user;
      }
    }catch(error){
      console.log("erroe",error)
      return error;
    }
    return null
  }   

  
  // Logout method
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    this.authenticate?.next(false);
    this.router.navigate(['/login']);
    localStorage.setItem('isLoggedIn', 'false');
    console.log("this.authenticate",this.authenticate.value)
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') ==='true';
  }
   isAuthenticated(): boolean {
    return this.authenticate.value;
  }
  
}
