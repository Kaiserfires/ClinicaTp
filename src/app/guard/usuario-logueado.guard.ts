import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn} from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

export const usuarioDeslogueadoGuard: CanActivateFn = (route, state) => {
  
  var usServ = inject(UsuarioService);
  return !usServ.estoyLogueado();
};

/*export const usuarioDeslogueadoGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  
  var usServ = inject(UsuarioService);
  return usServ.estoyLogueado();
};


usuarioLogueadoGuard*/