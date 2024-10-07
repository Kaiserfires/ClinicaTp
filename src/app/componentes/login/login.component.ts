import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public usuario:User= {
    Id: 0,
    Nombre: '',
    Password: '',
    mail: '',
    Usuario: '',
    Apellido: '',
    FecNac: new Date(),
    Especialidad: '',
    Usuario_tipo: 0,
    horario_entrada: 0,
    horario_salida: 0,
    dias_laborales: '',
    horario_atencion: '',
    estado: false
  };
  public errorMessage:string='';

  constructor(private route:Router, private usuarioservices:UsuarioService) {

    if (usuarioservices.estoyLogueado()) {
      this.route.navigateByUrl('/principal/bienvenida');
    }
  }

  public login(){
    this.usuarioservices.loginEnApi(this.usuario).subscribe({
      next: (x) => {
        const user = <User>x;
        if (user && user.Usuario) {
          if (user.Usuario_tipo === 2 && !user.estado) {
            this.errorMessage = "Usted todavía no está autorizado.";
          } else {
            this.usuarioservices.setLogueadoXApi(user);
            location.reload();
            this.route.navigateByUrl('/principal/bienvenida');
          }
        } else {
          this.errorMessage = "Usuario inválido o contraseña incorrectos.";
        }
      },
      error: (error) => {
        console.error('Error durante el login', error);
        this.errorMessage = "Error durante el login. Por favor, intente nuevamente.";
      }}
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
      /*
      x=>{
        if ((<User>x).Usuario !=null) {
          this.usuarioservices.setLogueadoXApi(<User>x);
          location.reload();
          this.route.navigateByUrl('/principal/bienvenida/');
        }
      },
      error=>{console.error('error durante el login',error);}*/
    );
  }

  public prueba(){
    this.usuarioservices.mostrarApi().subscribe(
      t=> this.probando = (<any>t).mensaje
    )
  }
  public probando: string ="";

}
