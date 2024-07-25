import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstateImage } from 'src/app/demo/api/estateimage';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { GalerieImage } from 'src/app/demo/api/galerieimage';
import { CountryService } from 'src/app/demo/service/country.service';
import { GalerieService } from 'src/app/demo/service/galerieimage.service';
import Swal from 'sweetalert2';
@Component({
    templateUrl: './invalidstatedemo.component.html',
    styles: [`
        .custom-file-input {
            display: none; /* Hide the default file input */
        }

        .custom-file-label {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1b4f55;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .custom-file-label:hover {
            background-color: #1b4f55;
        }

        .custom-upload-button {
            padding: 10px 20px;
            background-color: #1b4f55;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }

        .custom-upload-button:hover {
            background-color: #1b4f55;
        }

        .custom-input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-left: 10px;
        }

        .custom-file-container {
            display: inline-block;
            position: relative;
            margin-bottom: 10px;
        }

        .custom-file-container .custom-file-label {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1b4f55;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .custom-file-container .custom-file-label:hover {
            background-color: #1b4f55;
        }
    `]
})
export class InvalidStateDemoComponent implements OnInit {

    countries: any[] = [];
    estates: EstateMi[] = [];
    selectedFile?: File;
    estateId!: number;
    file: File | null = null;
    tag: string = '';
    message: string = '';
    image: GalerieImage[] = [];



    images: EstateImage[] = [];





    constructor(private route: ActivatedRoute,private countryService: CountryService, private galerieService : GalerieService) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.estateId = +params['id'];
            console.log("Estate ID:", this.estateId);  // Vérifiez que l'ID est correctement récupéré
          });
    }
    /*onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
      }*/

    /*onUpload(estateId: number, tag?: string): void {
        if (this.selectedFile) {
          this.galerieService.uploadImage(this.selectedFile, this.estateId, tag).subscribe({
            next: (response) => console.log(response),
            error: (error) => console.error('Error:', error)
          });
        }
      }*/
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            Swal.fire({
                icon: 'success',
                title: 'Fichier sélectionné',
                text: 'Vous avez sélectionné un fichier.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    }

    onUpload(estateId: number, tag?: string): void {
        if (this.selectedFile) {
            this.galerieService.uploadImage(this.selectedFile, this.estateId, tag).subscribe({
                next: (response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Téléchargement réussi',
                        text: 'Votre fichier a été téléchargé avec succès.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                },
                error: (error) => {
                    console.error('Erreur:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec du téléchargement',
                        text: 'Une erreur est survenue lors du téléchargement de votre fichier.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Aucun fichier sélectionné',
                text: 'Veuillez sélectionner un fichier avant de télécharger.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    }


}
