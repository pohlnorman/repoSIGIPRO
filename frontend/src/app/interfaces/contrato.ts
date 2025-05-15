import { Empresa } from "./empresa";
import { Persona } from "./persona";

export interface Contrato {
    id: number;
    fechaInicio: Date | null;
    estado: number;
    personaId: number;
    persona?: Persona;
    cargo: string;
    labor: string;
    lugarDeTrabajo: string;
    duracion: string;
    horario: string;
    sueldoBase: string;
    empresaId: number;
    empresa?:Empresa
}

