import { User } from "./user";

export interface Empresa {
    id: number,
    rut: string,
    nombre: string,
    nombreFantasia: string,
    telefono: string,
    representanteLegal: string,
    giro: string,
    direccion: string,
    region: string,
    comuna: string,
    email: string,
    usuarios?: User[],
}