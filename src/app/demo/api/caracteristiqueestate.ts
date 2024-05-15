import { EstateMi } from "./estatemi";

export class CaracteristiqueEstateMi {
    idCaracteristiqueEstate: number | undefined;
    idEstate: EstateMi;  // Assuming EstateMi model includes an id and necessary details
    serviceAssocie?: string;
    caracteristiqueTag?: string;
    valeurCaracteristique?: string;
    prixSupplementaire?: number;  // BigDecimal in Java maps to number in TypeScript
    surfaceCaracteristique?: number;

    constructor() {
        this.idEstate = new EstateMi(); // Initialize to ensure it's not undefined
    }
}
