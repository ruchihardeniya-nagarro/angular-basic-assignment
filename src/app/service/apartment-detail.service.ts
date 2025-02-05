import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentDetailService {

  private apiUrl = 'http://localhost:3000/apartments';
  private apiUrlUser = 'http://localhost:3000/users'
  public isFavorite: BehaviorSubject<any> | undefined;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService:AuthService
  ) { }

  getApartments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getApartmentById(id: number|string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addApartment(apartment: any): Observable<any> {
    return this.http.post(this.apiUrl, apartment);
  }

  updateApartment(id: number|string, apartment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, apartment);
  }

  // addComment(apartmentId: number, userId:string,comment: any): Observable<any> {
  // addComment(apartmentId: number,  userId:string,comment: any): Observable<any> {
  //   console.log("hehehe")
  //   return this.http.patch(`${this.apiUrl}/${apartmentId}`, comment);
  // }

  addComment(apartmentId: number|string, userId: string, comment: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${apartmentId}`).pipe(
      switchMap((apartment: any) => {
        const newComment = {
          id: apartment.comments.length + 1, // Generate a new ID for the comment
          userId: userId,
          content: comment,
          timestamp: new Date().toISOString(),
        };
        apartment.comments.push(newComment); // Add the new comment to the comments array
        return this.http.put(`${this.apiUrl}/${apartmentId}`, apartment);
      })
    );
  }
  addApartmentToFavorites(userId: string, apartmentId: number|string): Observable<any> {
    return this.userService.getUserById(userId).pipe(
      switchMap((user) => {
        // Check if the apartment is already in the user's favorites
        console.log("getUserById",user)
        if (user.favorites && !user.favorites.includes(apartmentId.toString())) {
          user.favorites.push(apartmentId.toString());
          console.log("inside11",user.favorites)
        }
        // Update the user data with the new favorites array
        return this.http.patch(`${this.apiUrlUser}/${userId}`, user);
      })
    );
  }

  removeApartmentFromFav(userId: string, apartmentId: number|string): Observable<any> {
      return this.userService.getUserById(userId).pipe(
        switchMap((user) => {
          // Check if the apartment is already in the user's favorites
          if (user.favorites && user.favorites.includes(apartmentId.toString())) {
            user.favorites = user.favorites.filter((item: number | string) => item !== apartmentId.toString())
          }
          // Update the user data with the new favorites array
          return this.http.patch(`${this.apiUrlUser}/${userId}`, user);
        })
      );
  }

  isApartmentisFavorite(userId:string,apartmentId:string|number) { 
    let user = this.userService.getUserById(userId).subscribe((user) => {
      let userFavorite = user?.favorites;
      console.log("userFavorite",userFavorite)
    
    if (userFavorite && userFavorite.includes(apartmentId)) {
      this.isFavorite?.next(true);
      return true;
    } 
      this.isFavorite?.next(false);
      return false;

    });
  }
  
  isfavorite(): boolean { 
    return this.isFavorite?.value
  }
  updatedUserArray(updatedUser: any) {
    localStorage.setItem("updatedUser",updatedUser)
  }
  getUpdatedUser() { 
    return localStorage.getItem("updatedUser")
  }


}

