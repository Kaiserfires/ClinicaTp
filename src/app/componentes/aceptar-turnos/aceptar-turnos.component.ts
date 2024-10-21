import { Component,OnInit } from '@angular/core';
import { TurnoservService } from '../../servicios/turnoserv.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Turno } from '../../entidades/turno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../entidades/user';


@Component({
  selector: 'app-aceptar-turnos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './aceptar-turnos.component.html',
  styleUrl: './aceptar-turnos.component.scss'
})


export class AceptarTurnosComponent implements OnInit {
  turnos: Turno[] = [];
  diasLaborales: any[] = [];
  horarios:string[]=[];
  resena: string = '';
  medicoId: number = 0;
usuarioLogueado: User[]=[];

  constructor(private turnoService: TurnoservService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const usuarioLogueado = this.usuarioService.usuarioLogueado;
    this.diasLaborales[0]=this.convertirDiasLaborales(this.usuarioService.usuarioLogueado.dias_laborales);
    console.log(usuarioLogueado);
    this.medicoId = usuarioLogueado.Id;
   

    if (usuarioLogueado.Usuario_tipo !== 2) {
      console.error('El usuario no es un médico');
      return;
    }

    

    this.cargarDisponibilidad();
    this.cargarTurnosPendientes();
  }

  convertirDiasLaborales(dias: string | undefined): string {
    if (!dias) {
      return '';
    }

    const diasMap: { [key: string]: string } = {
      '1': 'Lunes',
      '2': 'Marter',
      '3': 'Miercoles',
      '4': 'Jueves',
      '5': 'Viernes'
    };

    return dias.split(',').map(dia => diasMap[dia.trim()]).join(', ');
  }

  cargarDisponibilidad(): void {
    const fechaActual = new Date().toISOString().split('T')[0];
  
    this.turnoService.obtenerDisponibilidadMedico(this.medicoId, fechaActual).subscribe(
      data=>{
        console.log(data);
        this.horarios=data;
        console.log(this.horarios);
      }
      
    );
    this.turnoService.obtenerDiasLaborales
  }
  

  cargarTurnosPendientes(): void {
    //const usuarioLog=JSON.parse(localStorage.getItem('usuarioLogueado')?? '');

    console.log(this.medicoId);   
    
    this.usuarioService.obtenerTurnosPorMedico(this.medicoId).subscribe(
      (data: Turno[]) => {
        this.turnos = data.filter((t: Turno) => t.Estado === 'Pendiente');
      },
      (error: any) => {
        console.error('Error al cargar turnos:', error);
      }
    );
  }

  actualizarEstadoTurno(turno: Turno, estado: string): void {
    turno.Estado = estado;

    this.turnoService.SactualizarEstadoTurno(turno.Id_Turno, 'Aceptado').subscribe({
    next: () => alert('Estado del turno actualizado correctamente.'),
    error: (err) => console.error('Error al actualizar el estado:', err)
  });
    
    /*
    this.turnoService.crearTurno(turno).subscribe(
      () => console.log(`Turno ${estado}:`, turno),
      (error) => console.error('Error al actualizar turno:', error)
    );*/
  }

  guardarResena(): void {
    console.log('Reseña guardada:', this.resena);
    // Aquí puedes enviar la reseña al backend si es necesario.
  }
}