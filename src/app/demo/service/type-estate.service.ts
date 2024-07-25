import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCaracteristiqueMi } from '../api/typecaracteristique';
import {TypeEstateMi} from "../api/typeestate";

@Injectable({
    providedIn: 'root'
})
export class TypeEstaetService {

    private urlServiceApi="http://localhost:8083/";


    constructor(private Http:HttpClient) {

    }
    getTypeMiById(id: number): Observable<TypeEstateMi[]> {
        return this.Http.get<TypeEstateMi[]>(`${this.urlServiceApi}typeMi/${id}`);
    }
    getTypeEstateMiById1(id: number): Observable<string> {
        return this.Http.get<string>(`${this.urlServiceApi}type_estate/${id}`);
    }
    getTypeEstateMiById(id: number): Observable<string> {
        return this.Http.get(`${this.urlServiceApi}type_estate/${id}`, { responseType: 'text' });
    }


}
