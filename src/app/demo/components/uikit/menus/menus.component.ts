import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ConfirmationService, MegaMenuItem, MenuItem, MessageService, SelectItem} from 'primeng/api';
import {Product} from "../../../api/product";
import {EstateMi} from "../../../api/estatemi";
import {EstateImage} from "../../../api/estateimage";
import {ProductService} from "../../../service/product.service";
import {Router} from "@angular/router";
import {EstatemiService} from "../../../service/estatemi.service";
import {EstateImageService} from "../../../service/estateImage.service";
import {DataView} from "primeng/dataview";
import Swal from 'sweetalert2';

@Component({
    templateUrl: './menus.component.html',
    styles: [`

        /* component.css */
        .brick-red-text {
            color: #B22222;
        }
        .sky-blue-text {
            color: #87CEEB;
        }




    `],

    encapsulation: ViewEncapsulation.None
})
export class MenusComponent implements OnInit {



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
    updateEstateStatusAccepter(id: number): void {
        this.estateService.updateEstateStatusAccepter(id).subscribe({
            next: (updatedEstate: EstateMi) => {
                console.log('Estate status updated to accepted:', updatedEstate);
                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated',
                    text: 'The estate status has been updated to accepted.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            },
            error: (error) => {
                console.error('Error updating estate status to accepted:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an error updating the estate status to accepted.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    updateEstateStatusRefuser(id: number): void {
        this.estateService.updateEstateStatusRefuser(id).subscribe({
            next: (updatedEstate: EstateMi) => {
                console.log('Estate status updated to refused:', updatedEstate);
                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated',
                    text: 'The estate status has been updated to refused.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            },
            error: (error) => {
                console.error('Error updating estate status to refused:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an error updating the estate status to refused.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                });
            }
        });
    }


    loadEstates(): void {
        this.estateService.getAllEstates().subscribe({
            next: (data: EstateMi[]) => {
                this.estates = data.filter(estate => estate.etatEstate === 2);  // Filtrage des estates avec etatEstate=1
                this.estates.forEach(estate => {
                    if (estate.idEstateMI !== undefined) {  // Vérification ajoutée ici
                        this.loadImagesForEstate(estate.idEstateMI);
                        console.log(this.estates, "estates");
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
