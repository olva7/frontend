export class EstateImage {
    idEstate: number | undefined;
    idImage?: string;
    imageData?: Blob | File | string | null // assuming imageData is a Base64 encoded string
}
