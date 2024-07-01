import { Time } from "@angular/common";

export interface Turno {
    Paciente_id: Number;
    Medico_id: Number;
    Fecha: Date;   
    Hora: Time;
    Estado: Boolean;
}
