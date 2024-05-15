import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EMPTY, Observable } from 'rxjs';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { EstatemiService } from 'src/app/demo/service/estatemi.service';
import { map, switchMap } from 'rxjs/operators'; // RxJS operators
import { ParamMap } from '@angular/router'; // Angular Router class
import { DemandeEstateService } from 'src/app/demo/service/demande.service';
import { DemandeEstate } from 'src/app/demo/api/demandeestate';
import { AppUser } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';
import {jwtDecode} from 'jwt-decode';
import { DocumentDemande } from 'src/app/demo/api/documentdemande';
import { HttpClient } from '@angular/common/http';
import { Documents } from 'src/app/demo/api/document';
@Component({
    templateUrl: './panelsdemo.component.html'
})
export class PanelsDemoComponent implements OnInit {
    estate: EstateMi | undefined;

    items: MenuItem[] = [];
    demandeData: DemandeEstate = new DemandeEstate();
    fetchedUser: AppUser | null = null;
    userEmail: string = '';
    cardMenu: MenuItem[] = [];
    userId?: number;
    activeIndex: number = 0;
    documents: DocumentDemande[] = [];
    doc : Documents[] = [];
    selectedFile: File | null = null;
    ref?:number;
    idDocument?: number;
    constructor(
        private estateService: EstatemiService,
        private route: ActivatedRoute,private router: Router,private http: HttpClient,
        private demandeService: DemandeEstateService,private authService: UserService
      ) {

      }

      ngOnInit(): void {
        this.fetchDocuments();
        this.testFetchUserByEmail();
        this.route.paramMap.subscribe(params => {
          const idParam = params.get('id'); // Récupère l'ID sous forme de string ou null
          if (idParam) {
            const id = +idParam; // Convertit la string en nombre
            this.estateService.getEstateById(id).subscribe(data => {
              this.estate = data;
            }, error => {
              console.error('Erreur lors du chargement des détails de l\'estate', error);
            });
          } else {
            console.error('ID manquant dans l\'URL');
          }
        });
    }
    fetchDocuments(): void {
        // Supposons que vous avez une API pour récupérer les documents
        this.http.get<Documents[]>('http://localhost:8083/document/all').subscribe({
          next: (data) => this.doc = data,
          error: (err) => console.error('Error fetching documents', err)
        });
      }
      onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
      }
      /*uploadDocument(file: File, reference: number, documentId: number): void {
        if (!file) {
          alert('Please select a file.');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const url = `http://localhost:8083/upload/${reference}/${documentId}`;

        this.http.post(url, formData).subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
            alert('Image uploaded successfully!');
          },
          error: (err) => {
            console.error('Error uploading file', err);
            alert('Failed to upload image.');
          }
        });
      }*/
      uploadDocument(file: File | null, reference: number | undefined, documentId: number): void {
        if (!file) {
          alert('Please select a file.');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const url = `http://localhost:8083/upload/${reference}/${documentId}`;

        this.http.post(url, formData).subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
            alert('Image uploaded successfully!');
          },
          error: (err) => {
            console.error('Error uploading file', err);
            alert('Failed to upload image.');
          }
        });
      }
    fetchUserData(): void {
        const decodedToken = this.authService.decodeToken();
        const userEmail = decodedToken.sub;
        // Utiliser userEmail pour faire une requête
        this.authService.fetchUserIdByEmail(userEmail).subscribe(
          data => console.log(data),
          error => console.log('Error fetching data:', error)
        );
      }
    /*addDemande(): void {
        console.log( this.fetchedUser?.idUser)
        this.demandeData.prixDemande = this.estate?.prixTotale
        //this.demandeData.appUser?.idUser = this.fetchedUser?.idUser;
        if (!this.demandeData.appUser) {
            this.demandeData.appUser = {};
        }

        // Assignation sécurisée de `idUser`
        console.log(this.demandeData,"demande");
        this.demandeData.appUser.idUser = this.fetchedUser ? this.fetchedUser.idUser : undefined;
        this.demandeData.prixDemande=this.estate?.prixTotale;
        console.log(this.demandeData,"demande");
        this.demandeService.add(this.demandeData).subscribe({
            next: (response) => {
              console.log('Demande ajoutée avec succès', response);
              this.activeIndex = 1;
              this.ref = response.reference;
              console.log(this.ref, 'reference');
              console.log(response.demandeData,"demande");
              // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
            },
            error: (error) => {
              console.error('Erreur lors de l\'ajout de la demande', error);
              // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions de gestion des erreurs
            }
        });
      }*/
      addDemande(): void {
        // Vérification préliminaire pour s'assurer que les données nécessaires sont présentes
        if (!this.fetchedUser?.idUser || !this.estate?.prixTotale) {
            console.error('Données utilisateur ou immobilier manquantes');
            return;
        }

        // Mise à jour des données de la demande
        this.demandeData.prixDemande = this.estate.prixTotale;
        this.demandeData.idUser = { idUser: this.fetchedUser.idUser };

        console.log(this.demandeData, "Demande data avant envoi");

        // Appel au service pour ajouter la demande
        this.demandeService.add(this.demandeData).subscribe({
            next: (response) => {
                console.log('Demande ajoutée avec succès', response);
                if (response && response.reference) {
                    this.activeIndex = 1; // Assurez-vous que cette logique est nécessaire ici
                    this.ref = response.reference;
                    console.log(this.ref, 'Référence de la demande');
                    // Actions supplémentaires après succès
                } else {
                    console.error('Réponse inattendue du serveur', response);
                    // Gérer le cas où la réponse n'est pas ce que vous attendiez
                }
            },
            error: (error) => {
                console.error('Erreur lors de l\'ajout de la demande', error);
                // Gestion de l'erreur, afficher un message à l'utilisateur, etc.
            }
        });
    }
      getUserEmail(): string  {
        const token = this.authService.getToken();
        if (token) {
          const decoded: any = jwtDecode(token);
          return decoded.sub;  // 'sub' est supposé contenir l'email de l'utilisateur
        }
        return "";
      }
      testFetchUserByEmail(): void {
        //const emailToTest = 'john.doe@exemple.com'; // Remplacez par l'email que vous voulez tester
        this.userEmail = this.getUserEmail();
        this.authService.fetchUserByEmail(this.userEmail).subscribe({
          next: (user: AppUser) => {
            this.fetchedUser = user;
            console.log('Fetched User:', user);
          },
          error: (error) => {
            console.error('Failed to fetch user:', error);
            this.fetchedUser = null;
          }
        });
      }




}
