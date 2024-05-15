import { Component, ElementRef, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, map, of } from 'rxjs';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { DemandeEstate } from 'src/app/demo/api/demandeestate';
import { Product } from 'src/app/demo/api/product';
import { AppUser } from 'src/app/demo/api/user';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { DemandeEstateService } from 'src/app/demo/service/demande.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserService } from 'src/app/demo/service/user.service';
interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './messagesdemo.component.html',

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

`],
    providers: [MessageService, ConfirmationService]
})
export class MessagesDemoComponent {




    demandesEstate: DemandeEstate[] = [];




    userEmail: string = '';



    expandedRows: expandedRows = {};
    fetchedUser: AppUser | null = null;
    userId?: number;








    @ViewChild('filter') filter!: ElementRef;



    constructor(private authService: UserService,private customerService: CustomerService,private demandeEstateService: DemandeEstateService, private productService: ProductService,private service: MessageService) { }

    ngOnInit() {

        //this.testFetchUserByEmail();
        this.fetchUserId(this.getUserEmail());

            this.demandeEstateService.getAllDemandesEstate().subscribe(
                data => {
                    console.log("Données brutes reçues:", data); // Afficher les données brutes pour diagnostic
                    // Filtrer les données pour obtenir seulement les demandes avec un user de id = 1
                    this.demandesEstate = data.filter(demande => demande.idUser && demande.idUser.idUser ===  1);
                    console.log("Données filtrées:", this.demandesEstate); // Afficher les données après filtrage
                },
                error => {
                    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
                }
            );



    }



      getUserEmail(): string  {
        const token = this.authService.getToken();
        if (token) {
          const decoded: any = jwtDecode(token);
          return decoded.sub;  // 'sub' est supposé contenir l'email de l'utilisateur
        }
        return "";
      }
      testFetchUserByEmail(): void {
        //const emailToTest = 'john.doe@exemple.com'; // Remplacez par l'email que vous voulez tester
        this.userEmail = this.getUserEmail();
        this.authService.fetchUserByEmail(this.userEmail).subscribe({
          next: (user: AppUser) => {
            this.fetchedUser = user;
            //this.fetchedUser.idUser=this.users;
            console.log('Fetched User:', user);
            //console.log('Fetched User:', this.users);
          },
          error: (error) => {
            console.error('Failed to fetch user:', error);
            this.fetchedUser = null;
          }
        });
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
      fetchUserId1(email: string): Observable<number | undefined> {
        return this.authService.fetchUserIdByEmail(email).pipe(
            map(id => {
                this.userId = id;
                console.log('Received User ID:', id);
                return id;
            }),
            catchError(error => {
                console.error('Failed to fetch user ID:', error);
                return of(undefined); // Retourner undefined en cas d'erreur
            })
        );
    }
    getAllDemandesEstate() {
        this.demandeEstateService.getAllDemandesEstate().subscribe(
            data => {
                console.log("Données brutes reçues:", data); // Afficher les données brutes pour diagnostic
                // Filtrer les données pour obtenir seulement les demandes avec un user de id = 1
                this.demandesEstate = data.filter(demande => demande.idUser && demande.idUser.idUser ===  this.fetchUserId(this.getUserEmail()));
                console.log("Données filtrées:", this.demandesEstate); // Afficher les données après filtrage
            },
            error => {
                console.error('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        );
    }


    /*getAllDemandesEstate() {
        this.fetchUserId1(this.userEmail).subscribe(
            userId => {
                if (userId !== undefined) {
                    console.log(userId,"user")
                    // Utiliser userId pour récupérer les demandes d'estimation
                    this.demandeEstateService.getAllDemandesEstate().subscribe(
                        data => {
                            console.log("Données brutes reçues:", data); // Afficher les données brutes pour diagnostic
                            // Filtrer les données pour obtenir seulement les demandes avec un user de id = 1
                            this.demandesEstate = data.filter(demande => demande.idUser && demande.idUser.idUser === this.fetchUserId(this.getUserEmail())
                          );
                            console.log("Données filtrées:", this.demandesEstate); // Afficher les données après filtrage
                        },
                        error => {
                            console.error('Une erreur s\'est produite lors de la récupération des données:', error);
                        }
                    );
                } else {
                    console.log('User ID not found for email:', this.userEmail);
                }
            }
        );
    }*/









}
