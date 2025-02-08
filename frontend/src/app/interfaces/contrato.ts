import { Persona } from "./persona";

export interface Contrato {
    id?: number;
    fechaInicio: string;
    idPersona: number;
    persona: Persona
}

