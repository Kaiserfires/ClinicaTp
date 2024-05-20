import { Injectable } from '@angular/core';
import { User } from '../entidades/user';
import { HttpClient } from '@angular/common/http';

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
  
   public mostrarApi(){
    return this.http.get(this.APIURL + "/pruebajson");
  }

  public loginEnApi(Usuario:User) {
    return this.http.post(this.APIURL + "/login",Usuario);
  }

  public setLogueadoXApi(usuario:User){
    this.usuarioLogueado = usuario;
  }

  public registrar(usuario:User){
    return this.http.post(this.APIURL + "/insertar",usuario);
  }

  public usuarioLogueado: User ={Nombre:'', Apellido:'', Password:'', Usuario:'', mail:'', especialidad:'', nacimiento :new Date(), Usuario_tipo:''};

  public listaUsuario: User[]=[];

  public estoyLogueado():boolean{
    return this.usuarioLogueado.Nombre !='';
  }

  public setLogueado(){
    if (localStorage.getItem('usuarioLogueado') ?? '' != '') {
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')?? '');    
    }
  }


}
