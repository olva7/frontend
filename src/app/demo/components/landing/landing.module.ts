import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {  MatDialogModule } from '@angular/material/dialog';

import { CarouselModule } from 'primeng/carousel';
import { EstateImageService } from '../../service/estateImage.service';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        MatDialogModule,
        CarouselModule,

    ],
    declarations: [LandingComponent],
    providers: [EstateImageService],

})
export class LandingModule { }
