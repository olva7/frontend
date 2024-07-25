import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {EstatemiService} from "../../service/estatemi.service";
import {DemandeEstateService} from "../../service/demande.service";
import {Chart} from "chart.js";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;
    estateCountEtat2: number | undefined;
    estateCountEtat3: number | undefined;
    estateCountEtat1: number | undefined;
    chart: any;
    chartOptions: any;
    pieData: any;
    pieOptions: any;
    estateCount: number | undefined;
    demandeCount: number | undefined;

    subscription!: Subscription;

    constructor(private productService: ProductService,private estateService: EstatemiService,private demandeService: DemandeEstateService , public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.getDemandeCount();
        this.loadChartData();
        this.getEstateCount();
        this.getEstateCountEtat2();
        this.getEstateCountEtat1();
        this.getEstateCountEtat3();

        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }
    getEstateCountEtat2(): void {
        this.demandeService.countEstatesByEtatEstateEquals2().subscribe({
            next: (count: number) => {
                this.estateCountEtat2 = count;
            },
            error: (error) => {
                console.error('Error fetching estate count with etatEstate=2:', error);
            }
        });
    }
    loadChartData(): void {
        this.estateService.countEstatesByCategory().subscribe(data => {
            const categories = data.map((item: any) => item[0]);
            const counts = data.map((item: any) => item[1]);

            this.chart = new Chart('canvas', {
                type: 'pie',
                data: {
                    labels: categories,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: this.getBackgroundColors(categories.length),
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Estate Categories'
                        }
                    }
                }
            });
        });
    }

    getBackgroundColors(count: number): string[] {
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ];
        return colors.slice(0, count);
    }


    getEstateCountEtat1(): void {
        this.demandeService.countEstatesByEtatEstateEquals1().subscribe({
            next: (count: number) => {
                this.estateCountEtat1 = count;
            },
            error: (error) => {
                console.error('Error fetching estate count with etatEstate=1:', error);
            }
        });
    }
    getEstateCountEtat3(): void {
        this.demandeService.countEstatesByEtatEstateEquals3().subscribe({
            next: (count: number) => {
                this.estateCountEtat3 = count;
            },
            error: (error) => {
                console.error('Error fetching estate count with etatEstate=3:', error);
            }
        });
    }
    getDemandeCount(): void {
        this.demandeService.countDemandes().subscribe({
            next: (count: number) => {
                this.demandeCount = count;
            },
            error: (error) => {
                console.error('Error fetching demandes count:', error);
            }
        });
    }
    getEstateCount(): void {
        this.estateService.countEstates().subscribe({
            next: (count: number) => {
                this.estateCount = count;
            },
            error: (error) => {
                console.error('Error fetching estate count:', error);
            }
        });
    }
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };
        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--pink-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--red-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
