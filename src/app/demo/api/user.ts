import { AgenceImmobiliereMi } from "./agenceimmobiliermi";
import { DemandeEstate } from "./demandeestate";
import { Role } from "./role";

export class AppUser {
    idUser?: number;
    firstname?: string;
    lastname?: string;
    phonenumber?: number;
    usernam?: string; // Note: it's spelled 'usernam' in Java, likely a typo
    email?: string;
    dateDeNaissance?: Date;
    dateCreation?: Date;
    password?: string;
    profileImage?: any; // Could be a string for base64 encoded images or any other format
    //tokens?: Token[];
    role?: Role;
    agenceImmobiliereMi?: AgenceImmobiliereMi;
    demandeEstateList?: DemandeEstate[];


}

