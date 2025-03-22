import { Persona } from "./persona";

export interface Contrato {
    id: number;
    fechaInicio: string;
    estado: number;
    personaId: number;
    persona?: Persona
}

