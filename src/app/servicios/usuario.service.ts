import { Injectable } from '@angular/core';
import { User } from '../entidades/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string="https://clienteApiTp.mdbgo.io";

  constructor(public http:HttpClient) {
    this.listaUsuario=JSON.parse(localStorage.getItem('Usuario') || '[]');
    this.setLogueado()
   }
  
   public mostrarApi(){
    return this.http.get(this.APIURL + "pruebajson");
  }

  public loginEnApi(Usuario:User) {
    return this.http.post(this.APIURL + "/login",Usuario);
  }

  public serLogueadoXApi(usuario:User){
    this.usuarioLogueado = usuario;
  }

  public registra(usuario:User){
    return this.http.post(this.APIURL + "/insertar",usuario);
  }

  public usuarioLogueado: User ={nombre:'', apellido:'', password:'', usuario:'', mail:'', especialidad:'', nacimiento :new Date(), tipo:''};

  public listaUsuario: User[]=[];

  public estoyLogueado():boolean{
    return this.usuarioLogueado.nombre !='';
  }

  public setLogueado(){
    if (localStorage.getItem('usuarioLogueado') ?? '' != '') {
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')?? '');    
    }
  }


}
