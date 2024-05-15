import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { AppUser } from 'src/app/demo/api/user';
import { CountryService } from 'src/app/demo/service/country.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './floatlabeldemo.component.html',
    styles: [`
    :host ::ng-deep  .p-frozen-column {
        font-weight: bold;
    }

    :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
    }

    :host ::ng-deep .p-progressbar {
        height:.5rem;
    }
    table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;
}

thead {
background-color: #f4f4f4;
}

tr:nth-child(even) {
background-color: #f9f9f9;
}

`]

})
export class FloatLabelDemoComponent implements OnInit {

    customers1: Customer[] = [];


    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;
    users: AppUser[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor( private userService:UserService ,private customerService: CustomerService, private productService: ProductService) {

    }

    ngOnInit() {

        this.userService.getAllUsers().subscribe({
            next: (data) => {
              this.users = data;
            },
            error: (error) => {
              console.error('There was an error!', error);
            }
          });

        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

}


