import { DemandeEstate } from "./demandeestate";
import { Documents } from "./document";

export class DocumentDemande {
    idDocumentDemande: DocumentDemandeId;
    idDocument: Documents;
    reference: DemandeEstate;
    idImage: string;

    constructor(
      idDocumentDemande: DocumentDemandeId,
      idDocument: Documents,
      reference: DemandeEstate,
      idImage: string
    ) {
      this.idDocumentDemande = idDocumentDemande;
      this.idDocument = idDocument;
      this.reference = reference;
      this.idImage = idImage;
    }
  }

  export class DocumentDemandeId {
    idDocument: number;
    ref: number;

    constructor(idDocument: number, ref: number) {
      this.idDocument = idDocument;
      this.ref = ref;
    }
  }
