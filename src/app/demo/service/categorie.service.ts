import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { CategorieMi } from '../api/categorie';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }
    getCategorieMiById(id: number | undefined): Observable<string> {
        return this.Http.get(`${this.urlServiceApi}categories/${id}`, { responseType: 'text' }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError('Something bad happened; please try again later.');
    }
   getAllCategories(): Observable<CategorieMi[]> {
    return this.Http.get<CategorieMi[]>(this.urlServiceApi+"categories");
  }


}
