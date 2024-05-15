import { DocumentDemande } from "./documentdemande";

export class Documents {
    idDocument: number;
    documentLib: string;
    documentDemandes: DocumentDemande[];

    constructor(idDocument: number, documentLib: string, documentDemandes: DocumentDemande[]) {
      this.idDocument = idDocument;
      this.documentLib = documentLib;
      this.documentDemandes = documentDemandes;
    }
  }
