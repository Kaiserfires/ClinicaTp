export interface Turno {
     Id_Turno: number;
     Paciente_id: number;
     Medico_id: number;
     Fecha: string;//Date;
     Hora: string;
     Estado: string;
     [key: string]: string | Date |number |undefined;
}