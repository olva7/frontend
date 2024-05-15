import { EstateMi } from "./estatemi";
import { TypeComposant } from "./typecomposant";

export class ComposantEstateMi {
    //id: ComposantEstateMiId; // Composite key
    idEstate: EstateMi;
    idTypeComposant: TypeComposant;
    nbrComposant?: number;

    constructor() {
        //this.id = new ComposantEstateMiId(); // Initialize to ensure it's not undefined
        this.idEstate = new EstateMi();  // Initialize to ensure it's not undefined
        this.idTypeComposant = new TypeComposant();  // Initialize to ensure it's not undefined
    }
}
