import { Injectable } from '@angular/core';
import { User } from '../entidades/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../entidades/turno';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string="https://clienteApiTp.mdbgo.io";
  obtenerTurnosPorMedico: any;

  constructor(private http:HttpClient) { //cambie a privado para probar
    this.listaUsuario = JSON.parse(localStorage.getItem('Usuario') || '[]');
    this.setLogueado();
    this.listaUsuario = this.listaUsuario.filter(user => user.Nombre!== '');
  }
  
   public mostrarApi():Observable<any>{
    return this.http.get(this.APIURL + "/pruebajson");
  }

  public loginEnApi(Usuario:User):Observable<User> {
    return this.http.post<User>(this.APIURL + "/login",Usuario);
  }

  public setLogueadoXApi(usuario:User):void{
    this.usuarioLogueado = usuario;
    localStorage.setItem('usuarioLogueado',JSON.stringify(usuario));
  }

  public registrar(usuario:User):Observable<any>{
    return this.http.post(this.APIURL + "/insertar",usuario);
  }

  public usuarioLogueado: User ={
    Id:0,
    Nombre:'', 
    Apellido:'', 
    Password:'', 
    Usuario:'', 
    mail:'', 
    Especialidad:'', 
    FecNac :new Date(), 
    Usuario_tipo:0,
    horario_entrada: 0,
    horario_salida: 0,
    dias_laborales:'',
    horario_atencion:'',
    estado: false,
  };

  public listaUsuario: User[]=[];

  public estoyLogueado():boolean{
    this.setLogueado(); //agregado
    return this.usuarioLogueado.Nombre !='';
  }

  public setLogueado(){
    if (localStorage.getItem('usuarioLogueado') ?? '' != '') {
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')?? '');    
    }
  }

  public logout() {
    this.usuarioLogueado = { 
      Id:0,
      Nombre: '',
      Apellido: '',
      Password: '',
      Usuario: '', 
      mail: '', 
      Especialidad: '', 
      FecNac: new Date(), 
      Usuario_tipo:0,
      horario_entrada: 0,
      horario_salida: 0,
      dias_laborales:'',
      horario_atencion:'',
      estado: false,
    };
    localStorage.removeItem('usuarioLogueado');
  }

  public getUsuarioTipo(): Number {
    /*switch (this.usuarioLogueado.Usuario_tipo) {
      case '1':
          return 'Administrador';
      case '2':
        return 'Medico';
      case '3':
        return 'Paciente';
      default:
        return '';
    }*/
    return this.usuarioLogueado.Usuario_tipo;
  }

  public getFecNac():string{
    const FecNacTrunc = this.usuarioLogueado.FecNac.toString();
    return FecNacTrunc.split('T')[0];
  }

  obtenerMedicos(): Observable<User[]> {
    return this.http.get<User[]>(`${this.APIURL}/medicos/`);
  }

  cambiarEstadoMedico(id: number, estado: boolean): Observable<any> {
    return this.http.put(`${this.APIURL}/Usuario/${id}/estado`, { habilitado: estado });
  }

  obtenerNombApellPaciente(Id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.APIURL}/Usuario/${Id}`)
  }

  obtenerMedicosCalificados(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/Calificaciones/MedicosCalificados/${pacienteId}`);
  }

  enviarCalificacion(calificacion:{Paciente_Id:number; Medico_Id:number; Calificacion:number}):Observable<any>{
    return this.http.post(`${this.APIURL}/Califocaciones/Guardar`, calificacion);
  }
}
