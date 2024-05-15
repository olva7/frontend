// src/app/galerie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalerieService {
  private apiUrl = 'http://localhost:8083/api/galerie'; // Adjust the API URL accordingly

  constructor(private http: HttpClient) { }

  uploadImage(file: File, estateId: number, tag?: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('estateId', estateId.toString());
    if (tag) {
      formData.append('tag', tag);
    }

    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getImagesByEstateId(estateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images/estate/${estateId}`);
  }
}
