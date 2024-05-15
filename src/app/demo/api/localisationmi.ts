import { EstateMi } from "./estatemi";

export class LocalisationMi {
    idLocalisationMI!: number;
    locIdLocalisation?: LocalisationMi;  // Optional to support self-referencing
    nomLocalisation?: string;
    logoLocalisation?: string;
    codePostalLocalisation?: number;
    atitudeLocalisation?: number;  // Note the typo in the original Java model
    longitude?: number;
    descriptionLocalisation?: string;
    abreviationLocalisation?: string;
    //estateMis?: EstateMi[];         // Ignored in JSON serialization but included for model completeness
    //localisationMis?: LocalisationMi[];  // Self-reference for nested localisations


}
