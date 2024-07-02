import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TurnoservService } from '../../servicios/turnoserv.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Turno } from '../../entidades/turno';


@Component({
  selector: 'app-nuevo-turno',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './nuevo-turno.component.html',
  styleUrl: './nuevo-turno.component.scss'
})
export class NuevoTurnoComponent implements OnInit {
  userID: number = 0;
  userName: string = '';
  especialidades: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];
  selectedEspecialidad: string = '';
  selectedMedico: number = 0;
  selectedHorario: string = '';

  constructor(private turnoServ: TurnoservService, private usuarioServ: UsuarioService, private router: Router) { }
  ngOnInit(): void {
    // Cargar datos del usuario logueado
    var user = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '{}');
    this.userID = user.id;
    this.userName = user.Nombre;

    // Cargar las especialidades disponibles al iniciar el componente
    this.turnoServ.obtenerEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  onChangeEspecialidad(): void {
    // Cuando el usuario selecciona una especialidad, cargar los médicos correspondientes
    this.turnoServ.obtenerMedicosPorEspecialidad(this.selectedEspecialidad).subscribe(data => {
      this.medicos = data;
    });
  }

  onChangeMedico(): void {
    // Cuando el usuario selecciona un médico, cargar los horarios de disponibilidad
    this.turnoServ.obtenerDisponibilidadMedico(this.selectedMedico).subscribe(data => {
      this.horarios = data;
    });
  }

  onSubmit(): void {
    // Cuando el usuario confirma el turno, enviar la solicitud al backend
    const turnoData: Turno = {
      id: 0, // Este campo se generará automáticamente en la base de datos
      pacienteId: this.userID,
      medicoId: this.selectedMedico, // Convertir a número
      fecha: new Date().toISOString().slice(0, 10), // Fecha actual
      hora: this.selectedHorario,
      estado: 'pendiente' // Estado inicial del turno
    };

    this.turnoServ.crearTurno(turnoData).subscribe(response => {
      console.log('Turno creado exitosamente:', response);
      // Redirigir al usuario a otra página o mostrar un mensaje de confirmación
      this.router.navigate(['/confirmacion-turno']);
    });
  }

}

