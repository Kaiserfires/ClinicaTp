import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { ErrorComponent } from './componentes/error/error.component';
import { usuarioDeslogueadoGuard } from './guard/usuario-logueado.guard';
import { AdministrarMedicosComponent } from './componentes/administrar-medicos/administrar-medicos.component';
import { NuevoTurnoComponent } from './componentes/nuevo-turno/nuevo-turno.component';
import { AceptarTurnosComponent } from './componentes/aceptar-turnos/aceptar-turnos.component';


export const routes: Routes = [
    {path:'principal',component:PrincipalComponent,
        children:[
            {path:'login',component:LoginComponent, canActivate:[usuarioDeslogueadoGuard]},//canDeactivate:[usuarioDeslogueadoGuard]
            {path:'registro',component:RegistroComponent,  canActivate:[usuarioDeslogueadoGuard]},//canActivate: [usuarioLogueadoGuard]
            {path:'administrar-medicos',component:AdministrarMedicosComponent},
            {path:'nuevo-turno',component:NuevoTurnoComponent},
            {path:'bienvenida',component:BienvenidaComponent},
            {path:'aceptar-turnos',component:AceptarTurnosComponent},
            {path:'**',component:LoginComponent}
        ]
    },
    {path:'',redirectTo:'principal',pathMatch:'full'},
    {path:'**',component:ErrorComponent}
];
