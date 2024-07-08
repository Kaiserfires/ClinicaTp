import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../entidades/user';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform(medicos: User[], searchText:string): User[] {
    if (!medicos || !searchText) {
      return medicos;
    }
    searchText=searchText.toLowerCase();
    return medicos.filter(medico =>
      medico.Nombre.toLowerCase().includes(searchText) ||
      medico.Apellido.toLowerCase().includes(searchText) ||
      medico.Especialidad.toLowerCase().includes(searchText)
    );
  }

}
