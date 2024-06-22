import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../entidades/user';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  
  public usuario:User = {
    Nombre: '', Password: '', mail: '', Usuario: '', Apellido: '', FecNac: new Date(),especialidad: '', Usuario_tipo:0
  };
  public pasword2:string='';

  constructor(private router:Router, private us:UsuarioService) {}

  validarExiste(){
    return this.us.listaUsuario.filter( 
      t=> t.Nombre.toLowerCase() == this.usuario.Nombre.toLowerCase()).length == 1 ;
      
    }

    public registrarEnApi(){
      this.us.registrar(this.usuario).subscribe(
        x =>{ 
         console.log(x);
         this.us.setLogueadoXApi(<User> x);
         this.router.navigateByUrl('/principal');
        }  
       );
    }

    onFileChange(event: any, field: string) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        // Obtener la ruta del archivo
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          // Asignar la ruta del archivo a la propiedad del usuario
          this.usuario[field] = fileReader.result as string;
        };
      }
    }

}
