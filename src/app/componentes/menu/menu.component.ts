import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  public estaLogueado:boolean=false;


  constructor(private usuarioService: UsuarioService) {}
  ngOnInit():void{
    this.estaLogueado=this.usuarioService.estoyLogueado();
  }

  logout(): void {
    this.usuarioService.logout();
    this.estaLogueado=this.usuarioService.estoyLogueado();
  }
}
