import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstateImage } from 'src/app/demo/api/estateimage';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { GalerieImage } from 'src/app/demo/api/galerieimage';
import { Product } from 'src/app/demo/api/product';
import { EstateImageService } from 'src/app/demo/service/estateImage.service';
import { EstatemiService } from 'src/app/demo/service/estatemi.service';
import { GalerieService } from 'src/app/demo/service/galerieimage.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './mediademo.component.html',
    styles: [`
    .img-galleria {
    max-width: 100%;  /* assurez-vous que les images ne dépassent pas le conteneur */
    height: auto;     /* gardez le rapport d'aspect des images */
}

/* Style pour le conteneur de la galerie */
.galleria-container {
    background-color: white!important; /* définit le fond en blanc */
    max-width: 100%; /* ajustez selon vos besoins pour occuper toute la largeur disponible */
    margin: auto; /* centre le conteneur */
}

/* Style général de Galleria */
.p-galleria {
    border: none; /* retire les bordures si nécessaire */
    background-color: white!important;
    overflow: hidden;
}

/* Assurez-vous que les images sont redimensionnées correctement */
.img-galleria {
    max-width: 100%;
    height: auto;
    display: block; /* assure que les images ne prennent pas plus de place que nécessaire */
}
.p-galleria .p-galleria-item {
    overflow: hidden; /* Empêche le défilement en masquant tout contenu qui dépasse */
}
.p-galleria .p-galleria-item img {
    max-width: 100%;  /* Assurez-vous que les images ne sont pas plus larges que leur conteneur */
    height: auto;     /* Maintient le ratio hauteur/largeur des images */
}


`]
})
export class MediaDemoComponent implements OnInit {

    estates: EstateMi[] = [];
    selectedFile?: File;
    estateId!: number;
    file: File | null = null;
    tag: string = '';
    message: string = '';
    image: GalerieImage[] = [];



    images: EstateImage[] = [];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5  // Ajustez ce nombre selon la taille des images et de l'écran
        },
        {
            breakpoint: '960px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1

        }
    ];


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

    constructor(private galerieService: GalerieService,private imageService: EstateImageService,private productService: ProductService,private estateService: EstatemiService, private photoService: PhotoService,private route: ActivatedRoute) { }
    imagesMap: { [key: number]: EstateImage[] } = {};
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.estateId = +params['id'];
            console.log("Estate ID:", this.estateId);  // Vérifiez que l'ID est correctement récupéré
          });

        this.loadEstates();
        this.loadImage();
        //this.getEstateImages();

    }
    /*loadImage(): void {
        this.galerieService.getImagesByEstateId(this.estateId).subscribe({
          next: (data) => {
            this.image = data;
          },
          error: (error) => {
            console.error('Error fetching images:', error);
          }
        });
      }*/
      loadImage(): void {
        this.galerieService.getImagesByEstateId(this.estateId).subscribe({
          next: (data) => {
            this.image = data.map(img => ({
              ...img,
              itemImageSrc: `data:image/jpeg;base64,${img.imageData}`,
              thumbnailImageSrc: `data:image/jpeg;base64,${img.imageData}`
            }));
          },
          error: (error) => {
            console.error('Error fetching images:', error);
          }
        });
    }

    onFileChange(event: any): void {
        this.file = event.target.files[0];
      }
      onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
      }

      onSubmit(): void {
        if (this.file) {
          this.galerieService.uploadImage(this.file, this.estateId, this.tag).subscribe({
            next: (response) => {
              this.message = 'Image uploaded successfully!';
              console.log(response);
            },
            error: (error) => {
              this.message = 'Failed to upload image: ' + error.error;
              console.error(error);
            }
          });
        } else {
          this.message = 'Please select a file to upload!';
        }
      }
      onUpload(estateId: number, tag?: string): void {
        if (this.selectedFile) {
          this.galerieService.uploadImage(this.selectedFile, this.estateId, tag).subscribe({
            next: (response) => console.log(response),
            error: (error) => console.error('Error:', error)
          });
        }
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
