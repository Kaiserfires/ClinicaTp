import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public usuario:User= {Nombre: '', Password: '', mail: '', Usuario: '', Apellido: '', nacimiento: new Date(),especialidad: '', Usuario_tipo: ''};

  constructor(private route:Router,private usuarioservices:UsuarioService) {

    if (usuarioservices.estoyLogueado()) {
      this.route.navigateByUrl('/principal/bienvenida/');
    }
  }

  public login(){
    this.usuarioservices.loginEnApi(this.usuario).subscribe(
      x=>{
        if ((<User>x).Usuario !=null) {
          this.usuarioservices.setLogueadoXApi(<User>x);
          this.route.navigateByUrl('/principal/bienvenida/');
        }
      }
    )
  }

  public prueba(){
    this.usuarioservices.mostrarApi().subscribe(
      t=> this.probando = (<any>t).mensaje
    )
  }
  public probando: string ="";

}
