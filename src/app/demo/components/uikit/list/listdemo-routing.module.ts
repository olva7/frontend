import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListDemoComponent } from './listdemo.component';
import { PanelsDemoComponent } from '../panels/panelsdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListDemoComponent },
        
    ])],
    exports: [RouterModule]
})
export class ListDemoRoutingModule { }
