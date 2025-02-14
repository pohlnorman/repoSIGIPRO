import { Contrato } from "./contrato";

export interface Finiquito {
    id?: number;
    fechaFiniquito: string;
    estado: number;
    ContratoId: number;
    contrato: Contrato
}
