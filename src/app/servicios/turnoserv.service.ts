
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../entidades/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoservService  {
  private apiUrl = "https://clienteApiTp.mdbgo.io"; // URL de tu API

  constructor(private http: HttpClient) { }

  /*crearTurno(turno: Turno): Observable<any> {
    return this.http.post(`${this.apiUrl}/turnos`, turno);
  }*/
  obtenerTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/turnos`);
  }

  obtenerTurnosPorMedico(medicoId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/medicos/${medicoId}/turnos`);
  }

  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  obtenerMedicosPorEspecialidad(especialidadId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicos/especialidad/${especialidadId}`);
  }

  obtenerDisponibilidadMedico(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicos/${medicoId}/disponibilidad`);
  }

  crearTurno(turnoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/turnos/`, turnoData);
  }
}
