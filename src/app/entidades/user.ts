export interface User {
    Id:number;
    Nombre:string;
    Apellido:string;
    Password:string;
    Usuario:string;
    mail:string;
    Especialidad:string;
    FecNac : Date;
    Usuario_tipo:Number;
    avatar?: string;
    horario_entrada:Number;
    horario_salida:Number;
    dias_laborales?: string;
    horario_atencion?: string;
    foto_especialidad?: string;
    foto_medic?: string;
    estado: boolean;
    [key: string]: string | Date | undefined | Number | boolean ;
}
