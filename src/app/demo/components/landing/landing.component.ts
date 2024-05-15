import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { EstateMi } from '../../api/estatemi';
import { EstatemiService } from '../../service/estatemi.service';
import { EstateImage } from '../../api/estateimage';
import { EstateImageService } from '../../service/estateImage.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styles: [`
        #hero{
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%);
            height:700px;
            overflow:hidden;
            image-rendering: optimizeQuality;
        }

        .pricing-card:hover{
            border:2px solid var(--cyan-200) !important;
        }

        @media screen and (min-width: 768px) {
            #hero{
                -webkit-clip-path: ellipse(150% 87% at 93% 13%);
                clip-path: ellipse(150% 87% at 93% 13%);
                height: 530px;
                image-rendering: optimizeQuality;
            }
        }
        .custom-dialog-container .login-container input,
.custom-dialog-container .login-container button {
  width: 100%;  // Ensures full width within the container
  padding: 12px;  // Comfortable padding for typing
}
.custom-dialog-container .login-container {
  padding: 20px;  // Reduced from larger paddings
}



        @media screen and (min-width: 1300px){
            #hero > img {
                position: absolute;
                transform:scale(1.2);
                top:15%;
                image-rendering: optimizeQuality;
            }

        #hero > div > p {
                max-width: 450px;
            }
        }

        @media screen and (max-width: 1300px){
            #hero {
                height: 600px;

            }

        #hero > img {
            position:static;
            transform: scale(1);
            margin-left: auto;
        }

        #hero > div {
            width: 100%;
        }

        #hero > div > p {
                width: 100%;
                max-width: 100%;
            }
        }

    `]
})

export class LandingComponent {
    estates: EstateMi[] = [];


    images: EstateImage[] = [];
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private imageService: EstateImageService,public layoutService: LayoutService, private estateService: EstatemiService,public dialog: MatDialog,public router: Router) {

        }
        imagesMap: { [key: number]: EstateImage[] } = {};


    ngOnInit() {
        this.loadEstates();
      }



    openDialog1() {
        const dialogRef = this.dialog.open(LoginComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
      loadEstates(): void {
        this.estateService.getAllEstates().subscribe({
            next: (data: EstateMi[]) => {
                this.estates = data;
                this.estates.forEach(estate => {
                    if (estate.idEstateMI !== undefined) {  // Vérification ajoutée ici
                        this.loadImagesForEstate(estate.idEstateMI);
                    }
                });
            },
            error: (error) => {
                console.error('Error fetching estates:', error);
            }
        });
    }


    loadImagesForEstate(idEstateMI: number): void {
        this.imageService.getByIdImageData(idEstateMI).subscribe({
            next: (images: EstateImage[]) => {
                this.imagesMap[idEstateMI] = images;
            },
            error: (error) => {
                console.error('Error fetching images for estate', idEstateMI, ':', error);
            }
        });
    }

}
