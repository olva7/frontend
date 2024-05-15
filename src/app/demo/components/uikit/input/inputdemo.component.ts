import { Component, OnInit } from '@angular/core';

import { MessageService, SelectItem } from 'primeng/api';
import { CaracteristiqueTypeEstate } from 'src/app/demo/api/caracteristiquetypeestate';
import { CategorieMi } from 'src/app/demo/api/categorie';
import { CategorieType } from 'src/app/demo/api/categorietype';
import { TypeCaracteristiqueMi } from 'src/app/demo/api/typecaracteristique';
import { TypeEstateMi } from 'src/app/demo/api/typeestate';
import { CategorieService } from 'src/app/demo/service/categorie.service';
import { CategorieTypeService } from 'src/app/demo/service/categorietype.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { TypeCaracteristiqueService } from 'src/app/demo/service/typecaracteristique.service';
import * as L from 'leaflet';
import { UserService } from 'src/app/demo/service/user.service';
import { EstatemiService } from 'src/app/demo/service/estatemi.service';
import { NgForm } from '@angular/forms';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { AgenceImmobiliereMi } from 'src/app/demo/api/agenceimmobiliermi';
import { EstateImageService } from 'src/app/demo/service/estateImage.service';
import { HttpEventType } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { AppUser } from 'src/app/demo/api/user';

