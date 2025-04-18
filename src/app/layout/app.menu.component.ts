import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../demo/service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userRole?: string;
item: any;
    //userRole: string | null | undefined;

    constructor(public layoutService: LayoutService, private authService:UserService) { }

    ngOnInit() {
    this.userRole = this.authService.getUserRole();  // Assuming it returns string | null synchronously
    console.log('User role:', this.userRole);
    this.setupMenu();



    }
    setupMenu(): void {
    this.model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'],requiredRole: 'ADMIN' }
            ]
        },
        {
            label: '',
            items: [
                { label: 'Gérer les utilisateurs', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'],requiredRole: 'ADMIN'},
                { label: 'Ajouter une estate', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'],requiredRole: 'concessionnaire' },
                { label: 'Liste des utilisateurs', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'],requiredRole: 'ADMIN' },
                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
               // { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                //this?.userRole === 'admin' ? { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] } : null,
                // Ajoutez une condition pour afficher la List uniquement si l'utilisateur a le rôle d'admin
                //this.userRole === 'admin' ? { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] } : null,
                { label: 'Liste des demandes', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] , requiredRole: 'ADMIN' },
                { label: 'Liste des estates', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'],requiredRole: 'client' },
                { label: 'Liste des estates', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'],requiredRole: 'concessionnaire' },
                //{ label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                //{ label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                //{ label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                { label: 'Liste des estates', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true ,requiredRole: 'ADMIN'},
                { label: 'Liste des demandes', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'],requiredRole: 'client' },
                //{ label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                //{ label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                //{ label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] },
                //{ label: 'MyDashBoard', icon: 'pi pi-fw pi-id-card', routerLink: ['/mydashboard'] }
            ]
        },
        /*{
            label: 'Prime Blocks',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            ]
        },
        {
            label: 'Utilities',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            ]
        },*/
        {
            label: 'Page Principale',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/pages'],
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    routerLink: ['/landing']
                },
               /* {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/auth/login']
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['/auth/error']
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/auth/access']
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/pages/crud']
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    routerLink: ['/pages/timeline']
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    routerLink: ['/pages/notfound']
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: ['/pages/empty']
                },*/
            ]
        },
       /* {
            label: 'Hierarchy',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                },
                {
                    label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                }
            ]
        }*/
    ];
console.log('Menu items:', this.model);}
    // Fonction pour vérifier si un élément de menu doit être affiché en fonction du rôle de l'utilisateur
    shouldShowItem(item: any): boolean {
        const requiredRole = item.requiredRole; // Obtenez la valeur de requiredRole
        //console.log(requiredRole,"role");
        if (requiredRole === undefined) {
            return true; // Si requiredRole est undefined, autorisez l'accès
        }


        // Vérifiez si l'utilisateur a le rôle requis
        const hasAccess = !!this.userRole && this.userRole === requiredRole; // Utilisez !! pour convertir en boolean
        //console.log(`Access check for ${item.label}: Role required = ${requiredRole}, User role = ${this.userRole}, Access granted = ${hasAccess}`);
        return hasAccess;
    }


}
