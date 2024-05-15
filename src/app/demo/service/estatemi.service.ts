import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

import { EstateMi } from '../api/estatemi';

@Injectable({
  providedIn: 'root'
})
export class EstatemiService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }
   getEstateById(id: number): Observable<any> {
    return this.Http.get<EstateMi>(`${this.urlServiceApi}get/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Estate not found');
    } else {
      return throwError('An unexpected error occurred');
    }
  }


   getAllEstates(): Observable<EstateMi[]> {
    return this.Http.get<EstateMi[]>(this.urlServiceApi+"estates");
  }
  add(estateData: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return throwError('Le token n\'a pas été trouvé dans le stockage local');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.Http.post<any>(`${this.urlServiceApi}adding`, estateData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Gérer le cas où le token est invalide ou expiré
          return throwError('Votre session a expiré. Veuillez vous reconnecter.');
        } else {
          // Autres erreurs HTTP
          return throwError('Une erreur s\'est produite lors de l\'ajout de l\'estate.');
        }
      })
    );
  }

}
