import { Injectable } from '@angular/core';
import { User } from '../entidades/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string="https://clienteApiTp.mdbgo.io";

  constructor(public http:HttpClient) {
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
}
