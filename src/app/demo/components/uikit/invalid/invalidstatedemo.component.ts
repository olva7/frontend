import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstateImage } from 'src/app/demo/api/estateimage';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { GalerieImage } from 'src/app/demo/api/galerieimage';
import { CountryService } from 'src/app/demo/service/country.service';
import { GalerieService } from 'src/app/demo/service/galerieimage.service';

@Component({
    templateUrl: './invalidstatedemo.component.html'
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
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
      }
    onUpload(estateId: number, tag?: string): void {
        if (this.selectedFile) {
          this.galerieService.uploadImage(this.selectedFile, this.estateId, tag).subscribe({
            next: (response) => console.log(response),
            error: (error) => console.error('Error:', error)
          });
        }
      }


}
