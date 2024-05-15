import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieMi } from '../api/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }

   getAllCategories(): Observable<CategorieMi[]> {
    return this.Http.get<CategorieMi[]>(this.urlServiceApi+"categories");
  }

}
