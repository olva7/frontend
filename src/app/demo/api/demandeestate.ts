import { EtatDemande } from "./etatdemande";
import { AppUser } from "./user";

export class DemandeEstate {
    reference?: number;
    prixDemande?: number;
    prixTotale?: number;
    dateCreation?: Date;
    etatDemande?: EtatDemande;
    idUser?: AppUser;

    constructor() {
        // Initialize complex types here if necessary
        this.idUser = new AppUser();
        this.etatDemande = new EtatDemande();

    }
}
