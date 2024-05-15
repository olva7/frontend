import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { DemandeEstate } from 'src/app/demo/api/demandeestate';
import { DemandeEstateService } from 'src/app/demo/service/demande.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService],
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
export class TableDemoComponent implements OnInit {

    customers1: Customer[] = [];

    demandesEstate: DemandeEstate[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;
    filteredDemandesEstate: DemandeEstate[] = [];


    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService,private demandeEstateService: DemandeEstateService, private productService: ProductService) { }

    ngOnInit() {
        this.getAllDemandesEstate();
        //this.getAllDemandesEstates();
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

    onSort() {
        this.updateRowGroupMetaData();

    }
    onUpdateDemandeAccepter(demandeId: number): void {
        this.demandeEstateService.updateDemandeEstateAccepter(demandeId).subscribe(
          (response) => {
            console.log('Demande mise à jour:', response);
            // Mettez à jour votre interface utilisateur ou effectuez d'autres actions nécessaires ici
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la demande:', error);
          }
        );
      }
      onUpdateDemandeRefuser(demandeId: number): void {
        this.demandeEstateService.updateDemandeEstateRefuser(demandeId).subscribe(
          (response) => {
            console.log('Demande mise à jour:', response);
            // Mettez à jour votre interface utilisateur ou effectuez d'autres actions nécessaires ici
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la demande:', error);
          }
        );
      }
    getAllDemandesEstate() {
        this.demandeEstateService.getAllDemandesEstate().subscribe(
            data => {
                console.log("Données brutes reçues:", data); // Afficher les données brutes pour diagnostic

                // Filtrer les données pour obtenir seulement les demandes avec un état de id = 1
                this.demandesEstate = data.filter(demande => demande.etatDemande && demande.etatDemande.idEtatDemande === 1);
                console.log("Données filtrées:", this.demandesEstate); // Afficher les données après filtrage
            },
            error => {
                console.error('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        );
    }
    getAllDemandesEstates() {
        this.demandeEstateService.getAllDemandesEstate().subscribe(
            data => {
                console.log("Données brutes reçues:", data); // Afficher les données brutes pour diagnostic

                // Filtrer les données pour obtenir seulement les demandes avec un état de id = 1
                this.demandesEstate = data.filter(demande => demande.etatDemande && demande.etatDemande.idEtatDemande !== 1);
                console.log("Données filtrées:", this.demandesEstate); // Afficher les données après filtrage
            },
            error => {
                console.error('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        );
    }



    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
