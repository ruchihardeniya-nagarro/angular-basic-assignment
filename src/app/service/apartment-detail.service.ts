import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentDetailService {

  private apiUrl = 'http://localhost:3000/apartments';

  constructor(private http: HttpClient) { }

  getApartments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getApartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addApartment(apartment: any): Observable<any> {
    return this.http.post(this.apiUrl, apartment);
  }

  updateApartment(id: number, apartment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, apartment);
  }

  addComment(apartmentId: number, userId:string,comment: any): Observable<any> {


        let params = new HttpParams();
        params = params.set('comment', comment);
        params = params.set('userId', userId);
        return this.http.post<any>(`${this.apiUrl}/${apartmentId}`, { params })
          .pipe(
           catchError((err) => {
            throw err;
          })
        );
    
    // return this.http.post(`${this.apiUrl}/${apartmentId}/comments`, comment);
  }

  addInterest(apartmentId: number, user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${apartmentId}/interestedUsers`, user);
  }
}

