import { EstateMi } from "./estatemi";
import { FormeComposantMi } from "./formecomposantmi";

export class CaracteristiqueComposant {
    idCaracteristiqueComposant: number | undefined;
    idEstate: EstateMi;
    idForme: FormeComposantMi;
    // typeComposantEstate: TypeComposant; // Uncomment if you use this relationship
    composant?: number;
    longueurComposant?: number;
    largeurComposant?: number;
    surfacee?: number;

    constructor() {
        this.idEstate = new EstateMi(); // Initialize to ensure it's not undefined
        this.idForme = new FormeComposantMi(); // Initialize to ensure it's not undefined
        // this.typeComposantEstate = new TypeComposant(); // Initialize if used
    }
}
