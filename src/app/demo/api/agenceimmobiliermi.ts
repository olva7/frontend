import { EstateMi } from "./estatemi";
import { AppUser } from "./user";

export class AgenceImmobiliereMi {
    idAgenceImmobilierMI: number | undefined;
    nomAgence?: string;
    numTelMobile?: number;
    addressAgence?: string;
    addressMail?: string;
    siteWeb?: string;
    reseauSociaux?: string;
    numTelFixe?: number;
    numFax?: number;
    logoAgence?: string;
    description?: string;
    latitudeAgence?: number;
    longitudeAgence?: number;
    estateMis?: EstateMi[];
    appUser?: AppUser;

   
}