@Component({
    templateUrl: './inputdemo.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-multiselect {
            min-width: 15rem;
        }

        :host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
            min-width: 20rem;
        }

        :host ::ng-deep .multiselect-custom .p-multiselect-label {
            padding-top: .25rem;
            padding-bottom: .25rem;

        }

        :host ::ng-deep .multiselect-custom .country-item.country-item-value {
            padding: .25rem .5rem;
            border-radius: 3px;
            display: inline-flex;
            margin-right: .5rem;
            background-color: var(--primary-color);
            color: var(--primary-color-text);
        }

        :host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
            width: 17px;
        }

        :host ::ng-deep .multiselect-custom .country-item {
            display: flex;
            align-items: center;
        }

        :host ::ng-deep .multiselect-custom .country-item img.flag {
            width: 18px;
            margin-right: .5rem;
        }

        :host ::ng-deep .multiselect-custom .country-placeholder {
            padding: 0.25rem;
        }

        :host ::ng-deep .p-colorpicker {
            width: 2.5em
        }
    `]
})
export class InputDemoComponent implements OnInit {
myUploadHandler($event: any) {
throw new Error('Method not implemented.');
}
    agenceImmobiliere?: AgenceImmobiliereMi;
/*addEstate() {
throw new Error('Method not implemented.');
}*/
onSubmit() {
throw new Error('Method not implemented.');
}
    countries: any[] = [];
    currentUser: any;

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];
    map: any;


    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";
    TypeEstate?: TypeEstateMi;
    valueKnob = 20;
    categories: CategorieMi[] = [];
    categorieTypes: CategorieType[]=[];
    types: TypeEstateMi[] = [];
    selectedCategoryId?: number; // ou un type plus précis pour représenter une liste de catégories
    selectedTypeId?: number;
    selectedCaracteristiqueId?: number;
    typess?: TypeCaracteristiqueMi[] = [];
    caracteristiques: CaracteristiqueTypeEstate[]=  [];
    selectedCaracteristiqueIds: number[] = [];
    uploadedFiles: any[] = [];
    estateSaved: EstateMi = new EstateMi();
    estate: EstateMi = new EstateMi();
    userId?: number;
    file: File | null = null;
    message: string | null = null;
    fetchedUser: AppUser | null = null;
    userEmail: string = '';
    lastAddedEstateId: number | null = null;
    typeEstate?:string;
    typeEstateMi?:TypeEstateMi;

    constructor(private estateService: EstatemiService ,private messageService: MessageService,private authService: UserService,private categorieTypeService: CategorieTypeService,private typeService: TypeCaracteristiqueService, private categorieService:CategorieService, private imageUploadService: EstateImageService) { }

    ngOnInit() {

        this.loadCategories();
        //this.loadTypes();
        //this.loadCaracteristiques(1);
        //this.initMap();
        //this.displayToken();
        //this.displayTokenDetails();

        //this.fetchUserId1();
        //this.getUserEmail();
    
        this.testFetchUserByEmail();
        //this.getUserEmail1();
        const userRole = this.authService.getUserRole();
        console.log('User role:', userRole);



    }
    //user=this.fetchUserId1()
    getUserEmail(): string  {
        const token = this.authService.getToken();
        if (token) {
          const decoded: any = jwtDecode(token);
          return decoded.sub;  // 'sub' est supposé contenir l'email de l'utilisateur
        }
        return "";
      }
      getUserEmail1(): string  {
        const token = this.authService.getToken();
        if (token) {
          const decoded: any = jwtDecode(token);
          return decoded.role;  // 'sub' est supposé contenir l'email de l'utilisateur
        }
        return "";
      }
      displayUserEmail(): void {
        this.userEmail = this.getUserEmail();
      }

      /*addEstate1(): void {
        this.authService.fetchUserByEmail(getUserEmail()).subscribe({
          next: (user: AppUser) => {
            this.estateSaved.idUser = user;  // Directement l'objet AppUser
            this.saveEstate();  // Appel de la méthode pour sauvegarder l'estate
          },
          error: (error) => {
            console.error('Error fetching user:', error);
            // Gestion des erreurs
          }
        });
      }*/

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
      addEstate1(): void {
        // Récupération de l'objet AppUser
        this.authService.fetchUserByEmail(this.getUserEmail()).subscribe({
          next: (user: AppUser) => {
            // Affecter l'objet AppUser à l'objet estateSaved
            this.estateSaved.idUser = user;

            // Logique pour sauvegarder l'estate
            this.estateService.add(this.estateSaved).subscribe(
              response => {
                console.log(response, "hello");
                this.estateSaved = response;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Estate ajoutée avec succès',
                  icon: 'pi pi-check',
                  life: 3000
                });
                // Actions supplémentaires si nécessaire
              },
              error => {
                console.error('Error saving estate: ', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erreur lors de la sauvegarde de l\'estate',
                  detail: error.message || 'Une erreur s\'est produite',
                  icon: 'pi pi-exclamation-triangle',
                  life: 5000
                });
              }
            );
          },
          error: (error) => {
            console.error('Error fetching user:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur lors de la récupération de l\'utilisateur',
              detail: 'Impossible de récupérer l\'utilisateur',
              icon: 'pi pi-exclamation-triangle',
              life: 5000
            });
          }
        });
      }

      /*fetchUserId1(): void {
        const email = this.getUserEmail();
        if (email) {
          this.authService.fetchUserIdByEmail(email).subscribe({
            next: (id) => {
              this.userId = id;
              console.log('Received User ID:', id);
            },
            error: (error) => {
              console.error('Failed to fetch user ID:', error);
            }
          });
        } else {
          console.error('No email found in token.');
        }
      }*/
    displayToken(): void {
        const token = this.authService.getToken();
        if (token) {
          console.log('JWT Token:', token);
        } else {
          console.log('No token found in local storage.');
        }
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
      fetchUserId(email: string): void {
        this.authService.fetchUserIdByEmail(email).subscribe({
          next: (id) => {
            this.userId = id;
            console.log('Received User ID:', id);
          },
          error: (error) => {
            console.error('Failed to fetch user ID:', error);
          }
        });
      }


      displayTokenDetails(): void {
        if (this.authService.isTokenExpired()) {
          console.log('Token is expired.');
        } else {
          const decodedToken = this.authService.decodeToken();
          console.log('Decoded JWT:', decodedToken);
        }
      }
    /*ngAfterViewInit(): void {
        this.initMap()
    }*/

    initMap(){
        //initialisation de la carte
        this.map = L.map('map').setView([37.16031654673677, 9.492187500000002],5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
        //this.resetLocalisationForm();
    }
    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }


    loadCaracteristiques(id: number): void {
        this.typeService.getTypeMiByIdCaracteristique(id).subscribe({
          next: (data) => {
            this.typess = data;
          },
          error: (err) => console.error('There was an error:', err)
        });
      }
      /*myUploadHandler(event: any) {
        // Vous devez obtenir l'ID de l'estate d'une manière appropriée
        const idEstate = 1;

        for (let file of event.files) {
          const formData: FormData = new FormData();
          formData.append('file', file);

          this.imageUploadService.uploadImage(idEstate, file).subscribe({
            next: (response) => {
              this.uploadedFiles.push(file);
              console.log('Upload successful:', response);
              event.onProgress.emit({ files: this.uploadedFiles });
            },
            error: (error) => {
              console.error('Error uploading file:', error);
            },
            complete: () => {
              event.onComplete.emit(); // Signale à PrimeNG que l'upload est terminé
            }
          });
        }}*/
        onFileSelected(event: any): void {
            this.file = event.target.files[0];
          }

         /* upload(): void {
            if (!this.file) {
              this.message = 'Please select a file.';
              return;
            }
            const idEstate = 22; // Assurez-vous d'obtenir cet ID de manière appropriée
            this.imageUploadService.uploadImage(idEstate, this.file).subscribe({
              next: (event) => {
                if (event.type === HttpEventType.Response) {
                  this.message = event.body.message;
                }
              },
              error: (error) => {
                this.message = error;
              }
            });
          }*/
          /*onUpload(event: any): void {
            if (event.files.length === 0) {
              this.message = 'No file selected.';
              return;
            }

            const formData = new FormData();
            // Assumer que vous téléchargez un seul fichier pour la simplicité
            formData.append('file', event.files[0], event.files[0].name);
            const idEstate = 22; // Assurez-vous d'obtenir cet ID de manière appropriée

            this.imageUploadService.uploadImage(idEstate, formData).subscribe({
              next: (event) => {
                if (event.type === HttpEventType.Response) {
                  this.message = `Upload successful: ${event.body.message}`;
                }
              },
              error: (error) => {
                this.message = `Upload failed: ${error.message}`;
              }
            });
          }*/









    onCategorySelectionChange() {
        console.log('Selected category ID:', this.selectedCategoryId);
        if (this.selectedCategoryId) {
            this.categorieTypeService.getAllTypeMiByIdCategorieMi(this.selectedCategoryId).subscribe(
                data => {
                    console.log("Raw data from API:", data);
                    this.types = data.map(ct => ct.idTypeEstate).filter(t => t !== undefined)as TypeEstateMi[]; // Assurez-vous que `idTypeEstate` est le nom correct de la propriété
                    //this.selectedTypeId = null; // Réinitialiser le type sélectionné lorsque la catégorie change

                    console.log("Types loaded:", this.types);
                    //this.types.TypeEstateMi.typeEstate
                    console.log('Selected Type ID:', this.selectedTypeId);
                    //this.selectedTypeId = TypeEstateMi.idTypeEstate;
                   // let firstTypeEstate = this.types[this.selectedTypeId-1].typeEstate;
                },
                error => {
                    console.error('There was an error loading types:', error);
                }
            );
        } else {
            this.types = []; // Réinitialiser les types si aucune catégorie n'est sélectionnée
        }
    }
    loadCaracteristiquesByType(): void {
        console.log('Selected Type ID:', this.selectedTypeId);


        if (this.selectedTypeId) {
            this.typeService.getTypeMiByIdCaracteristique(this.selectedTypeId).subscribe(
                data => {
                    console.log("Raw data from API:", data);
                    // Supposons que data est un tableau de TypeCaracteristiqueMi
                    this.caracteristiques = data.map(tc => tc.idCaracteristiqueMi).filter(tc => tc !== undefined) as CaracteristiqueTypeEstate[];
                    console.log("Types loaded:", this.caracteristiques);
                },
                error => console.error('Erreur lors du chargement des caractéristiques:', error)
            );
        }else {
            this.caracteristiques = [];
        }
    }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(this.categories)
      },
      error => {
        console.error('Error loading categories: ', error);
      }
    );
  }
 /* addEstate(): void {
    // Afficher les détails de l'estate dans la console
    console.log(this.selectedTypeId,"test")
    //this.selectedTypeId=this.estateSaved.idType.idTypeEstateMI;
    this.estateSaved.idType.idTypeEstateMI=this.selectedTypeId
    this.estateSaved.idUser.idUser

    console.log(this.estateSaved,"test");
    //this.estateSaved.idUser=this.user;
    const email = this.getUserEmail();
  if (!email) {
    console.error('No email found, cannot fetch user ID.');
    return;
  }
  console.log('Estate to be saved:', this.estateSaved);


  this.authService.fetchUserByEmail(email).subscribe({
    next: (user: AppUser) => {
      this.estateSaved.idUser = user;  // Assumant que `idUser` est un objet de type `AppUser`
      console.log('User ID set, saving estate now...');
      console.log('Estate to be saved:', this.estateSaved);
      this.estateService.add(this.estateSaved).subscribe({
        next: (response) => {
          console.log('Estate saved:', response);
          this.estateSaved = response;
          this.messageService.add({
            severity: 'success',
            summary: 'Stock ajoutée avec succès',
            icon: 'pi pi-check',
            life: 3000
          });
        },
        error: (error) => {
          console.error('Error saving estate:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur lors de la sauvegarde du stock',
            detail: error.message || 'Une erreur s\'est produite',
            icon: 'pi pi-exclamation-triangle',
            life: 5000
          });
        }
      });
    },
    error: (error) => {
      console.error('Failed to fetch user:', error);
    }
  });

  }*/
  ////////////////////////////////////////////////////////
  /*addEstate(): void {
    // Afficher les détails de l'estate dans la console
    console.log(this.selectedTypeId,"test")
    //this.selectedTypeId=this.estateSaved.idType.idTypeEstateMI;
    //this.estateSaved.idType.idTypeEstateMI=this.selectedTypeId
    this.estateSaved.idTypeEstate.idTypeEstateMI=this.selectedTypeId;
    //this.estateSaved.idEstateMI = this.estate.idEstateMI;
    console.log(this.estateSaved,"test");
    //this.estateSaved.idUser=this.user;
    this.estateSaved.idUser.idUser=this.fetchedUser?.idUser;

    console.log('Data being sent:', JSON.stringify(this.estateSaved));

    // Sauvegarde de l'estate
    this.estateService.add(this.estateSaved).subscribe(
      response => {
        // Traitement de la réponse de sauvegarde de l'estate
        console.log(response, "hello");
        this.estateSaved = response;

        // Affichage d'un message de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Stock ajoutée avec succès',
          icon: 'pi pi-check',
          life: 3000
        });

        // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
        //this.resetForm();
      },
      error => {
        // Gestion des erreurs lors de la sauvegarde de l'estate
        console.error('Error saving estate: ', error);

        // Affichage d'un message d'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur lors de la sauvegarde du stock',
          detail: error.message || 'Une erreur s\'est produite',
          icon: 'pi pi-exclamation-triangle',
          life: 5000
        });
      }
    );
  }*/
  addEstate(): void {
    console.log(this.selectedTypeId, "test");
    this.estateSaved.idTypeEstate.idTypeEstateMI = this.selectedTypeId;
    this.estateSaved.idUser.idUser = this.fetchedUser?.idUser;
    console.log('Data being sent:', JSON.stringify(this.estateSaved));
    this.estateSaved.idTypeEstate.typeEstate

    // Ajoute l'estate
    this.estateService.add(this.estateSaved).subscribe(
        response => {
            console.log(response, "hello");
            this.estateSaved = response;
            // Stockez l'ID de l'estate ajouté
            this.lastAddedEstateId = response.idEstateMI;

            this.messageService.add({
                severity: 'success',
                summary: 'Estate ajouté avec succès',
                icon: 'pi pi-check',
                life: 3000
            });

            // Vérifier si une image a été sélectionnée
            if (this.file) {
                // Uploader l'image en utilisant l'ID de l'estate
                this.upload();
            } else {
                console.warn('No image selected to upload.');
            }

            // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
            // this.resetForm();
        },
        error => {
            console.error('Error saving estate: ', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur lors de l\'ajout de l\'estate',
                detail: error.message || 'Une erreur s\'est produite',
                icon: 'pi pi-exclamation-triangle',
                life: 5000
            });
        }
    );
}

upload(): void {
    if (!this.file) {
        this.message = 'Please select a file.';
        return;
    }

    // Since 'this.file' is checked for null, TypeScript understands it must be a File here
    if (this.lastAddedEstateId === null) {
        this.message = "No estate ID available. Please add an estate first.";
        return;
    }

    this.imageUploadService.uploadImage(this.lastAddedEstateId, this.file).subscribe({
        next: (event) => {
            if (event.type === HttpEventType.Response) {
                this.message = 'Image uploaded successfully: ' + event.body.message;
                console.log(this.message);
            }
        },
        error: (error) => {
            this.message = 'Error uploading image: ' + (error.message || 'An unknown error occurred');
            console.error(this.message);
        }
    });
}


  getUser(): AppUser {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    } else {
      throw new Error('No user data found in local storage');
    }
  }






}
function jwt_decode<T>(token: string) {
    throw new Error('Function not implemented.');
}

