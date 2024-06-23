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
    Nombre: '', 
    Password: '', 
    mail: '', 
    Usuario: '', 
    Apellido: '', 
    FecNac: new Date(), 
    Especialidad: '', 
    Usuario_tipo:0,
    horario_entrada: 0,
    horario_salida: 0,
    dias_laborales:'',
    horario_atencion:'',
  };
  public pasword2:string='';
  diaSemana:string[]=['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  diasSeleccionados: boolean[]= Array(5).fill(false);


  constructor(private router:Router, private us:UsuarioService) {}

  validarExiste(){
    return this.us.listaUsuario.filter( 
      t=> t.Nombre.toLowerCase() == this.usuario.Nombre.toLowerCase()).length == 1 ;
      
    }

  private convertirDiasALaborales(): string {
      const diasMap: any = {
        "Lunes": 1, "Martes": 2, "Miércoles": 3, "Jueves": 4, "Viernes": 5
      };
      return this.diaSemana
        .filter((dia, index) => this.diasSeleccionados[index])
        .map(dia => diasMap[dia])
        .join(',');
    }
    
  booleanoDias(index:number, event:any){
    this.diasSeleccionados[index]=event.target.checked;
    this.cargaDias();
  }
  
  cargaDias() {
    this.usuario.dias_laborales = this.convertirDiasALaborales();
    /*this.usuario.dias_laborales = this.diaSemana
      .filter((dia, index) => this.diasSeleccionados[index])
      .join(', ');*/
  }
    /* Primer intento me parecio muy desprolijo
    
    private convertirDiasALaborales(dias: string): number[] {
      const diasMap:any = {
        "lunes": 1, "martes": 2, "miércoles": 3, "jueves": 4, "viernes": 5,
        "lu": 1, "ma": 2, "mi": 3, "ju": 4, "vi": 5
      };
      return dias.split(',').map(dia => diasMap[dia.trim().toLowerCase()]);
    }*/

    public registrarEnApi(){
      this.cargaDias();
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
