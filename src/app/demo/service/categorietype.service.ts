import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieMi } from '../api/categorie';
import { CategorieType } from '../api/categorietype';

@Injectable({
  providedIn: 'root'
})
export class CategorieTypeService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }

   getAllTypeMiByIdCategorieMi(idCategorie: number): Observable<CategorieType[]> {
    return this.Http.get<CategorieType[]>(`${this.urlServiceApi}categorieType/${idCategorie}`);
  }

}
