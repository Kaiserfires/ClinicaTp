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

  public usuario:User= {Nombre: '', Password: '', mail: '', Usuario: '', Apellido: '', FecNac: new Date(),especialidad: '', Usuario_tipo:0};

  constructor(private route:Router, private usuarioservices:UsuarioService) {

    if (usuarioservices.estoyLogueado()) {
      this.route.navigateByUrl('/principal/bienvenida/');
    }
  }

  public login(){
    this.usuarioservices.loginEnApi(this.usuario).subscribe(
      /*(response: any)=>{
        const user = response as User;
        if (user && user.Usuario) {
          this.usuarioservices.setLogueadoXApi(user);
          this.route.navigateByUrl('/principal/bienvenida/');          
        }else{
          console.error("Error al loguear, usuario invalido o contraseña incorrectos");
        }
      },
      (error)=>{
        console.error('error durante el login', error);
      }-*/
      
      x=>{
        if ((<User>x).Usuario !=null) {
          this.usuarioservices.setLogueadoXApi(<User>x);
          location.reload();
          this.route.navigateByUrl('/principal/bienvenida/');
        }
      },
      error=>{console.error('error durante el login',error);}
    );
  }

  public prueba(){
    this.usuarioservices.mostrarApi().subscribe(
      t=> this.probando = (<any>t).mensaje
    )
  }
  public probando: string ="";

}
