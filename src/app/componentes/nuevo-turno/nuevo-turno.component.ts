import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TurnoservService } from '../../servicios/turnoserv.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Turno } from '../../entidades/turno';
import { ArrayType } from '@angular/compiler';


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
  especialidades:  string[]=[];
  medicos: any[] = [];
  horarios: any[] = [];
  selectedEspecialidad: string = '';
  selectedMedico: number=0;
  selectedHorario: string = '';

  constructor(private turnoServ: TurnoservService, private usuarioServ: UsuarioService, private router: Router) { }
  ngOnInit(): void {
    // Cargar datos del usuario logueado
    var user = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '{}');
    this.userID = user.Id;
    this.userName = user.Nombre;

    // Cargar las especialidades disponibles al iniciar el componente
   // this.especialidades.fill(this.turnoServ.obtenerEspecialidades().subscribe(data =>{data=JSON.stringify(data)};));
    this.turnoServ.obtenerEspecialidades().subscribe(data => {
      this.especialidades = [];
      //console.log(data);
      for (let i = 0; i < data.length; i++){
        this.especialidades.push(data[i].Especialidad); //
        
      }
      });
  }

  onChangeEspecialidad(): void {
    //var random="Traumatologo";
    //console.log(this.selectedEspecialidad);
    // Cuando el usuario selecciona una especialidad, cargar los médicos correspondientes
    this.turnoServ.obtenerMedicosPorEspecialidad(this.selectedEspecialidad.replace(/['"]+/g, '')).subscribe(data => {
      this.medicos = [];
      //console.log(data.length);

      for (let i = 0; i < data.length; i++){
        
        //var medicomain=data[i].user.Nombre;
        //console.log(data[i]);
        this.medicos.push(data[i]); //{id:data[i].user.id, nombre:JSON.stringify(data[i].user.Nombre)}
        //this.selectedMedico = data[i].Id;
        //console.log(data[i].length);
      }

    });
  }

  onChangeMedico(): void {
    // Cuando el usuario selecciona un médico, cargar los horarios de disponibilidad
    console.log(this.selectedMedico);
    this.turnoServ.obtenerDisponibilidadMedico(this.selectedMedico).subscribe(data => {
      this.horarios = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        this.horarios.push(data[i]);
        
      }

    });
  }

  onSubmit(): void {
    
    // Cuando el usuario confirma el turno, enviar la solicitud al backend
    const turnoData: Turno = { 
      // Este campo se generará automáticamente en la base de datos
      Paciente_id: this.userID,
      Medico_id: this.selectedMedico, // Convertir a número
      Fecha:  new Date().toISOString().slice(0, 10),                   //new Date().toISOString().slice(0, 10), // Fecha actual
      Hora: this.selectedHorario,
      Estado: 'pendiente' // Estado inicial del turno
    };
    console.log(turnoData);
    this.turnoServ.crearTurno(turnoData).subscribe(response => {
      console.log('Turno creado exitosamente:', response);
      // Redirigir al usuario a otra página o mostrar un mensaje de confirmación
      this.router.navigate(['/confirmacion-turno']);
    });
  }

}

