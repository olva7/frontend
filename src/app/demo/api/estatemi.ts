import { AgenceImmobiliereMi } from "./agenceimmobiliermi";
import { CaracteristiqueComposant } from "./caracteristiquecomposant";
import { CaracteristiqueEstateMi } from "./caracteristiqueestate";
import { ComposantEstateMi } from "./composantestate";
import { EtatMi } from "./etatmi";
import { GalerieMi } from "./galeriemi";
import { LocalisationMi } from "./localisationmi";
import { TypeEstateMi } from "./typeestate";
import { AppUser } from "./user";

export class EstateMi {
    idEstateMI?: number ;
    //idAgence: AgenceImmobiliereMi;
    idUser:AppUser;
    idTypeEstate: TypeEstateMi;
    //idLocalisation: LocalisationMi;
    surfacieEnM?: number;
    addressEstate?: string;
    disponibilite?: Date;
    categorieMiTag?: string | null;
    dateAjout?: Date;
    dateConstruction?: Date;
    nbreComposants?: number;
    prixTotale?: number;
    prixEnM?: number;
    latitude?: string;
    longitude?: string;
    apportPropre?: number;
    etatEstate?: number;
    apportPropreMinimal?: number;
    loyer?: number;
    libEstate?: string;
    etatMis?: EtatMi[];
    caracteristiqueEstateMis?: CaracteristiqueEstateMi[];
    caracteristiqueComposants?: CaracteristiqueComposant[];
    galerieMis?: GalerieMi[];
    composantEstateMiList?: ComposantEstateMi[];

    constructor() {
        // Initialize nested objects to ensure integrity when creating new instances
        this.idUser = new AppUser();
        this.idTypeEstate = new TypeEstateMi();
        //this.idLocalisation = new LocalisationMi();
        this.etatMis = [];
        this.caracteristiqueEstateMis = [];
        this.caracteristiqueComposants = [];
        this.galerieMis = [];
        this.composantEstateMiList = [];
    }
}
