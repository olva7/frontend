import { Component } from '@angular/core';

@Component({
    templateUrl: './formlayout.component.html'
})
export class FormLayoutComponent {

    selectedState: any;

    dropdownItems = [
        { name: 'roles', code: 'admin ' },
        { name: 'concessionnaire', code: 'concessionnaire' },
        { name: ' client', code: 'client' }
    ];
}
