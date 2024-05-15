export class GalerieImage {
    id: string;
    imageData?: Blob | File | string | null // assuming imageData is a Base64 encoded string
    tag: string;
    estateId: number;

    constructor(id: string, imageData: Blob, tag: string, estateId: number) {
        this.id = id;
        this.imageData = imageData;
        this.tag = tag;
        this.estateId = estateId;
    }
    
}
