import { EstateMi } from "./estatemi";
import { EtatEstateMi } from "./etatestatemi";

export class EtatMi {
    //idEtatEstatMI: number | undefined;
    idEstate: EstateMi;
    idEtatEstate: EtatEstateMi;
    dateDisponibilite: Date | undefined; // Use Date type for dates

    constructor() {
        this.idEstate = new EstateMi();  // Initialize to ensure it's not undefined
        this.idEtatEstate = new EtatEstateMi();  // Initialize to ensure it's not undefined
    }
}
