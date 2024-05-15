import { EstateMi } from "./estatemi";
import { GalerieTypeMi } from "./galerietypemi";

export class GalerieMi {
    idGalerieMI!: number;
    idEstate: EstateMi;
    //idTypeGalerie: GalerieTypeMi;
    urlGalerie?: string;
    tag?: string;

    constructor() {
        this.idEstate = new EstateMi();  // Initialize to ensure it's not undefined
    }
}
