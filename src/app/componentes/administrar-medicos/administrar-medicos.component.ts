import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { User } from '../../entidades/user';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from '../../servicios/filtro.pipe';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-administrar-medicos',
  standalone: true,
  imports: [CommonModule,FiltroPipe,FormsModule],
  templateUrl: './administrar-medicos.component.html',
  styleUrl: './administrar-medicos.component.scss'
})
export class AdministrarMedicosComponent implements OnInit {
  medicos:User[]=[];
  searchText:string='';

  generarPDF() {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text('Listado de Médicos Habilitados', 10, y);
    y += 10;

    const medicosHabilitados = this.medicos.filter(m => m.estado); // Filtrar habilitados

    doc.setFontSize(12);
    medicosHabilitados.forEach((medico) => {
      doc.text(`ID: ${medico.Id} - ${medico.Nombre} ${medico.Apellido}`, 10, y);
      y += 10;
    });

    doc.save('medicos_habilitados.pdf'); // Descargar el PDF
  }

  constructor(private usuarioService:UsuarioService) { }
    
    ngOnInit(): void {
      this.cargarMedicos();
    }

    cargarMedicos(): void {
      this.usuarioService.obtenerMedicos().subscribe(
        medicos => {
          this.medicos = medicos;
        },
        error => {
          console.error('Error al cargar los médicos:', error);
        }
      );
  }

  cambiarEstado(medico: User): void {
    const nuevoEstado = !medico.estado;
    //console.log(nuevoEstado);
    this.usuarioService.cambiarEstadoMedico(medico.Id , nuevoEstado).subscribe(
      () => {
        medico.estado = nuevoEstado;
        this.cargarMedicos();
      },
      error => {
        console.error('Error al cambiar el estado del médico:', error);
      }
    );
  }

  convertirDiasLaborales(dias: string | undefined): string {
    if (!dias) {
      return '';
    }

    const diasMap: { [key: string]: string } = {
      '1': 'Lu',
      '2': 'Ma',
      '3': 'Mi',
      '4': 'Ju',
      '5': 'Vi'
    };

    return dias.split(',').map(dia => diasMap[dia.trim()]).join(', ');
  }

}