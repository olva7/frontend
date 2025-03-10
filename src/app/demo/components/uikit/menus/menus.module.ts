import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { SeatComponent } from './seat.component';
import { PersonalComponent } from './personal.component';
import { ConfirmationComponent } from './confirmation.component';
import { MenusComponent } from './menus.component';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {OrderListModule} from "primeng/orderlist";
import {PickListModule} from "primeng/picklist";
import {EstateImageService} from "../../../service/estateImage.service";

@NgModule({
    declarations: [
        MenusComponent,
        PaymentComponent,
        ConfirmationComponent,
        PersonalComponent,
        SeatComponent,

    ],
    imports: [
        MenuModule,
        MegaMenuModule,
        PanelMenuModule,
        MenubarModule,
        BreadcrumbModule,
        InputTextModule,
        TieredMenuModule,
        TabMenuModule,
        ContextMenuModule,
        StepsModule,
        RouterModule.forChild([
            {
                path: '', component: MenusComponent, children: [
                    {path: '', redirectTo: 'personal', pathMatch: 'full'},
                    {path: 'personal', component: PersonalComponent},
                    {path: 'confirmation', component: ConfirmationComponent},
                    {path: 'seat', component: SeatComponent},
                    {path: 'payment', component: PaymentComponent}
                ]
            }
        ]),
        ButtonModule,
        CommonModule,
        DataViewModule,
        DropdownModule,
        OrderListModule,
        PickListModule
    ],
    exports: [RouterModule],
    providers: [EstateImageService],
})
export class MenusModule { }

