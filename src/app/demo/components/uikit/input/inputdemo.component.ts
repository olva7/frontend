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
import Swal from "sweetalert2";
import {TypeEstaetService} from "../../../service/type-estate.service";

@Component({
    templateUrl: './inputdemo.component.html',
    providers: [MessageService],
    styles: [`
        .custom-file-upload {
            border: 2px solid green;
            display: inline-block;
            padding: 6px 12px;
            cursor: pointer;
            background-color: white;
            color: green;
            border-radius: 5px;
            font-family: Arial, sans-serif;
        }

        .custom-file-upload:hover {
            background-color: green;
            color: white;
        }


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
    private error!: string;
    private errorMessage!: string | null;
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
    categorieMi!:string | null;
    map: any;
    lat:any;
    lng:any;
    marker:any;
    localiserClick:boolean=false;


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
    typeEstate?:string | null;
    typeEstateMi?:TypeEstateMi;
    typeEstateMiList: TypeEstateMi[] = [];


    constructor(private estateService: EstatemiService ,private typeEstateMiService:TypeEstaetService,private categorieMiService: CategorieService
        ,private messageService: MessageService,private authService: UserService,private categorieTypeService: CategorieTypeService,private typeService: TypeCaracteristiqueService, private categorieService:CategorieService, private imageUploadService: EstateImageService) { }

    ngOnInit() {

        this.loadCategories();
        //this.getCategorieMi(1);
        //this.loadTypes();
        //this.loadCaracteristiques(1);
        //this.initMap();
        //this.displayToken();
        //this.displayTokenDetails();
        this.getTypeEstateMiById(1);

        //this.fetchUserId1();
        //this.getUserEmail();

        this.testFetchUserByEmail();
        //this.getUserEmail1();
        const userRole = this.authService.getUserRole();
        console.log('User role:', userRole);



    }
    getTypeMiById(id: number): void {
        this.typeEstateMiService.getTypeMiById(id).subscribe({
            next: (data) => {
                this.typeEstateMiList = data;
                console.log(data);
                this.errorMessage = null;
            },
            error: (error) => {
                console.error('Error fetching data:', error);
                this.errorMessage = 'Failed to load data.';
            }
        });
    }
    getCategorieMi(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.categorieMiService.getCategorieMiById(id).subscribe({
                next: (data) => {
                    this.categorieMi = data;
                    console.log(data);
                    this.errorMessage = null;  // Réinitialiser l'erreur si la requête est réussie
                    resolve(data);  // Resolve the promise with the data
                },
                error: (error) => {
                    console.error('Error fetching category:', error);
                    this.errorMessage = 'Failed to load category data.';
                    this.categorieMi = null;  // Assurer l'absence de données périmées
                    reject('Failed to load category data.');  // Reject the promise with an error message
                }
            });
        });
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

        onFileSelected(event: any): void {
            this.file = event.target.files[0];
          }
// Handles file selection and assigns the selected file to a variable
    handleFileSelection(event: any): void {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        } else {
            console.error('No file selected');
        }
    }











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
    fetchTypeEstate(): void {
        if (this.selectedTypeId !== undefined) {
            this.typeEstateMiService.getTypeEstateMiById(this.selectedTypeId).subscribe({
                next: (data: string) => {
                    this.typeEstate = data;
                    this.estateSaved.idTypeEstate.typeEstate = this.typeEstate || undefined;
                    this.errorMessage = null;
                },
                error: (error) => {
                    console.error('Error fetching data:', error);
                    this.errorMessage = 'Failed to load data.';
                    this.typeEstate = null;
                    this.estateSaved.idTypeEstate.typeEstate = undefined;
                }
            });
        } else {
            console.error('selectedTypeId is undefined.');
            this.estateSaved.idTypeEstate.typeEstate = undefined;
        }
    }
    getTypeEstateMiById(id: number): void {
        this.typeEstateMiService.getTypeEstateMiById(id).subscribe({
            next: (data) => {
                this.typeEstate = data;
                console.log(data);
                this.errorMessage = null;
            },
            error: (error) => {
                console.error('Error fetching data:', error);
                this.errorMessage = 'Failed to load data.';
                this.typeEstate = null;
            }
        });
    }
    /*addEstate(): void {
        console.log(this.selectedTypeId, "test");
        this.estateSaved.idTypeEstate.idTypeEstateMI = this.selectedTypeId;
        console.log(this.selectedCategoryId);
        if (this.selectedCategoryId !== undefined) {
            this.getCategorieMi(this.selectedCategoryId)
                .then((category) => {
                    this.categorieMi = category;
                    this.estateSaved.categorieMiTag = this.categorieMi;
                })
                .catch((error) => {
                    console.error('Error fetching category:', error);
                    this.categorieMi = null;
                    this.estateSaved.categorieMiTag = null;
                });
        }


        //this.estateSaved.categorieMiTag
        this.estateSaved.idUser.idUser = this.fetchedUser?.idUser;
        console.log('Data being sent:', JSON.stringify(this.estateSaved));

        this.estateService.add(this.estateSaved).subscribe({
            next: (response) => {
                console.log(response, "hello");
                this.estateSaved = response;
                this.lastAddedEstateId = response.idEstateMI;

                // SweetAlert pour succès de l'ajout de l'estate
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Estate ajouté avec succès!',
                    confirmButtonText: 'Super!',
                    confirmButtonColor: '#3085d6'
                });

                // Vérifier si une image a été sélectionnée
                if (this.file) {
                    this.upload();
                } else {
                    console.warn('No image selected to upload.');
                    // Afficher une alerte d'erreur si aucune image n'est sélectionnée
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur lors de l\'ajout de l\'estate',
                        text: 'Aucune image sélectionnée pour l\'upload.',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#d33'
                    });
                }
            },
            error: (error) => {
                console.error('Error saving estate: ', error);
                // SweetAlert pour l'échec de l'ajout de l'estate
                Swal.fire({
                    icon: 'error',
                    title: 'Échec de l\'opération',
                    text: 'Impossible d\'ajouter l\'estate: ' + (error.message || 'Une erreur interne s\'est produite'),
                    confirmButtonText: 'Fermer',
                    confirmButtonColor: '#d33'
                });
            }
        });
    }*/
    async addEstate(): Promise<void> {
        try {
            console.log(this.selectedTypeId, "test");
            this.estateSaved.idTypeEstate.idTypeEstateMI = this.selectedTypeId;
            console.log(this.selectedCategoryId);

            if (this.selectedCategoryId !== undefined) {
                try {
                    this.categorieMi = await this.getCategorieMi(this.selectedCategoryId);
                    this.estateSaved.categorieMiTag = this.categorieMi;
                } catch (error) {
                    console.error('Error fetching category:', error);
                    this.categorieMi = null;
                    this.estateSaved.categorieMiTag = null;
                }
            }

            this.estateSaved.idUser.idUser = this.fetchedUser?.idUser;
            console.log('Data being sent:', JSON.stringify(this.estateSaved));

            this.estateService.add(this.estateSaved).subscribe({
                next: (response) => {
                    console.log(response, "hello");
                    this.estateSaved = response;
                    this.lastAddedEstateId = response.idEstateMI;

                    // SweetAlert for successful estate addition
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès!',
                        text: 'Estate ajouté avec succès!',
                        confirmButtonText: 'Super!',
                        confirmButtonColor: '#3085d6'
                    });

                    // Check if an image has been selected
                    if (this.file) {
                        this.upload();
                    } else {
                        console.warn('No image selected to upload.');
                        // Display an error alert if no image is selected
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur lors de l\'ajout de l\'estate',
                            text: 'Aucune image sélectionnée pour l\'upload.',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                    }
                },
                error: (error) => {
                    console.error('Error saving estate: ', error);
                    // SweetAlert for estate addition failure
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec de l\'opération',
                        text: 'Impossible d\'ajouter l\'estate: ' + (error.message || 'Une erreur interne s\'est produite'),
                        confirmButtonText: 'Fermer',
                        confirmButtonColor: '#d33'
                    });
                }
            });
        } catch (error) {
            console.error('Error in addEstate:', error);
            // Handle any unexpected errors
            Swal.fire({
                icon: 'error',
                title: 'Erreur inattendue',
                //text: 'Une erreur inattendue s\'est produite: ' + (error.message || 'Une erreur interne s\'est produite'),
                confirmButtonText: 'Fermer',
                confirmButtonColor: '#d33'
            });
        }
    }

// Assuming getCategorieMi is already an async function returning a promise
    async getCategorieMi1(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate async fetching of category
            this.categorieMiService.getCategorieMiById(id).subscribe({
                next: (data) => resolve(data),
                error: (err) => reject(err)
            });
        });
    }

/*upload(): void {
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
}*/
    upload(): void {
        if (!this.file) {
            this.message = 'Veuillez sélectionner un fichier.';
            Swal.fire({
                icon: 'warning',
                title: 'Aucun fichier sélectionné',
                text: this.message,
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        if (this.lastAddedEstateId === null) {
            this.message = "Aucun identifiant de bien disponible. Veuillez ajouter un bien d'abord.";
            Swal.fire({
                icon: 'warning',
                title: 'Aucun identifiant de bien',
                text: this.message,
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        this.imageUploadService.uploadImage(this.lastAddedEstateId, this.file).subscribe({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    this.message = 'Image téléchargée avec succès: ' + event.body.message;
                    console.log(this.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Téléchargement réussi',
                        text: this.message,
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
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

