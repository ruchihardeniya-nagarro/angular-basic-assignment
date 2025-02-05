import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl = "http://localhost:3000/users"

  getUserById(id: string): Observable<any> {
    console.log("calling get user by id")
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
