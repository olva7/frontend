import { ComposantEstateMi } from "./composantestate";

export class TypeComposant {
    idTypeComposant: number | undefined;
    typeComposantEstate?: string;
    composants: ComposantEstateMi[]; // Array to hold related ComposantEstateMi entities

    constructor() {
        this.composants = []; // Initialize to ensure it's not undefined
    }
}
