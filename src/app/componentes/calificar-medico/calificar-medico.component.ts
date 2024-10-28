import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calificar-medico',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './calificar-medico.component.html',
  styleUrl: './calificar-medico.component.scss'
})
export class CalificarMedicoComponent implements OnInit {
  medicos: any[]= [];
  pacienteId: number = 0; // Asignar el ID del paciente logueado


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Obtén el paciente logueado de algún servicio o almacenamiento local
    this.pacienteId = JSON.parse(localStorage.getItem('usuarioLogueado')!).Id;
    console.log(this.pacienteId, "este es el id");
    this.cargarMedicosCalificados();

  }

  cargarMedicosCalificados() {
    this.usuarioService.obtenerMedicosCalificados(this.pacienteId).subscribe({
      next: (data) => {
        console.log(data);
        this.medicos = data;
        console.log(this.medicos);
      }
    });
  }

  enviarCalificacion(medico:any){
    var calificacion ={
      Paciente_Id: this.pacienteId,
      Medico_Id: medico.Medico_Id,
      Calificacion: medico.calificacion
    };
    console.log(medico.Medico_Id);
    this.usuarioService.enviarCalificacion(calificacion).subscribe({
      next:() =>{
        medico.enviado = true;
        alert('Calificacion enviada carrectamente');
      },
      error: (err) =>{
        console.error('error al enviar calidicacion:', err);
      }
    })
  }

}
