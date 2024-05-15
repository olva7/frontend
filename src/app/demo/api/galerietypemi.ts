import { GalerieMi } from "./galeriemi";

export class GalerieTypeMi {
    idGalerieTypeMI: number | undefined;
    typeGalerie?: string;
    galerieMis: GalerieMi[]; // Array to hold related GalerieMi entities

    constructor() {
        this.galerieMis = []; // Initialize to ensure it's not undefined
    }
}
