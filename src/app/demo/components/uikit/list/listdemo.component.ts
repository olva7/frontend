import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { EstateImage } from 'src/app/demo/api/estateimage';
import { EstateMi } from 'src/app/demo/api/estatemi';
import { Product } from 'src/app/demo/api/product';
import { EstateImageService } from 'src/app/demo/service/estateImage.service';
import { EstatemiService } from 'src/app/demo/service/estatemi.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {


    products: Product[] = [];
    estates: EstateMi[] = [];


    images: EstateImage[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    constructor(private productService: ProductService,private router: Router,private estateService: EstatemiService,private imageService: EstateImageService) { }
    imagesMap: { [key: number]: EstateImage[] } = {};
    ngOnInit() {

        this.loadEstates();

        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }



    loadEstates(): void {
        this.estateService.getAllEstates().subscribe({
            next: (data: EstateMi[]) => {
                this.estates = data;
                this.estates.forEach(estate => {
                    if (estate.idEstateMI !== undefined) {  // Vérification ajoutée ici
                        this.loadImagesForEstate(estate.idEstateMI);
                     //   this.viewDetails(estate.idEstateMI);
                    console.log(this.estates,"estates")
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
    viewDetails(id: any) {

        console.log('ID:', id); // Vérifiez la valeur de l'ID dans la console
        if (id !== undefined) {
          this.router.navigate(['../panel/', id]);
        } else {
          console.error('ID is undefined');
        }
      }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }


}

