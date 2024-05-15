import { EtatMi } from "./etatmi";

export class EtatEstateMi {
    idEtatEstateMI: number | undefined;
    etatEstate?: string;
    detailsContrat?: string;
    etatMis: EtatMi[]; // Array to hold related EtatMi entities

    constructor() {
        this.etatMis = []; // Initialize to ensure it's not undefined
    }
}
