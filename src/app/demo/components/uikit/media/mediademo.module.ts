import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaDemoComponent } from './mediademo.component';
import { MediaDemoRoutingModule } from './mediademo-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { EstateImageService } from 'src/app/demo/service/estateImage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        MediaDemoRoutingModule,
        ButtonModule,
        ImageModule,
        GalleriaModule,
        CarouselModule,
        HttpClientModule
    ],
    declarations: [MediaDemoComponent],
    providers: [EstateImageService],
})
export class MediaDemoModule { }
