export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    rut: string;
    estado: number;
    ocupacion:string;
    tieneUsuario: boolean,
    nacionalidad: string;
    estadoCivil: string;
    prefesion: string;
    telefono: string;
    email: string;
    direccion: string;
    region: string;
    comuna: string;
    afp: string;
    salud: string;
    fechaNacimiento?: Date | null;
    examenVista: Date | null;
    examenAltura?: Date | null;
    examenGeneral?: Date | null;
    tallaCamisa: string;
    tallaPantalon: string;
    tallaZapato: string;
    tallaPoleron: string;
    tallaParka: string;
    tallaOberol: string;
}
