import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeEstate } from '../api/demandeestate';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DemandeEstateService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }
    countEstatesByEtatEstateEquals2(): Observable<number> {
        return this.Http.get<number>(`${this.urlServiceApi}count-etat-2`);
    }
    countEstatesByEtatEstateEquals3(): Observable<number> {
        return this.Http.get<number>(`${this.urlServiceApi}count-etat-3`);
    }
    countEstatesByEtatEstateEquals1(): Observable<number> {
        return this.Http.get<number>(`${this.urlServiceApi}count-etat-1`);
    }

   /*add(demandeData: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return throwError(() => new Error('Le token n\'a pas été trouvé dans le stockage local'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.Http.post<any>(`${this.urlServiceApi}addDemande`, demandeData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Gérer le cas où le token est invalide ou expiré
          return throwError(() => new Error('Votre session a expiré. Veuillez vous reconnecter.'));
        } else {
          // Autres erreurs HTTP
          return throwError(() => new Error('Une erreur s\'est produite lors de l\'ajout de la demande.'));
        }
      })
    );
  }*/
  add(demandeData: any): Observable<any> {
    const token = localStorage.getItem('jwt');

    // Assurer la présence du token avant de faire la requête
    if (!token) {
      return throwError(() => new Error('Authentication required. Please login.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ajouter Content-Type si nécessaire
    });

    return this.Http.post<any>(`${this.urlServiceApi}addDemande`, demandeData, { headers })
      .pipe(
        catchError(err => {
          // Ici, vous pouvez gérer les erreurs de manière plus spécifique si nécessaire
          console.error('Error during adding demande:', err);
          return throwError(() => new Error('Error during adding demande'));
        })
      );
  }

    countDemandes(): Observable<number> {
        return this.Http.get<number>(`${this.urlServiceApi}count_demande`);
    }

  getAllDemandesEstate(): Observable<DemandeEstate[]> {
    return this.Http.get<DemandeEstate[]>(this.urlServiceApi+"demendes/all");
  }
  updateDemandeEstateAccepter(demandeId: number): Observable<DemandeEstate> {
    return this.Http.put<DemandeEstate>(`${this.urlServiceApi}mettre-a-jour-accepter/${demandeId}`, {});
  }
  updateDemandeEstateRefuser(demandeId: number): Observable<DemandeEstate> {
    return this.Http.put<DemandeEstate>(`${this.urlServiceApi}mettre-a-jour-refuser/${demandeId}`, {});
  }

}
