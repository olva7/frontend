import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCaracteristiqueMi } from '../api/typecaracteristique';

@Injectable({
  providedIn: 'root'
})
export class TypeCaracteristiqueService {

    private urlServiceApi="http://localhost:8083/";


  constructor(private Http:HttpClient) {

   }
   /*getAllTypeMiByIdCaracteristique(id: number): Observable<TypeCaracteristiqueMi[]> {
    const url = `${this.urlServiceApi}caracteristiqueType/${id}`;
    return this.Http.get<TypeCaracteristiqueMi[]>(url);
  }*/
  getTypeMiByIdCaracteristique(idTypeEstateMI: number): Observable<TypeCaracteristiqueMi[]> {
    return this.Http.get<TypeCaracteristiqueMi[]>(`${this.urlServiceApi}caracteristiqueType/${idTypeEstateMI}`);
  }


}
