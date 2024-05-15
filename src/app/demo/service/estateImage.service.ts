import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstateImage } from '../api/estateimage';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable()
export class EstateImageService {
    private urlServiceApi="http://localhost:8083/";

    constructor(private http: HttpClient) { }



    getByIdImageData(id: number): Observable<EstateImage[]> {
        return this.http.get<EstateImage[]>(`${this.urlServiceApi}getAll/${id}`);
    }
    uploadImage(idEstate: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`http://localhost:8083/upload/${idEstate}`, formData, {
          reportProgress: true,
          observe: 'events'
        }).pipe(
          catchError(this.handleError)
        );
      }

      private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }


}
