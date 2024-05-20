export interface User {
    Nombre:string;
    Apellido:string;
    Password:string;
    Usuario:string;
    mail:string;
    especialidad:string;
    nacimiento : Date;
    Usuario_tipo:string;
    avatar?: string;
    dias_atencion?: string;
    horario_atencion?: string;
    foto_especialidad?: string;
    foto_medic?: string;
    [key: string]: string | Date | undefined;
}
