import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss',
    imports: [MenuComponent, LoginComponent]
})
export class PrincipalComponent {

}
