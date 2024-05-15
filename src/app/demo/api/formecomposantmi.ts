import { CaracteristiqueComposant } from "./caracteristiquecomposant";

export class FormeComposantMi {
    idFormeComposant: number | undefined;
    forme?: string;
    caracteristiqueComposants: CaracteristiqueComposant[]; // Array to hold related CaracteristiqueComposant entities

    constructor() {
        this.caracteristiqueComposants = []; // Initialize to ensure it's not undefined
    }
}
